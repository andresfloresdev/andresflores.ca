module.exports = {
  css: [
    {
      src: '~assets/main.scss',
      lang: 'scss'
    }
  ],
  loading: {
    color: '#427fed'
  },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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
  head: {
    htmlAttrs: {
      lang: 'en-CA',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'I am a Front-end Web Developer based in Montreal, Canada.' },
      { name: 'google-site-verification', content: 'xwhKOFzo4bWJqw11wkUWRQp1mQoXVMSFXGUHX8y72rc'},
      { name: 'theme-color', content: '#252840' }
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