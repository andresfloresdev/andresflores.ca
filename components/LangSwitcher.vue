<template>
  <nuxt-link :to="route" class="lang-switcher" v-html="locale" @click.native="$ga.event('Language Switcher', 'click', 'header', $i18n.locale)"></nuxt-link>
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