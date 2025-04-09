<template>
  <ul class="socials-list">
    <li class="socials-item" v-for="social in socials" :key="social.name">
      <a :href="social.link" class="socials-link" :title="social.name" @mouseover.stop="$emit('social-color', social.color)" @mouseout="$emit('social-color', '#427fed')" @click="$ga.event('Social Link', 'click', social.name)">
        <i class="fab fa-fw socials-icon" :class="social.icon"></i>
        <span class="socials-text">{{ social.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/theandresflores',
          icon: 'fa-twitter',
          color: '#1da1f2'
        },
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/andresfloresdev/',
          icon: 'fa-instagram',
          color: '#e1306c'
        },
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/andres-flores-64538ba2/',
          icon: 'fa-linkedin-in',
          color: '#283e4a'
        },
        {
          name: 'Github',
          link: 'https://github.com/andresfloresdev',
          icon: 'fa-github',
          color: '#24292e'
        }
      ]
    }
  }
}
</script>