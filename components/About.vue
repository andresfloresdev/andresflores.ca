<template>
  <section class="about" id="about">
    <div class="about-info">
      <h2 class="about-heading">
        About Me
      </h2>
      <p class="about-text">
        My name is Andrés and I’m very passionate about Web development. I’ve been working on projects using various technologies and frameworks for a few years. Ever since I grasped the basics of HTML, CSS and Javascript, I realized how much I love designing and building websites. From then on I've been learning alot about web application development while constantly improving my workflow using task runners, pre-processors and other tools.
      </p>
      <ul class="about-actions">
        <li class="about-action">
          <a href="#work" v-scroll-to="'#work'" class="about-action-link">
            My Work
          </a>
        </li>
        <li class="about-action">
          <a href="#contact" v-scroll-to="'#contact'" class="about-action-link">
            Contact Me
          </a>
        </li>
      </ul>
    </div>
    <div class="about-portrait">
      <picture class="about-portrait-picture">
        <source media="(min-width: 1200px)" srcset="~assets/images/andres-portrait-500x750.jpg">
        <img src="~assets/images/andres-profile.jpg" alt="Andres Flores, Front-end developer" class="about-portrait-image">
      </picture>
      <ul class="about-portrait-socials">
        <li class="about-portrait-social">
          <a href="https://twitter.com/andresfloresdev" class="about-portrait-social-link" title="Twitter">
            <i class="fab fa-fw fa-twitter"></i>
          </a>
        </li>
        <li class="about-portrait-social">
          <a href="https://www.instagram.com/andresflores.dev/" class="about-portrait-social-link" title="Instagram">
            <i class="fab fa-fw fa-instagram"></i>
          </a>
        </li>
        <li class="about-portrait-social">
          <a href="https://www.linkedin.com/in/andr%C3%A9s-flores-64538ba2/" class="about-portrait-social-link" title="LinkedIn">
            <i class="fab fa-fw fa-linkedin-in"></i>
          </a>
        </li>
        <li class="about-portrait-social">
          <a href="https://github.com/PerfectNull/andresflores.ca/" class="about-portrait-social-link" title="Github">
            <i class="fab fa-fw fa-github"></i>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>