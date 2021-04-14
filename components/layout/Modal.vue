<template>
  <div>
    <div
      ref="modal"
      v-click-outside="clickFn"
      tabindex="0"
      :class="['sr-modal', 'card-background', modalWidth]"
      @keydown.esc="clickFn"
    >
      <CloseButton @click.native="clickFn" />
      <slot></slot>
    </div>
    <div v-if="showScreenBlur" class="blur-screen" />
  </div>
</template>

<script>
import CloseButton from '~/components/layout/CloseButton'
export default {
  components: { CloseButton },
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
  mounted() {
    this.$refs.modal.focus()
  },
}
</script>

<style lang="scss">
.sr-modal {
  @apply fixed top-20 left-6 right-6;
  @apply focus:outline-none;
  @apply ml-auto mr-auto;
  @apply text-dark;
  @apply border-2 border-dark;
  @apply shadow-lg;
  @apply rounded-2xl;
  @apply z-30;
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
</style>
