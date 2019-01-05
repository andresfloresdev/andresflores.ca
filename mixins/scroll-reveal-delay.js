import Vue from 'vue'

export const scrollRevealDelay = {
  data() {
    return {
      scrollRevealDelayInterval: 150
    }
  },
  methods: {
    scrollRevealDelay: function (n, interval = this.scrollRevealDelayInterval) {
      return n * interval
    }
  }
}