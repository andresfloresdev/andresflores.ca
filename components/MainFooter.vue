<template>
  <footer class="main-footer">
    <div class="main-footer-container">
      <h1 class="main-footer-heading">
        Send me a message!
      </h1>
      <p class="main-footer-text">
        I'd be happy to grab some coffee and chat.<br>
        Shoot me an email and let's work something out.
      </p>
      <ul class="main-footer-actions">
        <li class="main-footer-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-footer-action-cta">
            Get in touch
          </call-to-action>
        </li>
      </ul>
      <p class="main-footer-message">
        {{ footerMessage }}
      </p>
    </div>
    <div class="main-footer-copyright">
      <div class="main-footer-copyright-container">
        <p class="main-footer-copyright-text">
          &copy; 2016 &mdash; {{ currentYear }}, Andrés Flores, Montréal (Québec), Canada.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import CallToAction from '@/components/CallToAction'

export default {
  components: {
    CallToAction
  },
  computed: {
    currentYear: () => new Date().getFullYear(),
    footerMessage: () => {
      const hours = new Date().getHours()

      if (hours >= 0 && hours <= 4) return 'Greetings fellow night owl!'
      if (hours >= 5 && hours <= 10) return 'Good morning, have a great day!'
      if (hours >= 11 && hours <= 16) return 'I hope your day\'s going great!'
      if (hours >= 17 && hours <= 23) return 'I hope you had a great day!'
    }
  }
}
</script>