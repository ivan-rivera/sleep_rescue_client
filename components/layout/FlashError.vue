<template>
  <transition name="error" appear>
    <div v-if="error" class="error-alert">
      <div>
        <div class="icon-holder">
          <font-awesome-icon
            :icon="['fa', 'exclamation-circle']"
            class="error-icon"
          />
        </div>
        <div class="ml-24">
          <div>
            <h2 class="message-header">That didn't work...</h2>
            <CloseButton @click.native="close" />
          </div>
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '~/components/layout/CloseButton'
export default {
  components: { CloseButton },
  transition: {
    name: 'error',
    mode: 'out-in',
  },
  computed: mapState(['error']),
  methods: {
    close() {
      this.$store.commit('setError', null)
    },
  },
}
</script>

<style lang="scss">
.error-enter-active,
.error-leave-active {
  transition: opacity 0.5s;
}
.error-enter,
.error-leave-active {
  opacity: 0;
}

.error-alert {
  @apply relative
  fixed top-12 left-0 right-0 ml-auto mr-auto
  p-1 pb-5 pt-5
  bg-secondary
  max-w-lg
  text-center text-dark font-bold
  rounded-2xl
  border-2 border-dark
  z-50;
}

.icon-holder {
  @apply absolute top-0 left-0 h-full w-24
  rounded-bl-xl rounded-tl-xl
  border-r-2 border-dark;
}

.error-icon {
  @apply text-dark text-center text-6xl
  h-full;
}
</style>
