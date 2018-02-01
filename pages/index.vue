<template>
  <div class="home-layout">
    <hero></hero>
    <about></about>
    <clients></clients>
    <work></work>
    <contact></contact>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import About from '@/components/About'
import Clients from '@/components/Clients'
import Work from '@/components/Work'
import Contact from '@/components/Contact'

export default {
  components: {
    Hero,
    About,
    Clients,
    Work,
    Contact
  }
}
</script>