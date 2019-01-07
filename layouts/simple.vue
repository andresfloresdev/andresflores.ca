<template>
  <div class="simple-layout">
    <header class="simple-layout-header">
      <navigation class="simple-layout-navigation"></navigation>
    </header>
    <main class="simple-layout-main">
      <nuxt/>
    </main>
    <main-footer class="simple-layout-footer"></main-footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import MainFooter from '@/components/MainFooter'

export default {
  components: {
    Navigation,
    MainFooter
  }
}
</script>