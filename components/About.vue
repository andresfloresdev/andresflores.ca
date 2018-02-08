<template>
  <section id="about" class="about">
    <div class="about-info">
      <h2 class="about-heading">
        About Me
      </h2>
      <p class="about-text">
        My name is Andrés and I’m very passionate about Web development. I’ve been working on projects using various technologies and frameworks for a few years. Ever since I grasped the basics of HTML, CSS and Javascript, I realized how much I love designing and building websites. From then on I've been learning alot about web application development while constantly improving my workflow using task runners, pre-processors and other tools.
      </p>
      <p class="about-text">
        Make sure to take a look at some of <a href="#work" class="about-text-link" @click.prevent="navigateTo('work'); ga('About', 'CTA', 'My Work')">my work</a> and <a href="#skills" class="about-text-link" @click.prevent="navigateTo('skills'); ga('About', 'CTA', 'My Skills')">my skillset</a> down below!
      </p>
    </div>
    <div class="about-portrait">
      <picture class="about-portrait-picture">
        <source media="(min-width: 1200px)" srcset="~assets/images/andres-portrait-500x750.jpg">
        <img src="~assets/images/andres-profile.jpg" alt="Andres Flores, Front-end developer" class="about-portrait-image">
      </picture>
      <socials class-prefix="about-portrait"></socials>
    </div>
  </section>
</template>

<script>
import Socials from '@/components/Socials'
import { InternalLinks } from '@/mixins/internal-links'
import { GoogleAnalytics } from '@/mixins/google-analytics'

export default {
  components: {
    Socials
  },
  mixins: [
    InternalLinks,
    GoogleAnalytics
  ]
}
</script>