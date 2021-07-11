<template>
  <div :class="['card-group', cardType]">
    <div class="welcome-card">
      <img class="pb-5" alt="welcome card" :src="imgPath" />
      <p class="welcome-card-text">{{ text }}</p>
    </div>
    <div class="welcome-card-flip"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.card-group {
  @apply hidden xl:top-64 relative;
}

.card-group-secondary {
  @apply xl:block;
}

.card-group-primary {
  @apply lg:block
  transform lg:translate-x-32 lg:top-64 xl:scale-100 xl:translate-x-0;
}

.welcome-card {
  @apply bg-white
  absolute bottom-12
  pt-10 pb-10
  h-48 w-40 z-10
  flex flex-col justify-between items-center
  rounded-2xl border-2 border-dark;
}

.welcome-card-text {
  @apply text-sm text-dark ml-2.5 mr-2.5;
}

.welcome-card-flip {
  @apply bg-supplementary
  absolute bottom-10
  h-48 w-40 z-0
  border-2 border-dark rounded-2xl
  transform skew-y-6;
}
</style>
