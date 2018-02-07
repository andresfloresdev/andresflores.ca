<template>
  <ul :class="listClass">
    <li :class="itemClass" v-for="(social, index) in socials" :key="index">
      <a :href="social.link" :class="linkClass" :title="social.name">
        <i class="fab fa-fw" :class="[social.icon, iconClass]"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listClass: {
      type: String,
      default: 'socials-list'
    },
    itemClass: {
      type: String,
      default: 'socials-item'
    },
    linkClass: {
      type: String,
      default: 'socials-link'
    },
    iconClass: {
      type: String,
      default: 'socials-icon'
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