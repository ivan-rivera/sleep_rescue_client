<template>
  <footer class="footer-group">
    <p>SleepRescue.org © {{ year }}</p>
    <div>
      <p class="footer-item">Built with Phoenix + Nuxt</p>
      <img
        class="footer-item"
        src="~/static/images/phoenix.svg"
        alt="phoenix"
      />
      <img
        class="footer-item"
        src="~/static/images/nuxt-white-small.svg"
        alt="nuxt"
      />
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
  @apply font-normal text-xs
  flex flex-col justify-center items-center
  mt-5;
}

.footer-item {
  @apply inline-block;
}
</style>
