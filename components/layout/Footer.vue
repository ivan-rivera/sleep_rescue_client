<template>
  <footer class="footer-group">
    <p>SleepRescue.org © {{ year }}</p>
    <div>
      <p class="footer-item">Build with Phoenix + Nuxt</p>
      <img class="footer-item" src="images/phoenix.svg" alt="phoenix" />
      <img class="footer-item" src="images/nuxt-white-small.svg" alt="nuxt" />
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
.footer-group {
  @apply font-normal text-xs;
  @apply flex flex-col justify-center items-center;
}

.footer-item {
  @apply inline-block;
}
</style>
