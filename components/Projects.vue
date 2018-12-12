<template>
  <section class="projects">
    <h2 class="projects-heading" v-scroll-reveal>
      {{ $t('heading') }}
    </h2>
    <ul class="projects-list" v-scroll-reveal>
      <project class="projects-single" v-for="project in projects" :key="project.name" :class="project.emphasis ? 'is-emphasized' : ''" :project="project" tag="li"></project>
    </ul>
  </section>
</template>

<script>
import Project from '@/components/Project'
import { scrollRevealDelay } from '@/mixins/scroll-reveal-delay'

export default {
  components: {
    Project
  },
  mixins: [scrollRevealDelay],
  i18n: {
    messages: {
      en: {
        heading: 'Selected Work',
        tags: {
          development: 'Development & integration',
          uxui: 'UX/UI',
          design: 'Design',
          motionGraphics: 'Motion graphics'
        }
      },
      fr: {
        heading: 'Quelques projets',
        tags: {
          development: 'Développement & intégration',
          uxui: 'UX/UI',
          design: 'Design',
          motionGraphics: 'Animation graphique'
        }
      }
    }
  },
  data() {
    return {
      projects: [
        {
          name: 'DavidsTea',
          image: 'davidstea.jpg',
          tags: [
            this.$i18n.t('tags.development')
          ],
          link: 'https://www.davidstea.com/',
          emphasis: true
        },
        {
          name: 'CNESST',
          image: 'cnesst.jpg',
          tags: [
            this.$i18n.t('tags.development'),
            this.$i18n.t('tags.uxui')
          ],
          link: 'https://www.parlersst.com/'
        },
        {
          name: 'DuProprio',
          image: 'duproprio.jpg',
          tags: [
            this.$i18n.t('tags.design'),
            this.$i18n.t('tags.motionGraphics')
          ],
          link: 'https://duproprio.com/'
        },
        {
          name: 'Laura Canada',
          image: 'laura.jpg',
          tags: [
            this.$i18n.t('tags.development')
          ],
          link: 'https://www.laura.ca/',
          emphasis: true
        },
        {
          name: 'Fizik',
          image: 'fizik.jpg',
          tags: [
            this.$i18n.t('tags.development'),
            this.$i18n.t('tags.uxui'),
            this.$i18n.t('tags.design')
          ],
          link: 'http://fizik.ca/',
          emphasis: true
        },
        {
          name: 'Yu Centrik',
          image: 'yucentrik.jpg',
          tags: [
            this.$i18n.t('tags.development'),
            this.$i18n.t('tags.uxui')
          ],
          link: 'https://yucentrik.ca/'
        }
      ]
    }
  }
}
</script>