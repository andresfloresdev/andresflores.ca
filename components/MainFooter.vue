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
        <nav class="main-footer-nav">
          <ul class="main-footer-nav-items">
            <li class="main-footer-nav-item">
              <a href="#home" v-scroll-to="'#home'" class="main-footer-nav-link">
                Home
              </a>
            </li>
            <li class="main-footer-nav-item">
              <a href="#about" v-scroll-to="'#about'" class="main-footer-nav-link">
                About
              </a>
            </li>
            <li class="main-footer-nav-item">
              <a href="#work" v-scroll-to="'#work'" class="main-footer-nav-link">
                Work
              </a>
            </li>
            <li class="main-footer-nav-item">
              <a href="#skills" v-scroll-to="'#skills'" class="main-footer-nav-link">
                Skills
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="main-footer-bot">
      <div class="main-footer-container">
        <socials
        list-class="main-footer-socials"
        item-class="main-footer-social"
        link-class="main-footer-social-link"
        icon-class="main-footer-social-link-icon"></socials>
        <p class="main-footer-text">
          &copy; 2016 &mdash; {{ currentYear }}, Andrés Flores, Montréal (Québec), Canada.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import Brand from '@/components/Brand'
import Socials from '@/components/Socials'

export default {
  components: {
    Brand,
    Socials
  },
  computed: {
    currentYear: () => new Date().getFullYear()
  }
}
</script>