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
  @apply bg-dark
  rounded-l-3xl
  p-2.5
  text-white;
}
</style>
