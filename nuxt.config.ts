// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
