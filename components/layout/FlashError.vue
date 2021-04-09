<template>
  <transition name="error" appear>
    <div v-if="error" class="error-alert">
      <p>{{ error }}</p>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  transition: {
    name: 'error',
    mode: 'out-in',
  },
  computed: mapState(['error']),
}
</script>

<style>
.error-enter-active,
.error-leave-active {
  transition: opacity 0.5s;
}
.error-enter,
.error-leave-active {
  opacity: 0;
}

.error-alert {
  @apply fixed top-12 left-0 right-0 ml-auto mr-auto;
  @apply p-5;
  @apply bg-secondary;
  @apply max-w-2xl;
  @apply text-center text-dark font-bold;
  @apply rounded-2xl;
  @apply z-50;
}
</style>
