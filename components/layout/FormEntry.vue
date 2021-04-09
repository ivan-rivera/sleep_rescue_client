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
