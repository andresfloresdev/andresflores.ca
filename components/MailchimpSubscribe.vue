<template>
  <section class="subscribe">
    <form v-if="!successMessage" @submit.prevent="subscribe($event)">
      <input type="text" name="FNAME" placeholder="Your name" v-model="firstName">
      <input type="email" name="EMAIL" placeholder="Your email" v-model="email">
      <input type="submit" v-if="firstName && email">
    </form>
    <p v-if="errorMessage && !successMessage" transition="fade">
      {{ errorMessage }}
    </p>
    <p v-if="successMessage" transition="fade">
      {{ successMessage }}
    </p>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      firstName: '',
      email: '',
      response: {},
      errorMessage: null,
      successMessage: null
    }
  },
  computed: {
    mutatedUrl: function () {
      return this.url.replace('/post?', '/post-json?')
    },
  },
  methods: {
    subscribe: function (event) {
      const elements = Array.from(event.target.elements)
      let params = {}

      elements.forEach(input => {
        if (input.value) {
          params[input.name] = input.value
        }
      })

      axios.get(this.mutatedUrl, { params })
      .then((res) => {
        if (res.data.result === 'success') {
          this.successMessage = res.data.msg
        } else if (res.data.result === 'error' && res.data.msg.includes('already subscribed')) {
          this.successMessage = 'Wow, you\'re already subscribed, yay!'
        } else {
          this.errorMessage = res.data.msg
        }
      })
      .catch((error) => {
        this.errorMessage = 'Something went wrong. Sorry, please try again later!'
      })
    }
  }
}
</script>