<template>
  <div class="flex flex-row items-center">
    <div class="w-10" />
    <div
      class="full-page relative flex-grow"
      :class="{ 'ml-11 mr-5': confirmedUser }"
    >
      <Header />
      <div class="page-contents">
        <Nuxt />
      </div>
      <Footer />
      <FlashError />
    </div>
    <div class="w-10" />
    <Sidebar v-if="confirmedUser" class="z-10" />
  </div>
</template>

<script>
import FlashError from '~/components/layout/FlashError'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import Sidebar from '~/components/layout/Sidebar'
export default {
  components: { Footer, Header, FlashError, Sidebar },
  head: {
    script: [
      {
        hid: 'gtm-script1',
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_UA_ID}`,
        async: true,
        defer: true,
      },
      {
        hid: 'gtm-script2',
        innerHTML: `
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', '${process.env.GA_UA_ID}')
        `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },
  computed: {
    confirmedUser() {
      return this.$auth.loggedIn && this.$store.state.confirmedUser
    },
  },
}
</script>

<style lang="scss">
html {
  font-size: 16px;
  min-width: 360px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  @apply bg-dark text-white font-oxygen
  w-screen h-screen
  flex flex-col
  2xl:text-xl;
}

.full-page {
  @apply mt-5 mb-5
  md:pr-10 md:pl-10
  lg:pl-24 lg:pr-24
  xl:pl-36 xl:pr-36;
}

.page-contents {
  @apply min-h-page min-w-page;
}
</style>
