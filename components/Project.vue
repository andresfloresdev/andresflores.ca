<template>
  <component :is="tag" class="project" :style="{ backgroundImage: `url(projects/${project.image})`}">
    <div class="project-content">
      <h3 class="project-heading">
        {{ project.name }}
      </h3>
      <ul class="project-tags">
        <li class="project-tag" v-for="(tag, index) in project.tags" :key="index">{{ tag }}</li>
      </ul>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      required: true,
      default: 'div'
    }
  }
}
</script>