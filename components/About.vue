<template>
  <section class="about">
    <h2 class="about-heading">
      About me
    </h2>
    <div class="about-text-wrap">
      <p class="about-text" v-scroll-reveal="{ origin: 'left' }">
        <strong class="about-text-strong">I am a web consultant and a front-end web developer based in Montréal, Canada.</strong> I aim to help businesses conceive their projects and achieve their business goals through creative implementation of design and technology. {{ greeting }}
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
  computed: {
    greeting: () => {
      const hour = new Date().getHours()

      switch (true) {
        case (hour >= 0 && hour <= 4):
          return 'Thanks for being here so late!'
        case (hour >= 5 && hour <= 10):
          return 'I hope you have a great day!'
        case (hour >= 11 && hour <= 16):
          return 'I hope your day\'s going great!'
        case (hour >= 17 && hour <= 23):
          return 'I hope you had a great day today!'
        default: return
      }
    }
  },
  methods: {
    changeColor(color) {
      this.socialColor = color
    }
  }
}
</script>