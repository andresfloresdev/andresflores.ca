<template>
  <footer class="main-footer">
    <div class="main-footer-container">
      <h2 class="main-footer-heading" v-scroll-reveal>
        {{ $t('heading') }}
      </h2>
      <p class="main-footer-text" v-scroll-reveal="{ delay: scrollRevealDelay(1) }" v-html="$t('text')"></p>
      <ul class="main-footer-actions" v-scroll-reveal="{ delay: scrollRevealDelay(2) }">
        <li class="main-footer-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-footer-action-cta" @click.native="$ga.event('CTA', 'click', 'footer', 'Get in touch')">
            {{ $t('cta') }}
          </call-to-action>
        </li>
      </ul>
    </div>
    <p class="main-footer-copyright" v-scroll-reveal="{ delay: scrollRevealDelay(3) }">
      &copy;&nbsp;2016&nbsp;&mdash;&nbsp;{{ currentYear }}, Andrés Flores, Montréal (Québec), Canada.
      {{ $t('madeWith') }} <a href="https://nuxtjs.org/" class="main-footer-copyright-made-with">Nuxt</a>.
      {{ $t('credit') }} <a href="https://unsplash.com/collections/3663654/andresfloresca/dffc625539d6d6ef421402bef392fcf3" class="main-footer-copyright-credit">Unsplash</a>.
    </p>
  </footer>
</template>

<script>
import CallToAction from '@/components/CallToAction'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    CallToAction
  },
  mixins: [scrollRevealDelay],
  i18n: {
    messages: {
      en: {
        heading: 'Send me a message!',
        text: 'I\'d be happy to grab some coffee and chat.<br>Shoot me an email and let\'s work something out.',
        cta: 'Get in touch',
        madeWith: 'Made with',
        credit: 'Project photos taken from'
      },
      fr: {
        heading: 'Écrivez-moi!',
        text: 'Il me fera plaisir de communiquer avec vous.<br>Envoyez-moi un courriel et discutons de votre projet.',
        cta: 'Contactez-moi',
        madeWith: 'Fait avec',
        credit: 'Photos des projets tirées de'
      }
    }
  },
  computed: {
    currentYear: () => new Date().getFullYear()
  }
}
</script>