<template>
  <section class="about">
    <h2 class="about-heading">
      About me
    </h2>
    <div class="about-text-wrap">
      <p class="about-text" v-scroll-reveal="{ origin: 'left' }">
        <strong class="about-text-strong">I am a web consultant and a front-end web developer based in Montréal, Canada.</strong> I aim to help businesses conceive their projects and achieve their business goals through creative implementation of design and technology.
      </p>
    </div>
    <div class="about-socials-wrap" :style="{ backgroundColor: socialColor }">
      <socials class="about-socials" @social-color="changeColor" v-scroll-reveal="{ origin: 'left', delay: scrollRevealDelay(1) }"></socials>
    </div>
  </section>
</template>

<script>
import Socials from '@/components/Socials'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    Socials
  },
  mixins: [scrollRevealDelay],
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