<template>
  <div class="main-nav-wrap">
    <div class="main-nav-container">
      <img src="~assets/images/andres-flores-logo.png" alt="Andres Flores, Front-end Web Developer" class="main-nav-logo" title="Andres Flores, Front-end Web Developer">
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
        </ul>
      </nav>
    </div>
  </div>
</template>