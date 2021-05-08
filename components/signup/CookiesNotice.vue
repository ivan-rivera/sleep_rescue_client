<template>
  <transition name="reveal" appear>
    <div v-if="reveal" class="cookies">
      <p class="cookie-text">
        We use cookies to optimize your browsing experience
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

<style lang="scss" scoped>
.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.5s;
}
.reveal-enter,
.reveal-leave-active {
  opacity: 0;
}

.cookies {
  @apply fixed
  z-50
  flex flex-row justify-between items-center
  bg-secondary
  border-2 border-dark
  p-2
  bottom-0 left-0 right-0
  w-screen;
  @screen md {
    @apply bottom-5 left-5 right-5 ml-auto mr-auto
    max-w-xl
    rounded-2xl;
  }
}

.cookie-text {
  @apply text-base text-dark text-center mr-5;
}

.acknowledge {
  @apply pt-2.5 pb-2.5 pl-5 pr-5
  bg-dark
  text-white text-lg font-bold
  rounded-xl
  cursor-pointer;
}
</style>
