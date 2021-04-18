<template>
  <font-awesome-icon :icon="['fa', 'times']" class="close-btn" />
</template>

<style scoped>
.close-btn {
  @apply absolute right-1 top-1
  p-1 h-8 w-8
  rounded-full
  text-center
  bg-dark text-white
  cursor-pointer;
}
</style>
