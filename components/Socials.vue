<template>
  <ul class="socials-list">
    <li class="socials-item" v-for="social in socials" :key="social.name">
      <a :href="social.link" class="socials-link" :title="social.name">
        <i class="fab fa-fw socials-icon" :class="social.icon"></i>
        <span class="socials-text">{{ social.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
import { GoogleAnalytics } from '@/mixins/google-analytics'

export default {
  data() {
    return {
      socials: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/andresfloresdev',
          icon: 'fa-twitter'
        },
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/andresfloresdev/',
          icon: 'fa-instagram'
        },
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/andr%C3%A9s-flores-64538ba2/',
          icon: 'fa-linkedin-in'
        },
        {
          name: 'Github',
          link: 'https://github.com/andresfloresdev',
          icon: 'fa-github'
        }
      ]
    }
  }
}
</script>