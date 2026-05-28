import { getStripeClient } from '../../utils/stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ email?: string }>(event)

  try {
    const stripe = getStripeClient()

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: config.stripePriceId, quantity: 1 }],
      ...(body?.email ? { customer_email: body.email } : {}),
      success_url: `${config.public.siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.siteUrl}/abonnement`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return { url: session.url }
  } catch (err) {
    console.error('[stripe] Error creating checkout session:', err)
    throw createError({ statusCode: 500, statusMessage: 'Impossible de créer la session de paiement' })
  }
})
