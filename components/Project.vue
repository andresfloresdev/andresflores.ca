<template>
  <div class="project" :style="{ backgroundImage: `url(projects/${project.image})`}">
    <div class="project-content">
      <h3 class="project-heading">
        {{ project.name }}
      </h3>
      <ul class="project-tags">
        <li class="project-tag" v-for="(tag, index) in project.tags" :key="index">{{ tag }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>