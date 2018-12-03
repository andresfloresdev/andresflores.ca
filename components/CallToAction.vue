<template>
  <a :href="link" class="cta">
    <slot></slot>
  </a>
</template>

<script>

export default {
  props: {
    link: {
      type: String,
      required: true
    }
  }
}

</script>
