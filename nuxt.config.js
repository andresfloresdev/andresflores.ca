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
  modules: [
    ['@nuxtjs/google-analytics', { ua: 'UA-68693066-1' }]
  ],
  plugins: [
    '~/plugins/filters',
    '~/plugins/vue-scrollto'
  ],
  head: {
    htmlAttrs: {
      lang: 'en-CA',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'I am a Front-end Web Developer based in Montreal, Canada.' },
      { name: 'google-site-verification', content: 'xwhKOFzo4bWJqw11wkUWRQp1mQoXVMSFXGUHX8y72rc'},
      { name: 'theme-color', content: '#427fed' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:400,700'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: 'https://s3.us-east-2.amazonaws.com/andresflores/assets/favicons/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'https://s3.us-east-2.amazonaws.com/andresflores/assets/favicons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: 'https://s3.us-east-2.amazonaws.com/andresflores/assets/favicons/favicon-96x96.png'
      },
    ]
  }
}