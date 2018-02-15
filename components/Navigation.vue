<template>
  <nav :class="`${classPrefix}-navigation-wrap`">
    <ul :class="`${classPrefix}-navigation-items`">
      <li :class="`${classPrefix}-navigation-item`" v-for="item in items" :key="item">
        <a :href="item | slugify | formatToID" :class="`${classPrefix}-navigation-link`" @click.prevent="navigateTo(item); ga(classPrefix, 'internal-link', item)">
          {{ item }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { InternalLinks } from '@/mixins/internal-links'
import { GoogleAnalytics } from '@/mixins/google-analytics'

export default {
  props: {
    classPrefix: {
      type: String,
      default: 'base'
    }
  },
  mixins: [
    InternalLinks,
    GoogleAnalytics
  ],
  data() {
    return {
      items: [
        'Home',
        'About',
        'Work',
        'Skills'
      ]
    }
  }
}
</script>