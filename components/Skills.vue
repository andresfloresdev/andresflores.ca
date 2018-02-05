<template>
  <section id="skills" class="skills">
    <div class="skills-container">
      <h2 class="skills-heading">
        My Skills
      </h2>
      <ul class="skills-list">
        <li class="skills-item" v-for="(skill, index) in skills" :key="index">
          <h3 class="skills-item-heading">
            {{ skill.title }}
          </h3>
          <p class="skills-item-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur ipsa aperiam, optio eum nulla eligendi nihil inventore quis.
          </p>
          <span class="skills-item-icon fa-fw" :class="skill.icon"></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        {
          title: 'Semantic HTML Markup',
          text: '',
          icon: 'fab fa-html5'
        },
        {
          title: 'CSS Pre-processors and Methodologies',
          text: '',
          icon: 'fab fa-css3',
        },
        {
          title: 'Javascript Frameworks and Librairies',
          text: '',
          icon: 'fab fa-js'
        },
        {
          title: 'Web and Graphic Design',
          text: '',
          icon: 'fas fa-paint-brush'
        },
        {
          title: 'WordPress with Roots',
          text: '',
          icon: 'fab fa-wordpress'
        },
        {
          title: 'Playing Guitar',
          text: '',
          icon: 'fas fa-music'
        }
      ]
    }
  }
}
</script>