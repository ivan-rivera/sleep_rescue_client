<template>
  <div>
    <div
      ref="modal"
      v-click-outside="toggleFn"
      tabindex="0"
      :class="['sr-modal']"
      @keydown.esc="toggleFn"
    >
      <CloseButton @click.native="toggleFn" />
      <slot></slot>
    </div>
    <div class="blur-screen" />
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
  },
  mounted() {
    this.$refs.modal.focus()
  },
  methods: {
    toggleFn() {
      this.$emit('toggleModal')
    },
  },
}
</script>

<style lang="scss">
.sr-modal {
  @apply fixed top-20 left-6 right-6 overflow-y-scroll overflow-x-hidden
  focus:outline-none
  ml-auto mr-auto pt-10 pb-5
  text-dark
  border-2 border-white
  bg-dark
  shadow-lg
  rounded-2xl
  z-30;
  max-width: 25rem;
}

.blur-screen {
  @apply fixed left-0 top-0
  z-20
  w-screen h-screen
  bg-dark opacity-90;
}

.modal-content {
  @apply flex flex-col;
}
</style>
