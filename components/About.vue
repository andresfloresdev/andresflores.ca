<template>
  <section class="about">
    <h2 class="about-heading">
      {{ $t('heading') }}
    </h2>
    <div class="about-text-wrap">
      <p class="about-text" v-scroll-reveal="{ origin: 'left' }">
        <strong class="about-text-strong">{{ $t('strong') }}</strong>
        {{ $t('text') }}
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
  i18n: {
    messages: {
      en: {
        heading: 'About me',
        strong: 'I am a web consultant and a front-end web developer based in Montréal, Canada.',
        text: 'I aim to help businesses conceive their projects and achieve their business goals through creative implementation of design and technology.'
      },
      fr: {
        heading: 'À propos de moi',
        strong: 'Je suis un consultant et développeur Web front-end basé à Montréal, au Canada.',
        text: 'Je souhaite aider les entreprises à concevoir leurs projets et à atteindre leurs objectifs grâce à une mise en œuvre créative du design et de la technologie.'
      }
    }
  },
  data() {
    return {
      socialColor: '#427fed'
    }
  },
  computed: {
    // greeting: () => {
    //   const hour = new Date().getHours()

    //   switch (true) {
    //     case (hour >= 0 && hour <= 4):
    //       return 'Thanks for being here so late!'
    //     case (hour >= 5 && hour <= 10):
    //       return 'I hope you have a great day!'
    //     case (hour >= 11 && hour <= 16):
    //       return 'I hope your day\'s going great!'
    //     case (hour >= 17 && hour <= 23):
    //       return 'I hope you had a great day today!'
    //     default: return
    //   }
    // }
  },
  methods: {
    changeColor(color) {
      this.socialColor = color
    }
  }
}
</script>