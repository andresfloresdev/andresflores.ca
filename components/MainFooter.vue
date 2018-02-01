<template>
  <footer class="main-footer">
    <div class="main-footer-container">
      <ul class="main-footer-socials">
        <li class="main-footer-social">
          <a href="https://twitter.com/andresfloresdev" class="main-footer-social-link" title="Twitter">
            <i class="fa fa-fw fa-twitter"></i>
          </a>
        </li>
        <li class="main-footer-social">
          <a href="https://www.instagram.com/andresflores.dev/" class="main-footer-social-link" title="Instagram">
            <i class="fa fa-fw fa-instagram"></i>
          </a>
        </li>
        <li class="main-footer-social">
          <a href="https://www.linkedin.com/in/andr%C3%A9s-flores-64538ba2/" class="main-footer-social-link" title="LinkedIn">
            <i class="fa fa-fw fa-linkedin"></i>
          </a>
        </li>
      </ul>
      <p class="main-footer-text">
        &copy; 2016 &mdash; {{ currentYear }}, Andrés Flores, Montréal (Quebec), Canada.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear: function () {
      return new Date().getFullYear()
    }
  }
}
</script>