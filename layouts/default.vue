<template>
  <div class="flex flex-row items-center">
    <div class="w-10" />
    <div
      class="full-page relative flex-grow"
      :class="{ 'ml-12 pr-5': confirmedUser }"
    >
      <Header />
      <div class="page-contents">
        <Nuxt />
      </div>
      <Footer />
      <FlashError />
    </div>
    <div class="w-10" />
    <Sidebar v-if="confirmedUser" />
  </div>
</template>

<script>
// TODO: look into route transitions
import FlashError from '~/components/layout/FlashError'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import Sidebar from '~/components/layout/Sidebar'
export default {
  components: { Footer, Header, FlashError, Sidebar },
  computed: {
    confirmedUser() {
      return this.$auth.loggedIn && !this.$route.name.includes('confirm')
    },
  },
}
</script>

<style lang="scss">
html {
  font-size: 16px;
  min-width: 360px;
  max-width: 1800px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  @apply bg-dark text-white font-oxygen;
  @apply w-screen h-screen;
  @apply flex flex-col;
  @apply 2xl:text-xl;
}

.full-page {
  @apply mt-5 mb-5;
  @apply md:pr-10 md:pl-10;
  @apply lg:pl-24 lg:pr-24;
  @apply xl:pl-36 xl:pr-36;
}

.page-contents {
  @apply min-h-page;
}
</style>
