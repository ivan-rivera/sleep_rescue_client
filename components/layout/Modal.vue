<template>
  <div>
    <div :class="['sr-modal', 'card-background', modalWidth]">
      <div class="close-cross" @click="clickFn">
        <div class="close-line close-line-forward" />
        <div class="close-line close-line-back" />
      </div>
      <slot></slot>
    </div>
    <div v-if="showScreenBlur" class="blur-screen" />
  </div>
</template>

<script>
export default {
  props: {
    modalWidth: {
      type: String,
      default: '',
      required: false,
    },
    clickFn: {
      type: Function,
      required: true,
    },
  },
  computed: {
    showScreenBlur() {
      return this.$store.state.showScreenBlur
    },
  },
}
</script>

<style lang="scss">
.sr-modal {
  @apply fixed top-20 left-6 right-6;
  @apply ml-auto mr-auto;
  @apply text-dark;
  @apply border-2 border-dark;
  @apply shadow-lg;
  @apply rounded-2xl;
  @apply z-30;
}

.close-cross {
  @apply bg-dark;
  @apply rounded-2xl;
  @apply cursor-pointer;
  @apply relative;
  @apply ml-5 mt-5;
  @apply w-8 h-8;
}

.close-line {
  @apply bg-supplementary;
  @apply absolute w-full h-1;
  @apply transform translate-y-3.5;
  &-back {
    @apply rotate-45;
  }
  &-forward {
    @apply -rotate-45;
  }
}

.blur-screen {
  @apply fixed left-0 top-0;
  @apply z-20;
  @apply w-screen h-screen;
  @apply bg-dark opacity-90;
}
</style>
