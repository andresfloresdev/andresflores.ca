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
import jsonp from 'jsonp'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

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
      // console.log(event.target.elements.length)
      // for (let i = 0; i < elements.length; i++) {
      //   if (elements[i].value) {
      //     inputs[elements[i].name] = elements[i].value
      //   }
      // }

      elements.forEach(input => {
        if (input.value) {
          params[input.name] = input.value
        }
      });
      // Array.from(event.target.elements).find(input => {
      //   if (input.value) {
      //     inputs[input.name] = input.value
      //   }
      // })
      // console.log(params)
      // const params = $(event.currentTarget).serialize()
      // const callback = (res) => {
      //   if (res.result === 'success') {
      //     this.successMessage = res.msg
      //   } else {
      //     this.errorMessage = res.msg
      //   }
      // }

      // $.ajax({
      //   type: 'GET',
      //   url: this.mutatedUrl,
      //   data: params,
      //   datatype: 'json',
      //   // jsonpCallback: 'callback',
      //   success: callback
      // })

      // Apparently works
      axios.get(this.mutatedUrl, { params })
      .then((res) => {
        console.log(res.data)
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

      // jsonp(`${this.mutatedUrl}&EMAIL=${event.target[0].value}`, function (err, data) {
      //   if (err) {
      //     console.error('Error')
      //     console.log(err)
      //   } else {
      //     console.log('Success')
      //     console.log(data)
      //   }
      // })
    }
  }
}
</script>