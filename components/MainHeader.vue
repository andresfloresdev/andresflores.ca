<template>
  <header class="main-header">
    <div class="main-header-container">
      <brand class="main-header-brand"></brand>
      <ul class="main-header-langs" v-scroll-reveal>
        <li class="main-header-lang">
          <lang-switcher class="main-header-lang-link"></lang-switcher>
        </li>
      </ul>
      <h1 class="main-header-heading" v-scroll-reveal="{ delay: scrollRevealDelay(1) }">
        Andrés Flores<span class="sr-only">&comma;&nbsp;</span><span class="main-header-subheading" v-scroll-reveal="{ delay: scrollRevealDelay(2) }">{{ $t('subheading') }}</span>
      </h1>
      <p class="main-header-text" v-scroll-reveal="{ delay: scrollRevealDelay(3) }">
        {{ $t('text') }}
      </p>
      <ul class="main-header-actions" v-scroll-reveal="{ delay: scrollRevealDelay(5) }">
        <li class="main-header-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-header-cta" @click.native="$ga.event('CTA', 'click', 'header', 'Get in touch')">
            {{ $t('cta') }}
          </call-to-action>
        </li>
      </ul>
      <figure class="main-header-figure" v-scroll-reveal="{ delay: scrollRevealDelay(4) }">
        <img src="~assets/images/andres-portrait.jpg"
             srcset="~assets/images/andres-portrait.jpg 1x,
                     ~assets/images/andres-portrait@2x.jpg 2x"
             :alt="$t('imageAlt')" class="main-header-figure-image">
      </figure>
    </div>
  </header>
</template>

<script>
import Brand from '@/components/Brand'
import LangSwitcher from '@/components/LangSwitcher'
import CallToAction from '@/components/CallToAction'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    Brand,
    LangSwitcher,
    CallToAction
  },
  mixins: [scrollRevealDelay],
  i18n: {
    messages: {
      en: {
        subheading: 'consultant, developer & designer',
        text: 'I strive to propel the harmony between design and technology forward with creative solutions.',
        cta: 'Get in touch',
        imageAlt: 'Andrés Flores, consultant, developer & designer'
      },
      fr: {
        subheading: 'consultant, développeur et designer',
        text: 'Je trouve des solutions créatives afin de faire progresser l\'harmonie entre le design et la technologie.',
        cta: 'Contactez-moi',
        imageAlt: 'Andrés Flores, consultant, développeur et designer'
      }
    }
  }
}
</script>