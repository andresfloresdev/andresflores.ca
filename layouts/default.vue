<template>
  <div class="default-layout">
    <main-header></main-header>
    <main class="default-layout-main">
      <nuxt/>
    </main>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

export default {
  components: {
    MainHeader,
    MainFooter
  }
}
</script>