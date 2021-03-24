export default {
  mode: 'spa',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Adiary-Vuex-Nuxt-AntDesign',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js', body:true
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js', body:true
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  router: {
    middleware: ['loadExternalJS', 'check-auth', 'auth', 'get-user',]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],axios: {
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
