<template>
  <nav :class="classPrefix + '-wrap'">
    <ul :class="classPrefix + '-items'">
      <li :class="classPrefix + '-item'" v-for="(item, index) in items" :key="index">
        <a :href="'#' + convertToURL(item)" :class="classPrefix + '-link'" @click.prevent="vueScrollTo(item)">
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
      default: 'nav'
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