export default defineNuxtConfig({
  compatibilityDate: '2025-05-27',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    stripePriceId: '',
    vpsHost: '',
    vpsUser: '',
    vpsPort: '22',
    vpsSshKey: '',
    vpsSshPassphrase: '',
    resendApiKey: '',
    fromEmail: '',
    public: {
      siteUrl: '',
      stripePublishableKey: '',
    },
  },
  nitro: {
    // ssh2 uses native bindings — keep it external so Nitro doesn't try to bundle it
    externals: {
      external: ['ssh2', 'cpu-features', 'sshcrypto'],
    },
  },
})
