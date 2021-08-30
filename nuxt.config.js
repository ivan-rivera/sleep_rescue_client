export default {
  server: {
    port: 8000,
    host: '0.0.0.0',
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: '404.html',
    exclude: [
      '/account',
      '/confirm',
      '/confirming',
      '/dashboard',
      '/goals',
      '/isi',
      '/reset',
      '/thoughts',
    ],
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
        hid: 'sleep-rescue',
        name: 'Sleep Rescue',
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
    script: [
      {
        hid: 'gtm-script1',
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_UA_ID}`,
        async: true,
        defer: true,
      },
      {
        hid: 'gtm-script2',
        innerHTML: `
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', '${process.env.GA_UA_ID}')
        `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/Vuelidate', ssr: false },
    { src: '~/plugins/vClickOutside', ssr: false },
    { src: '~/plugins/vuejs-datepicker', ssr: false, mode: 'client' },
    { src: '~/plugins/vue2-timepicker', ssr: false },
    { src: '~/plugins/vue-chart', ssr: false },
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
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['cookie-universal-nuxt', { SameSite: 'Strict' }],
  ],

  router: {
    middleware: ['auth', 'accountConfirmed'],
  },

  auth: {
    localStorage: true,
    watchLoggedIn: true,
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard',
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
        user: {
          property: false,
        },
        refreshToken: {
          property: 'data.renewal_token',
          maxAge: 60 * 60 * 24 * 90,
          type: '',
        },
        endpoints: {
          login: { url: '/v1/session', method: 'post' },
          logout: { url: '/v1/session', method: 'delete' },
          refresh: { url: '/v1/session/renew', method: 'post' },
          user: { url: '/v1/user', method: 'get', propertyName: false },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.SR_BACKEND_BASE_URL || 'http://192.168.0.11:4000/api',
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.SR_BACKEND_BASE_URL,
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
  googleAnalytics: {
    id: process.env.GA_UA_ID,
    autoTracking: {
      screenview: true,
    },
  },
}
