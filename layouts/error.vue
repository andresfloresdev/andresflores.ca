<template>
  <div class="error-layout">
    <main class="error-layout-main">
      <h1 class="error-layout-heading" v-if="error.statusCode">
        {{ $t('error') }}&nbsp;{{ error.statusCode }}
      </h1>
      <h1 class="error-layout-heading" v-else>
        {{ $t('anErrorOccurred') }}
      </h1>
      <p class="error-layout-text">
        {{ $t('text') }}
      </p>
      <nuxt-link class="error-layout-link" to="/">{{ $t('link') }}</nuxt-link>
    </main>
    <footer class="error-layout-footer">
      <copyright class="error-layout-copyright"></copyright>
    </footer>
  </div>
</template>

<script>
import Copyright from '@/components/Copyright'

export default {
  props: ['error'],
  layout: 'empty',
  components: {
    Copyright
  },
  i18n: {
    messages: {
      en: {
        error: 'Error',
        anErrorOccurred: 'An error occurred',
        text: 'Sorry, but the page you\'re trying to access doesn\'t exist.',
        link: 'Back to the Home page'
      },
      fr: {
        error: 'Erreur',
        anErrorOccurred: 'Une erreur est survenue',
        text: 'Désolé, mais la page à laquelle vous tentez d\'accéder n\'existe pas.',
        link: 'De retour à la page d\'accueil'
      }
    }
  }
}
</script>