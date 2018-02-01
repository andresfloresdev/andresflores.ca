<template>
  <div class="default-layout">
    <main-navigation></main-navigation>
    <main class="default-layout-main">
      <nuxt/>
    </main>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainNavigation from '@/components/MainNavigation'
import MainFooter from '@/components/MainFooter'

export default {
  components: {
    MainNavigation,
    MainFooter
  }
}
</script>