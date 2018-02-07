<template>
  <ul :class="classPrefix + '-socials-list'">
    <li :class="classPrefix + '-socials-item'" v-for="(social, index) in socials" :key="index">
      <a :href="social.link" :class="classPrefix + '-socials-link'" :title="social.name">
        <i class="fab fa-fw" :class="[social.icon, classPrefix + '-socials-icon']"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    classPrefix: {
      type: String,
      default: 'base'
    }
  },
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
          link: 'https://www.instagram.com/andresflores.dev/',
          icon: 'fa-instagram'
        },
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/andr%C3%A9s-flores-64538ba2/',
          icon: 'fa-linkedin-in'
        },
        {
          name: 'Github',
          link: 'https://github.com/PerfectNull/andresflores.ca/',
          icon: 'fa-github'
        }
      ]
    }
  }
}
</script>