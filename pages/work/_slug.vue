<template>
  <article class="single-project-wrap">
    <figure class="single-project-hero">
      <img src="https://placehold.it/1920x550" alt="DavidsTea case study" class="single-project-hero-image">
    </figure>
    <header class="single-project-header">
      <h1 class="single-project-heading">
        DavidsTea
      </h1>
      <p class="single-project-lead">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero ex ea facilis ullam explicabo aspernatur minus consectetur libero pariatur adipisci. Cupiditate modi sequi doloribus placeat numquam delectus rem eius eligendi!
      </p>
    </header>
    <section class="single-project-sections">
      <section class="single-project-section col-md-6">
        <h2 class="single-project-section-heading">
          Development & integration
        </h2>
        <p class="single-project-section-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minima dolore non repellat quidem fuga aperiam provident quasi eos. Ullam incidunt iste tempore tempora fuga totam placeat itaque voluptates assumenda.
        </p>
      </section>
      <section class="single-project-section col-md-6">
        <h2 class="single-project-section-heading">
          Development & integration
        </h2>
        <p class="single-project-section-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minima dolore non repellat quidem fuga aperiam provident quasi eos. Ullam incidunt iste tempore tempora fuga totam placeat itaque voluptates assumenda.
        </p>
      </section>
      <ul class="single-project-figures">
        <li class="single-project-figure-wrap">
          <figure class="single-project-figure">
            <img src="https://placehold.it/720x720" alt="" class="single-project-figure-image">
          </figure>
        </li>
        <li class="single-project-figure-wrap">
          <figure class="single-project-figure">
            <img src="https://placehold.it/720x720" alt="" class="single-project-figure-image">
          </figure>
        </li>
      </ul>
    </section>
    <footer class="single-project-next">
      <div class="single-project-next-container">
        <h2 class="single-project-next-heading">
          Fizik
        </h2>
        <call-to-action link="#" class="single-project-next-cta">
          Explore the next project
        </call-to-action>
      </div>
    </footer>
  </article>
</template>

<script>
import CallToAction from '@/components/CallToAction'

export default {
  layout: 'simple',
  components: {
    CallToAction
  },
  validate ({ params }) {
    return true
  }
}
</script>

<style>

</style>
