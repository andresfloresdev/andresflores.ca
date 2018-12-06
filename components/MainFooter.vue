<template>
  <footer class="main-footer">
    <div class="main-footer-container">
      <h2 class="main-footer-heading" v-scroll-reveal>
        Send me a message!
      </h2>
      <p class="main-footer-text" v-scroll-reveal="{ delay: scrollRevealDelay(1) }">
        I'd be happy to grab some coffee and chat.<br>
        Shoot me an email and let's work something out.
      </p>
      <ul class="main-footer-actions" v-scroll-reveal="{ delay: scrollRevealDelay(2) }">
        <li class="main-footer-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-footer-action-cta">
            Get in touch
          </call-to-action>
        </li>
      </ul>
    </div>
    <p class="main-footer-copyright" v-scroll-reveal="{ delay: scrollRevealDelay(3) }">
      &copy;&nbsp;2016&nbsp;&mdash;&nbsp;{{ currentYear }}, Andrés Flores, Montréal (Québec), Canada.
    </p>
    <!-- <p class="main-footer-message">
      {{ footerMessage }}
    </p> -->
  </footer>
</template>

<script>
import CallToAction from '@/components/CallToAction'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    CallToAction
  },
  mixins: [scrollRevealDelay],
  computed: {
    currentYear: () => new Date().getFullYear(),
    footerMessage: () => {
      const hour = new Date().getHours()

      if (hour >= 0 && hour <= 4) return 'Greetings fellow night owl!'
      if (hour >= 5 && hour <= 10) return 'Good morning, have a great day!'
      if (hour >= 11 && hour <= 16) return 'I hope your day\'s going great!'
      if (hour >= 17 && hour <= 23) return 'I hope you had a great day today!'
    }
  }
}
</script>