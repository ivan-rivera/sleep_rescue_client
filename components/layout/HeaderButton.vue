<template>
  <div class="header-btn">
    <div class="header-line long-line inline"></div>
    <div class="header-line short-line inline"></div>
    <div class="header-line long-line inline"></div>
  </div>
</template>

<style scoped>
.long-line {
  @apply w-6;
}

.short-line {
  @apply w-4;
}

.header-line {
  @apply bg-dark p-0.5 rounded m-1;
}

.header-btn {
  @apply relative w-14 h-14;
  @apply cursor-pointer;
  @apply flex flex-col items-center justify-center;
  @apply bg-supplementary rounded-full shadow-md;
  @apply transition duration-150 hover:bg-secondary;
  @apply lg:hidden;
}
</style>
