<template>
  <section class="projects">
    <h2 class="projects-heading" v-scroll-reveal>
      Featured Projects
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
        tags: {
          development: 'Development & integration',
          uxui: 'UX/UI',
          design: 'Design',
          motionGraphics: 'Motion graphics'
        }
      },
      fr: {
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
      projects: [ // TODO: Add two more projects
        {
          name: 'DavidsTea',
          image: 'davidstea.jpg',
          tags: [
            this.$i18n.t('tags.development')
          ],
          emphasis: true
        },
        {
          name: 'CNESST',
          image: 'cnesst.jpg',
          tags: [
            this.$i18n.t('tags.development'),
            this.$i18n.t('tags.uxui')
          ]
        },
        {
          name: 'DuProprio',
          image: 'duproprio.jpg',
          tags: [
            this.$i18n.t('tags.design'),
            this.$i18n.t('tags.motionGraphics')
          ]
        },
        {
          name: 'Laura Canada',
          image: 'laura.jpg',
          tags: [
            this.$i18n.t('tags.development')
          ],
          emphasis: true
        }
      ]
    }
  }
}
</script>