<template>
  <div tabindex="0" @keydown.esc="clickFn">
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
  @apply ml-auto mr-5 mt-5;
  @apply w-7 h-7;
  @apply flex align-middle justify-center;
}

.close-line {
  @apply bg-supplementary;
  @apply absolute;
  @apply w-4/5 h-1;
  @apply -top-0.5;
  @apply transform translate-y-3.5;
  @apply rounded-lg;
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

.modal-content {
  @apply flex flex-col;
}

.title-text {
  @apply pb-5;
  @apply text-center;
  @apply text-dark;
  @apply font-bold text-3xl;
}
</style>
