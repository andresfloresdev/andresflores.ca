module.exports = {
  mode: 'universal',
  css: [
    {
      src: '~assets/main.scss',
      lang: 'scss'
    }
  ],
  loading: {
    color: '#427fed'
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    { src: '~/plugins/vue-scroll-reveal', ssr: false },
    { src: '~/plugins/i18n' }
  ],
  modules: [
    [ '@nuxtjs/google-analytics', { id: 'UA-68693066-1' } ]
  ],
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: [
      require('autoprefixer')(),
    ]
  },
  generate: {
    routes: ['/', '/fr'],
    subfolders: false,
    fallback: '404.html'
  },
  render: {
    dist: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      index: false
    }
  },
  head: {
    htmlAttrs: {
      lang: 'en-CA',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'xwhKOFzo4bWJqw11wkUWRQp1mQoXVMSFXGUHX8y72rc'},
      { name: 'theme-color', content: '#252840' },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicons/favicon-96x96.png'
      },
    ]
  }
}