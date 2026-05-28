#!/bin/bash
set -e

CLIENT_ID=$1
SUBDOMAIN=$2
CLIENT_EMAIL=$3

[ -z "$CLIENT_ID" ] && { echo "Uso: provision.sh ID SUBDOMAIN EMAIL" >&2; exit 1; }
[ -z "$SUBDOMAIN" ] && { echo "Uso: provision.sh ID SUBDOMAIN EMAIL" >&2; exit 1; }
[ -z "$CLIENT_EMAIL" ] && { echo "Uso: provision.sh ID SUBDOMAIN EMAIL" >&2; exit 1; }

CLIENT_DIR="/opt/saas/clients/${CLIENT_ID}"
[ -d "$CLIENT_DIR" ] && { echo "ERRORE: Cliente esiste gia" >&2; exit 1; }

PORT=5680
while ss -tlnp | grep -q ":${PORT} "; do PORT=$((PORT + 1)); done

DB_PASSWORD=$(openssl rand -hex 24)
ENCRYPTION_KEY=$(openssl rand -hex 32)

echo "Creazione database..."
docker exec -i postgres-n8n psql -U postgres -c "CREATE USER n8n_${CLIENT_ID} WITH PASSWORD '${DB_PASSWORD}';"
docker exec -i postgres-n8n psql -U postgres -c "CREATE DATABASE n8n_${CLIENT_ID} OWNER n8n_${CLIENT_ID};"

echo "Creazione directory..."
mkdir -p "${CLIENT_DIR}/data"
chown -R 1000:1000 "${CLIENT_DIR}/data"

echo "Generazione docker-compose.yml..."
cat > "${CLIENT_DIR}/docker-compose.yml" << DCEOF
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n-${CLIENT_ID}
    restart: unless-stopped
    ports:
      - "127.0.0.1:${PORT}:5678"
    environment:
      - N8N_HOST=${SUBDOMAIN}.n8n4you.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://${SUBDOMAIN}.n8n4you.com/
      - N8N_EDITOR_BASE_URL=https://${SUBDOMAIN}.n8n4you.com/
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres-n8n
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n_${CLIENT_ID}
      - DB_POSTGRESDB_USER=n8n_${CLIENT_ID}
      - DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}
      - N8N_ENCRYPTION_KEY=${ENCRYPTION_KEY}
      - GENERIC_TIMEZONE=Europe/Paris
      - N8N_DIAGNOSTICS_ENABLED=false
    volumes:
      - ./data:/home/node/.n8n
    networks:
      - web
networks:
  web:
    external: true
DCEOF

echo "Avvio container n8n..."
cd "${CLIENT_DIR}"
docker compose up -d

echo "Configurazione nginx..."
cat > "/etc/nginx/sites-available/${SUBDOMAIN}.n8n4you.com" << NGEOF
server {
    listen 80;
    server_name ${SUBDOMAIN}.n8n4you.com;
    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        chunked_transfer_encoding off;
    }
}
NGEOF

ln -sf "/etc/nginx/sites-available/${SUBDOMAIN}.n8n4you.com" "/etc/nginx/sites-enabled/"
nginx -t && systemctl reload nginx

echo "Certificato SSL..."
certbot --nginx -d "${SUBDOMAIN}.n8n4you.com" --non-interactive --agree-tos -m "${CLIENT_EMAIL}" --redirect

echo ""
echo "https://${SUBDOMAIN}.n8n4you.com"
