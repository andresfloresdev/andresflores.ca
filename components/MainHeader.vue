<template>
  <header class="main-header" v-scroll-reveal>
    <div class="main-header-container">
      <brand class="main-header-brand"></brand>
      <h1 class="main-header-heading" v-scroll-reveal="{ delay: scrollRevealDelay(1) }">
        Andrés Flores&nbsp;
        <span class="main-header-subheading" v-scroll-reveal="{ delay: scrollRevealDelay(2) }">Web consultant &amp; developer</span>
      </h1>
      <p class="main-header-text" v-scroll-reveal="{ delay: scrollRevealDelay(3) }">
        I strive to propel the harmony between design and technology forward with creative solutions.
      </p>
      <ul class="main-header-actions" v-scroll-reveal="{ delay: scrollRevealDelay(4) }">
        <li class="main-header-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-header-cta">
            Get in touch
          </call-to-action>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import Brand from '@/components/Brand'
import CallToAction from '@/components/CallToAction'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    Brand,
    CallToAction
  },
  mixins: [scrollRevealDelay]
}
</script>