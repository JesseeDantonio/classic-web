// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    // Côté serveur uniquement
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    // Côté client et serveur
    public: {
      stripePublishableKey: '',
      baseUrlTest: 'http://localhost:3000',
      baseUrlProd: 'https://classicstudiohub.fr'
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
