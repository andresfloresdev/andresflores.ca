<template>
  <section class="mc-subscribe">
    <h2 class="mc-subscribe-heading">
      {{ $t('heading') }}
    </h2>
    <form class="mc-subscribe-form" v-if="!successMessage" @submit.prevent="subscribe($event)">
      <input type="text" name="FNAME" :placeholder="$t('yourName')" class="mc-subscribe-input-name" v-model="firstName">
      <input type="email" name="EMAIL" :placeholder="$t('yourEmail')" class="mc-subscribe-input-email" v-model="email">
      <button type="submit" class="mc-subscribe-submit" :disabled="!firstName || !email">
        <span class="fa fa-check"></span>
      </button>
    </form>
    <transition name="fade">
      <p class="mc-subscribe-error-msg" v-if="errorMessage && !successMessage">
        {{ errorMessage }}
      </p>
      <p class="mc-subscribe-success-msg" v-if="successMessage">
        {{ successMessage }}
      </p>
    </transition>
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
  i18n: {
    messages: {
      en: {
        heading: 'Get updates delivered straight to your inbox!',
        yourName: 'Your name',
        yourEmail: 'Your email',
        successMessage: 'Thank you for subscribing!',
        emailInvalid: 'Your email seems to be invalid',
        somethingWentWrong: 'Something went wrong. Sorry, please try again later!',
        alreadySubscribed: 'Wow, you\'re already subscribed, yay!'
      },
      fr: {
        heading: 'Je vous tiens au courant directement par courriel!',
        yourName: 'Votre nom',
        yourEmail: 'Votre adresse courriel',
        successMessage: 'Merci de vous être abonné!',
        emailInvalid: 'Votre adresse courriel semble être invalide.',
        somethingWentWrong: 'Une erreur s\'est produite. Désolé, veuillez réessayer plus tard!',
        alreadySubscribed: 'Wow, vous êtes déjà abonné!'
      }
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

      const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

      if (!email.test(params.EMAIL)) {
        this.errorMessage = this.$i18n.t('emailInvalid')
        return
      }

      axios.get(this.mutatedUrl, { params })
      .then((res) => {
        if (res.data.result === 'success') {
          this.successMessage = this.$i18n.t('successMessage')
        } else if (res.data.result === 'error' && res.data.msg.includes('already subscribed')) {
          this.successMessage = this.$i18n.t('alreadySubscribed')
        } else {
          this.errorMessage = `Mailchimp: ${res.data.msg}`
        }
      })
      .catch((error) => {
        this.errorMessage = this.$i18n.t('somethingWentWrong')
      })
    }
  }
}
</script>