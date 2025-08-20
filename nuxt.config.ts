// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    // Côté serveur uniquement
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

    // Côté client et serveur
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      baseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:3000'
    }
  },
  app: {
    head: {
      title: 'Classic Studio',
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap',
          rel: 'stylesheet'
        }
      ]
    }
  },
  devtools: { enabled: true },
})
