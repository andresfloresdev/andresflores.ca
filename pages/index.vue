<template>
  <div class="home-layout">
    <about></about>
    <projects></projects>
  </div>
</template>

<script>
import About from '@/components/About'
import Projects from '@/components/Projects'

export default {
  components: {
    About,
    Projects
  },
  head() {
    return {
      title: 'Andrés Flores, Web Consultant & Developer',
      meta: [
        // Twitter Card
        { name:'twitter:card', content:'summary'},
        { name:'twitter:creator', content:'@andresfloresdev'},
        { name:'twitter:url', content:'https://andresflores.ca/'},
        { name:'twitter:title', content:'Andrés Flores, Web Consultant & Developer'},
        { name:'twitter:description', content:'Web consultant & developer based in Montréal, Canada.'},
        { name:'twitter:image', content:'https://andresflores.ca/images/dark-bg-1200x.png'},
        // Facebook Open Graph
        { property: 'og:url', content: 'https://andresflores.ca/'},
        { property: 'og:type', content: 'website'},
        { property: 'og:title', content: 'Andrés Flores, Web Consultant & Developer'},
        { property: 'og:image', content: 'https://andresflores.ca/images/dark-bg-1200x.png'},
        { property: 'og:description', content: 'Web consultant & developer based in Montréal, Canada.'},
        { property: 'og:locale', content: 'en-CA'}
      ]
    }
  }
}
</script>