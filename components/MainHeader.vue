<template>
  <header class="main-header">
    <div class="main-header-container">
      <brand class="main-header-brand"></brand>
      <h1 class="main-header-heading">
        Andres Flores&nbsp;
        <span class="main-header-subheading">Web consultant &amp; developer</span>
      </h1>
      <p class="main-header-text">
        I strive to propel the harmony between design and technology forward with creative solutions.
      </p>
      <ul class="main-header-actions">
        <li class="main-header-action">
          <call-to-action link="mailto:info@andresflores.ca" class="main-header-cta">
            Get in touch
          </call-to-action>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import Brand from '@/components/Brand'
import CallToAction from '@/components/CallToAction'

export default {
  components: {
    Brand,
    CallToAction
  }
}
</script>