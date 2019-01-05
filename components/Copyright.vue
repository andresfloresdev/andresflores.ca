<template>
  <p class="copyright" v-scroll-reveal>
    &copy;&nbsp;2016&nbsp;&mdash;&nbsp;{{ currentYear }}, Andrés Flores, Montréal (Québec), Canada.
    {{ $t('madeWith') }} <a href="https://nuxtjs.org/" class="copyright-made-with" @click="$ga.event('Link', 'click', 'copyright', 'Nuxt')">Nuxt</a>.
    {{ $t('credit') }} <a href="https://unsplash.com/collections/3663654/andresfloresca/dffc625539d6d6ef421402bef392fcf3" class="copyright-credit" @click="$ga.event('Link', 'click', 'copyright', 'Unsplash')">Unsplash</a>.
  </p>
</template>

<script>
export default {
  i18n: {
    messages: {
      en: {
        madeWith: 'Made with',
        credit: 'Project photos from'
      },
      fr: {
        madeWith: 'Fait avec',
        credit: 'Photos des projets de'
      }
    }
  },
  computed: {
    currentYear: () => new Date().getFullYear()
  }
}
</script>