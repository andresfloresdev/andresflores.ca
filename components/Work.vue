<template>
  <section id="work" class="work">
    <div class="work-container">
      <h2 class="work-heading">
        My Work
      </h2>
      <transition-group name="fade" tag="div" class="work-content">
        <article class="work-single" v-for="(single, index) in work" :key="index" v-show="index + 1 === current">
          <div class="work-single-content">
            <h3 class="work-single-heading">
              <a :href="single.link" class="work-single-heading-link" @click="ga('Work', 'Heading', single.title)">
                {{ single.title }}
              </a>
            </h3>
            <p class="work-single-text" v-html="single.text"></p>
          </div>
          <figure class="work-single-figure">
            <img
              :srcset="`projects/${single.imageURL}@2x.jpg 2x`" 
              :src="`projects/${single.imageURL}.jpg`" :alt="single.title" class="work-single-image">
          </figure>
        </article>
      </transition-group>
      <div class="work-count">
        <span class="work-count-current">0{{ current }}</span>/<span class="work-count-total">0{{ count }}</span>
      </div>
      <ul class="work-actions">
        <li class="work-action-prev">
          <button class="work-action-prev-button" :class="isMin" @click="showPrevious(); ga('Work', 'Actions', 'Previous')" title="Previous">
            <span class="work-action-icon fas fa-arrow-left"></span>
          </button>
        </li>
        <li class="work-action-next">
          <button class="work-action-next-button" :class="isMax" @click="showNext(); ga('Work', 'Actions', 'Next')" title="Next">
            <span class="work-action-icon fas fa-arrow-right"></span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { GoogleAnalytics } from '@/mixins/google-analytics'

export default {
  mixins: [GoogleAnalytics],
  data() {
    return {
      current: 1,
      work: [
        {
          title: 'David\'s Tea',
          link: 'https://www.davidstea.com/',
          text: 'As a Junior Web Developer for <a href="https://2associes.com">2 Associés</a>, I integrated the markup and styles of a couple of pages of the client\'s new website. I received multiple Photoshop and Illustrator files and had to translate the mobile, tablet and desktop views into semantic, reusable code. It was an interesting experience to work with Commerce Cloud.',
          imageURL: 'davids-tea'
        },
        {
          title: 'Parler SST',
          link: 'https://parlersst.com/',
          text: 'As a Junior Web Developer for <a href="https://2associes.com">2 Associés</a>, I integrated the markup, styles and Javascript functionality of this page. Browser compatibility was a top priority, so it allowed me to hone my skills with the basics that I learned in college/university. I usually don\'t go as far back as IE10-compatible code with any of my projects, but it was a fun, learning experience.',
          imageURL: 'parler-sst'
        },
        {
          title: 'DuProprio',
          link: 'https://duproprio.com/en',
          text: 'As a Junior Web Developer for <a href="https://2associes.com">2 Associés</a>, I integrated banner ads with Google Web Designer while learning the software. I was able to manually extract assets from Photoshop files, optimize, integrate and animate them according to the client\'s frame guidelines. I had a lot of fun working with the software and finding new ways to improve the workflow.',
          imageURL: 'duproprio'
        },
        {
          title: 'Laura Canada',
          link: 'https://www.laura.ca/',
          text: 'As a Junior Web Developer for <a href="https://2associes.com">2 Associés</a>, I integrated a few landing pages for Laura Canada\'s season clothing collections. The designs I had to integrate were a challenge for me because of how abstract and unique they were. I\'m glad I was able to get the hang of it and learn new CSS techniques really quickly.',
          imageURL: 'laura-canada'
        },
        {
          title: 'YuCentrik',
          link: 'https://yucentrik.ca/en/',
          text: 'As a Junior Web Developer for <a href="https://2associes.com">2 Associés</a>, I refactored a lot of the site\'s components. I also helped optimize the entire site to increase its performance score.',
          imageURL: 'yucentrik'
        },
        {
          title: '2 Associés',
          link: 'https://2associes.com/',
          text: 'I\'ve worked with the web agency <a href="https://2associes.com">2 Associés</a> since 2016. During that time, I\'ve had the pleasure to work on their new website using the latest technologies and methodologies.',
          imageURL: '2associes'
        }
      ]
    }
  },
  computed: {
    count: function () {
      return this.work.length
    },
    isMax: function () {
      return this.work.length === this.current ? 'is-disabled' : ''
    },
    isMin: function () {
      return this.current === 1 ? 'is-disabled' : ''
    }
  },
  methods: {
    showNext: function () {
      if (this.current < this.count) this.current++
    },
    showPrevious: function () {
      if (this.current > 1) this.current--
    }
  }
}
</script>