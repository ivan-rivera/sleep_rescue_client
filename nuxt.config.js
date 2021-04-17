export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    exclude: [/^\/account/],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sleep Rescue',
    titleTemplate: '%s | Sleep Rescue',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Self guided Cognitive Behavioural Therapy (CBT-i) for insomniacs and those who suffer from sleep problems',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/Vuelidate', ssr: false },
    { src: '~/plugins/vClickOutside', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  router: {
    middleware: ['auth'],
  },

  auth: {
    localStorage: false,
    watchLoggedIn: true,
    redirect: {
      login: '/',
      logout: '/',
      home: '/account',
    },
    strategies: {
      cookie: {
        cookie: {
          name: 'XSRF-TOKEN',
        },
        endpoints: {
          csrf: {
            url: '',
          },
        },
      },
      local: {
        scheme: 'refresh',
        token: {
          property: 'data.access_token',
          maxAge: 60 * 60 * 24 * 90,
          type: '',
        },
        refreshToken: {
          property: 'data.refresh_token',
          maxAge: 60 * 60 * 24 * 90,
          type: '',
        },
        endpoints: {
          login: { url: '/session', method: 'post' },
          logout: { url: '/session', method: 'delete' },
          refresh: { url: '/session/renew', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user' },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:4000/api/v1',
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BROWSER_BASE_URL,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-import': true,
      },
    },
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  tailwindcss: {
    jit: true,
  },
}
