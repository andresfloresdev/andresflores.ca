<template>
  <div class="main-nav-wrap">
    <div class="main-nav-container">
      <brand class="main-nav-logo"></brand>
      <navigation
        nav-class="main-nav"
        list-class="main-nav-items"
        item-class="main-nav-item"
        link-class="main-nav-link"></navigation>
    </div>
  </div>
</template>

<script>
import Brand from '@/components/Brand'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Brand,
    Navigation
  }
}
</script>