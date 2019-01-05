<template>
  <nav class="navigation">
    <ul class="navigation-list">
      <li class="navigation-item">
        <nuxt-link to="/" class="navigation-brand-link">
          <brand class="navigation-brand"></brand>
        </nuxt-link>
      </li>
      <li class="navigation-item">
        <ul class="navigation-langs">
          <li class="navigation-lang">
            <lang-switcher class="navigation-lang-link"></lang-switcher>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import Brand from '@/components/Brand'
import LangSwitcher from '@/components/LangSwitcher'

export default {
  components: {
    Brand,
    LangSwitcher
  }
}
</script>

