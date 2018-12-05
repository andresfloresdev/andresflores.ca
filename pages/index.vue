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
  mounted: () => {
    // TODO: Find a more elegant way to use this feature
    const hour = new Date().getHours()

    switch (true) {
      case (hour >= 0 && hour <= 4):
        console.log('Greetings fellow night owl!')
        break
      case (hour >= 5 && hour <= 10):
        console.log('Good morning, have a great day!')
        break
      case (hour >= 11 && hour <= 16):
        console.log('I hope your day\'s going great!')
        break
      case (hour >= 17 && hour <= 23):
        console.log('I hope you had a great day today!')
        break
      default: break
    }
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