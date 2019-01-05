<template>
  <component :is="tag" class="project" :style="{ backgroundImage: `url(${imagePath})`}">
    <div class="project-content">
      <h3 class="project-heading">
        <a :href="project.link" class="project-link">
          {{ project.name }}
        </a>
      </h3>
      <ul class="project-tags">
        <li class="project-tag" v-for="(tag, index) in project.tags" :key="index + 1">{{ tag }}</li>
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
  },
  mounted: function () {
    if (this.project.image) this.swapImage(this.project.image)
  },
  data() {
    return {
      imagePath: `projects/blurred-${this.project.image}`
    }
  },
  methods: {
    loadImage: function (url) {
      return new Promise((resolve, reject) => {
        let img = new Image()

        img.addEventListener('load', e => resolve(img))
        img.addEventListener('error', () => {
          reject(new Error(`Failed to load image's URL: ${url}`))
        })
        img.src = url
      })
    },
    swapImage: function (img) {
      if (img) {
        this.loadImage(`/projects/${img}`)
          .then(img => this.imagePath = img.src)
          .catch(error => console.log(error))
      }
    }
  }
}
</script>