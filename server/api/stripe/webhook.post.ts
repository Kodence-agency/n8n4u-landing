import type Stripe from 'stripe'
import { getStripeClient } from '../utils/stripe'
import { runOnVps } from '../utils/ssh'
import { sendWelcomeEmail } from '../utils/email'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = getStripeClient()

  const rawBody = await readRawBody(event)
  const signature = getHeader(event, 'stripe-signature')

  if (!rawBody || !signature) {
    throw createError({ statusCode: 400, statusMessage: 'Missing body or Stripe-Signature header' })
  }

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, config.stripeWebhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err)
    throw createError({ statusCode: 400, statusMessage: 'Invalid webhook signature' })
  }

  console.log('[stripe-webhook] Received event:', stripeEvent.type)

  try {
    if (stripeEvent.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(stripeEvent.data.object as Stripe.Checkout.Session)
    } else if (stripeEvent.type === 'customer.subscription.deleted') {
      await handleSubscriptionDeleted(stripeEvent.data.object as Stripe.Subscription)
    }
  } catch (err) {
    // Log but don't re-throw — always return 200 so Stripe doesn't retry indefinitely
    console.error('[stripe-webhook] Error processing event', stripeEvent.type, err)
  }

  return { received: true }
})

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const email = session.customer_email ?? session.customer_details?.email ?? ''

  if (!email) {
    console.error('[stripe-webhook] checkout.session.completed — no email found, session:', session.id)
    return
  }

  const subscriptionId = resolveId(session.subscription)
  const customerId = resolveId(session.customer)

  const clientId = `c${Date.now()}${Math.random().toString(36).slice(2, 6)}`

  const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  const subdomain = `${emailPrefix}${Math.random().toString(36).slice(2, 6)}`.slice(0, 30)

  console.log('[stripe-webhook] Provisioning', { clientId, subdomain, email })

  const output = await runOnVps(`/opt/saas/scripts/provision.sh ${clientId} ${subdomain} ${email}`)

  const lines = output.split('\n').filter((l) => l.startsWith('https://'))
  const instanceUrl = lines[lines.length - 1] ?? ''

  // TODO: save mapping { subscriptionId, customerId, clientId, subdomain, email } to database

  console.log('[stripe-webhook] Provisioned', { subscriptionId, customerId, clientId, instanceUrl })

  await sendWelcomeEmail(email, instanceUrl)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  // TODO: retrieve clientId and email from database using subscription.id
  // Then:
  //   await runOnVps(`/opt/saas/scripts/deprovision.sh ${clientId} yes`)
  //   await sendDeprovisionEmail(email)
  console.log('[stripe-webhook] Deprovisioning not yet implemented. Subscription:', subscription.id)
}

function resolveId(obj: string | { id: string } | null | undefined): string {
  if (!obj) return ''
  return typeof obj === 'string' ? obj : obj.id
}
