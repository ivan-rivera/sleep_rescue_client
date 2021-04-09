<template>
  <transition name="reveal" appear>
    <div v-if="reveal" class="cookies">
      <p class="cookie-text">
        Heads up! we use cookies to optimize your browsing experience. Basically
        we just want to keep you logged in next time you visit us
      </p>
      <div class="acknowledge" @click="acceptCookies">OK</div>
    </div>
  </transition>
</template>

<script>
export default {
  transition: {
    name: 'reveal',
    mode: 'out-in',
  },
  data() {
    return {
      reveal: false,
    }
  },
  mounted() {
    this.conditionalReveal()
  },
  methods: {
    acceptCookies() {
      localStorage.setItem('cookiesAccepted', 'true')
      this.reveal = false
    },
    conditionalReveal() {
      const cookiesAcceptedStr = localStorage.getItem('cookiesAccepted')
      const cookiesAccepted = JSON.parse(cookiesAcceptedStr) || false
      if (!cookiesAccepted) {
        this.revealWithDelay()
      }
    },
    revealWithDelay() {
      const delay = 3000 // delay in MS
      setTimeout(() => {
        this.reveal = true
      }, delay)
    },
  },
}
</script>

<style scoped>
.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.5s;
}
.reveal-enter,
.reveal-leave-active {
  opacity: 0;
}

.cookies {
  @apply fixed bottom-5 left-0 right-0 ml-auto mr-auto;
  @apply z-50;
  @apply max-w-2xl;
  @apply flex flex-col justify-between items-center;
  @apply bg-white;
  @apply border-2 border-dark;
  @apply rounded-2xl;
  @apply p-5;
}

.cookie-text {
  @apply text-base text-dark text-center;
  @apply mb-5;
}

.acknowledge {
  @apply pt-2.5 pb-2.5 pl-5 pr-5;
  @apply bg-dark;
  @apply text-white text-lg font-bold;
  @apply rounded-xl;
  @apply cursor-pointer;
}
</style>
