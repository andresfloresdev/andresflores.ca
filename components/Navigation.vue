<template>
  <nav :class="classPrefix + '-navigation-wrap'">
    <ul :class="classPrefix + '-navigation-items'">
      <li :class="classPrefix + '-navigation-item'" v-for="(item, index) in items" :key="index">
        <a :href="'#' + convertToURL(item)" :class="classPrefix + '-navigation-link'" @click.prevent="vueScrollTo(item)">
          {{ item }}
        </a>
      </li>
    </ul>
  </nav>
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
      items: [
        'Home',
        'About',
        'Work',
        'Skills'
      ]
    }
  },
  methods: {
    convertToURL: (item) => item.toLowerCase(),
    vueScrollTo: function (item) {
      this.$scrollTo(`#${this.convertToURL(item)}`)
      window.location.hash = this.convertToURL(item)
    }
  }
}
</script>