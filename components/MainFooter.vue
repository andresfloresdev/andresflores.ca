<template>
  <footer class="main-footer">
    <h2 class="main-footer-heading" v-scroll-reveal>
      {{ $t('heading') }}
    </h2>
    <!-- TODO: Adjust font-size on mobile views -->
    <p class="main-footer-text" v-scroll-reveal="{ delay: scrollRevealDelay(1) }" v-html="$t('text')"></p>
    <ul class="main-footer-actions" v-scroll-reveal="{ delay: scrollRevealDelay(2) }">
      <li class="main-footer-action">
        <call-to-action link="mailto:info@andresflores.ca" class="main-footer-action-cta" @click.native="$ga.event('CTA', 'click', 'footer', $t('cta'))">
          {{ $t('cta') }}
        </call-to-action>
      </li>
    </ul>
    <copyright class="main-footer-copyright"></copyright>
  </footer>
</template>

<script>
import CallToAction from '@/components/CallToAction'
import Copyright from '@/components/Copyright'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    CallToAction,
    Copyright
  },
  mixins: [scrollRevealDelay],
  i18n: {
    messages: {
      en: {
        heading: 'Send me a message!',
        text: 'I\'d be happy to grab some coffee and chat.<br>Shoot me an email and let\'s work something out.',
        cta: 'Get in touch',
        madeWith: 'Made with',
        credit: 'Project photos from'
      },
      fr: {
        heading: 'Écrivez-moi!',
        text: 'Il me fera plaisir de communiquer avec vous.<br>Envoyez-moi un courriel et discutons de votre projet.',
        cta: 'Contactez-moi',
        madeWith: 'Fait avec',
        credit: 'Photos des projets de'
      }
    }
  },
  computed: {
    currentYear: () => new Date().getFullYear()
  }
}
</script>