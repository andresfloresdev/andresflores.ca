<template>
  <div class="home-layout">
    <about></about>
    <projects></projects>
  </div>
</template>

<script>
import About from '@/components/About'
import Projects from '@/components/Projects'

export default {
  components: {
    About,
    Projects
  },
  i18n: {
    messages: {
      en: {
        title: 'Andrés Flores, Web Consultant & Developer',
        description: 'I am a web consultant & developer based in Montréal, Canada.'
      },
      fr: {
        title: 'Andrés Flores, consultant et développeur Web',
        description: 'Je suis un consultant et développeur Web basé à Montréal, au Canada.'
      }
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: `${this.$i18n.locale}-CA`,
      },
      title: this.$i18n.t('title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$i18n.t('description') },
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: '@andresfloresdev' },
        { name: 'twitter:url', content: 'https://andresflores.ca/' },
        { name: 'twitter:title', content: this.$i18n.t('title') },
        { name: 'twitter:description', content: this.$i18n.t('description') },
        { name: 'twitter:image', content: 'https://andresflores.ca/images/dark-bg-1200x.png' },
        // Facebook Open Graph
        { property: 'og:url', content: 'https://andresflores.ca/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.$i18n.t('title') },
        { property: 'og:image', content: 'https://andresflores.ca/images/dark-bg-1200x.png' },
        { property: 'og:description', content: this.$i18n.t('description') },
        { property: 'og:site_name', content: this.$i18n.t('title') },
        { property: 'og:locale', content: `${this.$i18n.locale}-CA` },
        { property: 'article:author', content: 'Andrés Flores' }
      ]
    }
  }
}
</script>