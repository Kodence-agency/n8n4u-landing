import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripeClient(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(useRuntimeConfig().stripeSecretKey, {
      apiVersion: '2024-12-18.acacia',
    })
  }
  return stripeInstance
}
