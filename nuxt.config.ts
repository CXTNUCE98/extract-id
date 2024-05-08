// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  imports: {
    dirs: [
      'constants',
    ],
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
    },
    baseURL: '/',
  },
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', "@nuxtjs/tailwindcss", '@element-plus/nuxt', '@unocss/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },  
  
})