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
  data() {
    return {
      projects: [
        {
          name: 'DavidsTea',
          image: 'davidstea.jpg',
          tags: [
            'Development & integration'
          ],
          emphasis: true
        },
        {
          name: 'CNESST',
          image: 'cnesst.jpg',
          tags: [
            'Development & integration',
            'UX/UI'
          ]
        },
        {
          name: 'DuProprio',
          image: 'duproprio.jpg',
          tags: [
            'Design',
            'Motion graphics'
          ]
        },
        {
          name: 'Laura Canada',
          image: 'laura.jpg',
          tags: [
            'Development & integration'
          ],
          emphasis: true
        }
      ]
    }
  }
}
</script>