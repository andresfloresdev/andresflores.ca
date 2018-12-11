<template>
  <header class="main-header" v-scroll-reveal>
    <div class="main-header-container">
      <brand class="main-header-brand"></brand>
      <ul class="main-header-langs">
        <li class="main-header-lang">
          <a href="#" class="main-header-lang-link">
            EN
          </a>
        </li>
      </ul>
      <h1 class="main-header-heading" v-scroll-reveal="{ delay: scrollRevealDelay(1) }">
        Andrés Flores&nbsp;
        <span class="main-header-subheading" v-scroll-reveal="{ delay: scrollRevealDelay(2) }">{{ $t('subheading') }}</span>
      </h1>
      <p class="main-header-text" v-scroll-reveal="{ delay: scrollRevealDelay(3) }">
        {{ $t('text') }}
      </p>
      <ul class="main-header-actions" v-scroll-reveal="{ delay: scrollRevealDelay(4) }">
        <li class="main-header-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-header-cta" @click.native="$ga.event('CTA', 'click', 'header', 'Get in touch')">
            {{ $t('cta') }}
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
  mixins: [scrollRevealDelay],
  i18n: {
    messages: {
      en: {
        subheading: 'Web consultant & developer',
        text: 'I strive to propel the harmony between design and technology forward with creative solutions.',
        cta: 'Get in touch'
      },
      fr: {
        subheading: 'Consultant et développeur Web',
        text: 'Je trouve des solutions créatives afin de faire progresser l\'harmonie entre le design et la technologie.',
        cta: 'Contactez-moi'
      }
    }
  }
}
</script>