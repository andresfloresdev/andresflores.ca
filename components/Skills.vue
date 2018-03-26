<template>
  <section id="skills" class="skills">
    <div class="skills-container">
      <h2 class="skills-heading">
        My Skills
      </h2>
      <ul class="skills-list">
        <li class="skills-item" v-for="skill in skills" :key="skill.title">
          <h3 class="skills-item-heading">
            {{ skill.title }}
          </h3>
          <p class="skills-item-text" v-html="skill.text"></p>
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
          text: 'I like to choose the right tag for the job. If I\'m able to make a website look great without any CSS, I know my HTML is on point.',
          icon: 'fab fa-html5'
        },
        {
          title: 'CSS Pre-processors and Methodologies',
          text: 'Using <a href="https://sass-lang.com/">SASS</a> with a methodology like BEM or SMACSS is amazing. Everything\' cleaner and it makes it easier to work with other developers.',
          icon: 'fab fa-css3',
        },
        {
          title: 'Javascript Frameworks and Librairies',
          text: '<a href="https://angularjs.org/">Angular 1</a> introduced me to the JS framework world. Since then, I\'ve worked with many different frameworks and libraries but I\'ve focused more on <a href="https://vuejs.org/">Vue</a> and <a href=https://meteor.com/">Meteor</a>.',
          icon: 'fab fa-js'
        },
        {
          title: 'Web and Graphic Design',
          text: 'This was my career choice before becoming a developer. I work on some personal projects from time to time with the latest Adobe software.',
          icon: 'fas fa-paint-brush'
        },
        {
          title: 'WordPress with Roots',
          text: 'The development process with <a href="https://roots.io/">Roots</a> is amazing. It makes working with WordPress fun while adding modern development tools.',
          icon: 'fab fa-wordpress'
        },
        {
          title: 'Git and GitFlow',
          text: 'I use GitFlow for all of my projects. I follow a Trello board and associating a feature branch to a task card. It\'s a workflow shown to me by <a href="https://2associes.com/">2 Associés</a>.',
          icon: 'fas fa-code-branch'
        }
      ]
    }
  }
}
</script>