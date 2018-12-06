<template>
  <section class="projects">
    <h2 class="projects-heading">
      Featured Projects
    </h2>
    <ul class="projects-list">
      <project class="projects-single" v-for="project in projects" :key="project.name" :class="project.emphasis ? 'is-emphasized' : ''" :project="project" tag="li"></project>
    </ul>
  </section>
</template>

<script>
import Project from '@/components/Project'

export default {
  components: {
    Project
  },
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