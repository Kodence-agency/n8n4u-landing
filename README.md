# n8n4you

## Installation

Installez les dépendances :

```bash
pnpm install
```

## Serveur de développement

Lancez le serveur sur `http://localhost:3000` :

```bash
pnpm dev
```

## Production

Construisez l'application :

```bash
pnpm build
```

Prévisualisez le build en local :

```bash
pnpm preview
```

---

## Setup Stripe + Provisioning

### 1. Variables d'environnement

```bash
cp .env.example .env
```

Ouvrez `.env` et renseignez chaque variable (voir les commentaires dans le fichier).

---

### 2. Stripe — clés API et Price ID

1. Connectez-vous sur [dashboard.stripe.com](https://dashboard.stripe.com) et activez le **mode test** (bascule en haut à droite).
2. **Clés API** : menu *Développeurs → Clés API*
   - `NUXT_STRIPE_SECRET_KEY` → *Clé secrète* (`sk_test_…`)
   - `NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → *Clé publiable* (`pk_test_…`)
3. **Price ID** : menu *Produits → + Ajouter un produit* → créez le produit à 9,99 €/mois → copiez l'ID du prix (`price_…`)
   - `NUXT_STRIPE_PRICE_ID` → l'ID copié

---

### 3. Webhook Stripe

#### En local (Stripe CLI)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

La commande affiche un `whsec_…` à copier dans `NUXT_STRIPE_WEBHOOK_SECRET`.

#### En production

1. Dashboard → *Développeurs → Webhooks → + Ajouter un endpoint*
2. URL : `https://n8n4you.com/api/stripe/webhook`
3. Événements à écouter : `checkout.session.completed`, `customer.subscription.deleted`
4. Copiez le *Signing secret* (`whsec_…`) dans `NUXT_STRIPE_WEBHOOK_SECRET`

---

### 4. Resend

1. Inscrivez-vous sur [resend.com](https://resend.com) et vérifiez votre domaine expéditeur.
2. Allez sur *API Keys → Create API Key*.
3. `NUXT_RESEND_API_KEY` → la clé générée (`re_…`)
4. `NUXT_FROM_EMAIL` → adresse expéditeur vérifiée (ex. `noreply@n8n4you.com`)

---

### 5. Clé SSH privée dans le `.env`

La clé doit tenir sur une seule ligne logique avec les sauts de ligne remplacés par `\n` littéraux :

```bash
# Générez la chaîne à coller (macOS/Linux)
awk 'NF {printf "%s\\n", $0}' ~/.ssh/provisioner_nopass | sed 's/\\n$/\n/'
```

Collez le résultat dans le `.env` :

```
NUXT_VPS_SSH_KEY="-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1...\n-----END OPENSSH PRIVATE KEY-----\n"
```

> Les guillemets doubles sont nécessaires pour que dotenv interprète correctement la chaîne multiligne.
