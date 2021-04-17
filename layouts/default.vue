<template>
  <div class="full-page">
    <Header />
    <div class="page-contents">
      <Nuxt />
    </div>
    <Footer />
    <Sidebar v-if="$auth.loggedIn" />
    <FlashError />
  </div>
</template>

<script>
import FlashError from '~/components/layout/FlashError'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import Sidebar from '~/components/layout/Sidebar'
export default {
  components: { Footer, Header, FlashError, Sidebar },
}
</script>

<style lang="scss">
html {
  font-size: 16px;
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
  @apply pr-5 pl-5 mb-10 m-auto;
  @apply md:pr-10 md:pl-10;
  @apply lg:pl-24 lg:pr-24;
  @apply xl:pl-36 xl:pr-36;
  @apply 2xl:text-xl;
}

.full-page {
  @apply mt-5 mb-5;
}

.page-contents {
  @apply min-h-page;
}
</style>
