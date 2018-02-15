export const GoogleAnalytics = {
  methods: {
    ga: function (category, action, label) {
      this.$ga.event(category, action, label)
    }
  }
}