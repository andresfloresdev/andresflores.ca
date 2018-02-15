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
              <a :href="single.link" class="work-single-heading-link" @click="ga('Work', 'link', single.title)">
                {{ single.title }}
              </a>
            </h3>
            <p class="work-single-text">
              {{ single.text }}
            </p>
          </div>
          <figure class="work-single-figure">
            <img
              :srcset="`projects/${single.imageURL}@2x.jpg 2x`" 
              :src="`projects/${single.imageURL}.jpg`" :alt="single.title" class="work-single-image">
          </figure>
        </article>
      </transition-group>
      <div class="work-count">
        <span class="work-count-current">{{ doubleDigits(current) }}</span>/<span class="work-count-total">{{ doubleDigits(count) }}</span>
      </div>
      <ul class="work-actions">
        <li class="work-action-prev">
          <button class="work-action-prev-button" :class="isMin" @click="showPrevious(); ga('Work', 'toggle', 'Previous')" title="Previous">
            <span class="work-action-icon fas fa-arrow-left"></span>
          </button>
        </li>
        <li class="work-action-next">
          <button class="work-action-next-button" :class="isMax" @click="showNext(); ga('Work', 'toggle', 'Next')" title="Next">
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
          text: 'I integrated the markup and styles of a couple of pages of the client\'s new website. I received multiple Photoshop and Illustrator files and had to translate the mobile, tablet and desktop views into semantic, reusable code. I had fun working with these kinds of assets and it was an interesting experience to work with Commerce Cloud.',
          imageURL: 'davids-tea'
        },
        {
          title: 'Parler SST',
          link: 'https://parlersst.com/',
          text: 'I integrated the markup, styles and Javascript functionality of this page. Browser compatibility was a top priority, so it allowed me to hone my skills with the basics that I learned in college/university. I usually don\'t go as far back as IE10-compatible code with any of my projects, but it was a fun, learning experience.',
          imageURL: 'parler-sst'
        },
        {
          title: 'EQ Care',
          link: 'https://eqcare.com/',
          text: 'I had the pleasure to work on the Meteor application they use to manage patients, physicians and other fun stuff. My tasks were mainly based on frontend markup and functionality. While working on this project, I learned a lot about data structure and the implications of managing a progressive web application. It was very interesting.',
          imageURL: 'eqcare'
        },
        {
          title: 'DuProprio',
          link: 'https://duproprio.com/',
          text: 'I integrated banner ads with Google Web Designer while learning the software. I was able to manually extract assets from Photoshop files, optimize, integrate and animate them according to the client\'s frame guidelines. I had a lot of fun working with the software and finding new ways to improve the workflow.',
          imageURL: 'duproprio'
        },
        {
          title: 'Laura Canada',
          link: 'https://www.laura.ca/',
          text: 'I integrated a few landing pages for Laura Canada\'s season clothing collections. The designs I had to integrate were fun and exciting because of how abstract and unique they were. I\'m glad I was able to flex my coding muscles and learn new CSS techniques really quickly. It was also my first experience working with Commerce Cloud.',
          imageURL: 'laura-canada'
        },
        {
          title: 'YuCentrik',
          link: 'https://yucentrik.ca/',
          text: 'I refactored a lot of the site\'s components. I also helped optimize the entire site to increase its performance score. It was the first time I was mandated to focus on the performance of the site and refactoring other people\'s code. It was interesting to see the different approaches one can think of to accomplish particular tasks.',
          imageURL: 'yucentrik'
        },
        {
          title: '2 Associés',
          link: 'https://2associes.com/',
          text: 'I\'ve worked with the web agency 2 Associés since 2016. During that time, I\'ve had the pleasure to work on their new website and their client\'s projects using the latest technologies and methodologies. I\'m still learning a lot from them and doing my best to help in any way I can.',
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
    doubleDigits: (number) => (`0${number}`).slice(-2),
    showNext: function () {
      if (this.current < this.count) this.current++
    },
    showPrevious: function () {
      if (this.current > 1) this.current--
    }
  }
}
</script>