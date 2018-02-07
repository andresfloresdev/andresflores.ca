<template>
  <div class="main-nav-wrap">
    <div class="main-nav-container">
      <brand class="main-nav-logo"></brand>
      <navigation class-prefix="main"></navigation>
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