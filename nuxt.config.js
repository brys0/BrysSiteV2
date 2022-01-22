export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Brys's Site",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My personal site' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:site_name', property: 'og:site_name', content: "Brys's" },
      { hid: 'og:title', property: 'og:title', content: "Brys's Site" },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://chatty-api.feuer.tech/323047241636822274382/915520301640322043862.gif',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'My personal site.. because uhhh.... reasons..?',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://feuer.tech',
      },
      {
        name: 'theme-color',
        content: '#BB86FC',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://chatty-api.feuer.tech/323047241636822274382/915520301640322043862.gif',
      },
    ],
  },
  serverMiddleware: ['~/server-middleware/Verify.js'],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~assets/main.scss', lang: 'sass' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/motion.js', mode: 'client'},  {src: '~/utils/Util.js', mode: 'client'}],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-use-motion',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
  motion: {
    directives: {
      'pop-bottom': {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100,
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0,
        },
      },
    },
  },
}
