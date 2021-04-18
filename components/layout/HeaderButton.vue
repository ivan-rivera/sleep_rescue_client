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
  @apply relative w-14 h-14
  cursor-pointer
  flex flex-col items-center justify-center
  bg-supplementary rounded-full shadow-md
  transition duration-150 hover:bg-secondary
  lg:hidden;
}
</style>
