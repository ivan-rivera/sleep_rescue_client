<template>
  <div class="form-entry-group">
    <div class="form-icon">
      <font-awesome-icon :icon="['fa', icon]" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      required: true,
      type: String,
    },
  },
}
</script>

<style scoped>
.form-entry-group {
  @apply flex flex-row items-center;
}

.form-icon {
  @apply bg-dark;
  @apply rounded-l-3xl;
  @apply p-2.5;
  @apply text-white;
}
</style>
