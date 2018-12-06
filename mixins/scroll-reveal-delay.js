import Vue from 'vue'

export const scrollRevealDelay = {
  data() {
    return {
      scrollRevealDelayInterval: 150
    }
  },
  methods: {
    scrollRevealDelay: function (n) {
      return n * this.scrollRevealDelayInterval
    }
  }
}