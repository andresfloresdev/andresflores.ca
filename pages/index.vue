<template>
  <div class="home-layout">
    <!-- <hero></hero> -->
    <about></about>
    <!-- <clients></clients> -->
    <!-- <work></work> -->
    <!-- <skills></skills> -->
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import About from '@/components/About'
import Clients from '@/components/Clients'
import Work from '@/components/Work'
import Skills from '@/components/Skills'

export default {
  components: {
    Hero,
    About,
    Clients,
    Work,
    Skills
  },
  head () {
    return {
      title: 'Andrés Flores, Freelance Web Developer',
      meta: [
        // Twitter Card
        { name:'twitter:card', content:'summary'},
        { name:'twitter:creator', content:'@andresfloresdev'},
        { name:'twitter:url', content:'https://andresflores.ca/'},
        { name:'twitter:title', content:'Andrés Flores, Freelance Web Developer'},
        { name:'twitter:description', content:'Freelance Web Developer based in Montréal, Canada.'},
        { name:'twitter:image', content:'https://andresflores.ca/images/dark-bg-1200x.png'},
        // Facebook Open Graph
        { property: 'og:url', content: 'https://andresflores.ca/'},
        { property: 'og:type', content: 'website'},
        { property: 'og:title', content: 'Andrés Flores, Freelance Web Developer'},
        { property: 'og:image', content: 'https://andresflores.ca/images/dark-bg-1200x.png'},
        { property: 'og:description', content: 'Freelance Web Developer based in Montréal, Canada.'},
        { property: 'og:locale', content: 'en-CA'}
      ]
    }
  }
}
</script>