<template>
  <footer class="main-footer">
    <div class="main-footer-top">
      <div class="main-footer-container">
        <div class="main-footer-top-contact">
          <brand class="main-footer-logo"></brand>
          <p class="main-footer-top-text">
            Have any questions? <a href="mailto:info@andresflores.ca" class="main-footer-top-text-link">Send me a message!</a>
          </p>
        </div>
        <navigation class-prefix="main-footer"></navigation>
      </div>
    </div>
    <div class="main-footer-bot">
      <div class="main-footer-container">
        <socials class-prefix="main-footer"></socials>
        <p class="main-footer-text">
          &copy; 2016 &mdash; {{ currentYear }}, Andrés Flores, Montréal (Québec), Canada.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import Brand from '@/components/Brand'
import Navigation from '@/components/Navigation'
import Socials from '@/components/Socials'

export default {
  components: {
    Brand,
    Navigation,
    Socials
  },
  computed: {
    currentYear: () => new Date().getFullYear()
  }
}
</script>