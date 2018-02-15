import Vue from 'vue'

export const InternalLinks = {
  methods: {
    navigateTo: function (id) {
      const formattedID = Vue.filter('slugify')(id)
      this.$scrollTo(Vue.filter('formatToID')(formattedID))
      window.location.hash = formattedID
    }
  }
}