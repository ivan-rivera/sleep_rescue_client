<template>
  <div class="full-page">
    <Header />
    <div class="page-contents">
      <Nuxt />
    </div>
    <Footer />
    <FlashError />
  </div>
</template>

<script>
import FlashError from '~/components/layout/FlashError'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
export default {
  components: { Footer, Header, FlashError },
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
  @apply pr-5 pl-5 mb-10 md:pr-10 md:pl-10 lg:pl-24 lg:pr-24 xl:pl-36 xl:pr-36 m-auto;
  @apply 2xl:text-xl;
}

.full-page {
  @apply mt-5 mb-5;
}

.page-contents {
  @apply min-h-page;
}

.card-background {
  @apply bg-gradient-to-br from-supplementary to-primary;
}

.heading-top {
  @apply font-bold text-4xl;
  @apply mt-5 mb-2.5;
  @screen md {
    @apply text-5xl;
  }
  @screen xl {
    @apply text-6xl;
  }
}

.heading-sub {
  @apply text-lg text-supplementary;
  @apply mb-5;
  @screen md {
    @apply text-2xl;
  }
}

.form-entry {
  @apply flex flex-col;
  @apply pb-2;
}

.form-entry-group {
  @apply flex flex-row items-center;
  @apply mb-2.5;
  @apply w-full;
}

.form-icon {
  @apply bg-dark;
  @apply rounded-l-3xl;
  @apply ml-10 p-2.5;
  @apply text-white;
}

.form-input {
  @apply flex-grow rounded-r-3xl border-2;
  @apply pl-2.5 pt-2 pb-2 mr-10;
  @apply focus:outline-none;
}

@mixin sr-btn {
  @apply rounded-3xl;
  @apply shadow-lg;
  @apply text-lg;
  @apply cursor-pointer;
}

.action-btn {
  @include sr-btn;
  @apply bg-dark;
  @apply text-white;
  @apply mt-2.5 mb-5 pt-3 pb-2 ml-10 mr-10;
  @apply transition duration-150 ease-in;
  @apply hover:text-dark hover:bg-secondary;
}

.danger-btn {
  @include sr-btn;
  @apply bg-secondary;
  @apply text-dark;
  @apply pt-2.5 pb-2.5;
}
</style>
