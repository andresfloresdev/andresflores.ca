<template>
  <nuxt-link :to="route" class="lang-switcher" v-html="locale"></nuxt-link>
</template>

<script>
export default {
  computed: {
    locale: function () {
      return (this.$i18n.locale === 'fr' ? 'en' : 'fr')
    },
    route: function () {
      return (this.$i18n.locale === 'fr' ? '/' : '/fr')
    },
  }
}
</script>