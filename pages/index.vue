<template>
  <div class="home-layout">
    <about></about>
    <projects></projects>
    <!-- TODO: Integrate mailchimp form style-->
    <!-- <mailchimp-subscribe url="https://andresflores.us19.list-manage.com/subscribe/post?u=ea080f01339525dc0f57cfdac&amp;id=7f4e27f502"></mailchimp-subscribe> -->
  </div>
</template>

<script>
import About from '@/components/About'
import Projects from '@/components/Projects'
import MailchimpSubscribe from '@/components/MailchimpSubscribe'

export default {
  components: {
    About,
    Projects,
    MailchimpSubscribe
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