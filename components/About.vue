<template>
  <section class="about">
    <h2 class="about-heading">
      About me
    </h2>
    <div class="about-text-wrap">
      <p class="about-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
    <div class="about-socials-wrap" :style="{ backgroundColor: socialColor }">
      <socials class="about-socials" @social-color="changeColor"></socials>
    </div>
  </section>
</template>

<script>
import Socials from '@/components/Socials'

export default {
  components: {
    Socials
  },
  data() {
    return {
      socialColor: '#427fed'
    }
  },
  methods: {
    changeColor(color) {
      this.socialColor = color
    }
  }
}
</script>