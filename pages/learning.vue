<template>
  <div class="centralize">
    <NuxtChild />
  </div>
</template>
<script>
export default {
  auth: false,
  mounted() {
    localStorage.setItem('learningCenterPath', this.$nuxt.$route.fullPath)
  },
}
</script>
