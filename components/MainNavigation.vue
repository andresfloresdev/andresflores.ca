<template>
  <div class="main-nav-wrap">
    <div class="main-nav-container">
      <brand class="main-nav-logo"></brand>
      <nav class="main-nav">
        <ul class="main-nav-items">
          <li class="main-nav-item">
            <a href="#home" v-scroll-to="'#home'" class="main-nav-link">
              Home
            </a>
          </li>
          <li class="main-nav-item">
            <a href="#about" v-scroll-to="'#about'" class="main-nav-link">
              About
            </a>
          </li>
          <li class="main-nav-item">
            <a href="#work" v-scroll-to="'#work'" class="main-nav-link">
              Work
            </a>
          </li>
          <li class="main-nav-item">
            <a href="#skills" v-scroll-to="'#skills'" class="main-nav-link">
              Skills
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Brand from '@/components/Brand'

export default {
  components: {
    Brand
  }
}
</script>