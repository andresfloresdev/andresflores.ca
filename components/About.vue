<template>
  <section id="about" class="about">
    <div class="about-info">
      <h2 class="about-heading">
        About Me
      </h2>
      <p class="about-text">
        I've been a web developer for the past three years. I knew I wanted to make a career out of this when I started to feel comfortable coding static pages. I kept learning on my own and took some courses online and at the University of Montreal. I've worked on a wide variety of websites from simple, one-page WordPress sites to progressive web applications using the latest technologies and methodologies. I'm always on the lookout for something new to learn and to use for my next project!
      </p>
      <p class="about-text">
        Make sure to take a look at some of <a href="#work" class="about-text-link" @click.prevent="navigateTo('work'); ga('About', 'internal-link', 'My Work')">my work</a> and <a href="#skills" class="about-text-link" @click.prevent="navigateTo('skills'); ga('About', 'internal-link', 'My Skills')">my skillset</a> down below!
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