<template>
  <header id="home" class="hero">
    <div class="hero-container">
      <h1 class="hero-heading">
        <span class="hero-heading-greeting">Hello!</span> I'm Andrés Flores, a web developer based in Montréal, Canada.
      </h1>
      <p class="hero-text">
        You can <a href="mailto:info@andresflores.ca" class="hero-text-link">contact me</a>, or <a href="#about" class="hero-text-link" @click.prevent="navigateTo('about')">learn more about me</a> first.
      </p>
    </div>
  </header>
</template>

<script>
import { InternalLinks } from '@/mixins/internal-links'

export default {
  mixins: [InternalLinks]
}
</script>