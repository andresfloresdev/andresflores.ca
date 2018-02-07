<template>
  <nav :class="navClass">
    <ul :class="listClass">
      <li :class="itemClass" v-for="(item, index) in items" :key="index">
        <a :href="'#' + convertToURL(item)" @click.prevent="vueScrollTo(item)" :class="linkClass">
          {{ item }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    navClass: {
      type: String,
      default: 'nav-wrap'
    },
    listClass: {
      type: String,
      default: 'nav-list'
    },
    itemClass: {
      type: String,
      default: 'nav-item'
    },
    linkClass: {
      type: String,
      default: 'nav-link'
    },
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