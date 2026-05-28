import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(useRuntimeConfig().resendApiKey)
  }
  return resendClient
}

export async function sendWelcomeEmail(to: string, instanceUrl: string): Promise<void> {
  const config = useRuntimeConfig()

  await getResendClient().emails.send({
    from: config.fromEmail,
    to,
    subject: 'Votre instance n8n est prête ! 🎉',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
        <h1 style="color: #ff6d00;">Bienvenue sur n8n4you !</h1>
        <p>Votre abonnement a été activé avec succès. Votre instance n8n personnelle est prête.</p>

        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="margin: 0 0 12px; font-size: 14px; color: #555;">Votre lien personnel :</p>
          <a href="${instanceUrl}"
             style="display: inline-block; background: #ff6d00; color: #fff; text-decoration: none;
                    padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Accéder à votre instance n8n
          </a>
          <p style="margin: 12px 0 0; font-size: 12px; color: #888;">${instanceUrl}</p>
        </div>

        <p><strong>Conseil :</strong> enregistrez ce lien dans vos favoris — c'est votre accès exclusif à votre instance.</p>

        <p>À la première connexion, il vous sera demandé de créer le compte <em>owner</em> : saisissez l'e-mail et le mot de passe de votre choix.</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
        <p style="font-size: 12px; color: #999;">
          n8n4you · Vous recevez cet e-mail parce que vous avez activé un abonnement sur n8n4you.com
        </p>
      </body>
      </html>
    `,
  })

  console.log('[email] Welcome email sent to', to)
}

export async function sendDeprovisionEmail(to: string): Promise<void> {
  const config = useRuntimeConfig()

  await getResendClient().emails.send({
    from: config.fromEmail,
    to,
    subject: 'Votre abonnement n8n4you a été résilié',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
        <h1>Abonnement résilié</h1>
        <p>Nous avons bien reçu la confirmation de résiliation de votre abonnement n8n4you.</p>
        <p>Votre instance n8n et toutes les données associées ont été supprimées de nos serveurs.</p>
        <p>Si vous avez changé d'avis, vous pouvez vous réabonner à tout moment sur
           <a href="https://n8n4you.com/abonnement">n8n4you.com/abonnement</a>.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
        <p style="font-size: 12px; color: #999;">
          n8n4you · Vous recevez cet e-mail parce que vous avez résilié votre abonnement.
        </p>
      </body>
      </html>
    `,
  })

  console.log('[email] Deprovision email sent to', to)
}
