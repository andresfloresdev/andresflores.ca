export const InternalLinks = {
  methods: {
    formatToURL: (string) => string.toLowerCase(),
    navigateTo: function (id) {
      const formattedID = this.formatToURL(id)
      this.$scrollTo(`#${formattedID}`)
      window.location.hash = formattedID
    }
  }
}