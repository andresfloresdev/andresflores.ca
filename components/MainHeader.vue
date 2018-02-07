<template>
  <div class="main-header-wrap">
    <div class="main-header-container">
      <brand class="main-header-logo"></brand>
      <navigation class-prefix="main-header"></navigation>
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