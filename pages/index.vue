<template>
  <div class="home-layout">
    <hero></hero>
    <about></about>
    <clients></clients>
    <work></work>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import About from '@/components/About'
import Clients from '@/components/Clients'
import Work from '@/components/Work'

export default {
  components: {
    Hero,
    About,
    Clients,
    Work
  }
}
</script>