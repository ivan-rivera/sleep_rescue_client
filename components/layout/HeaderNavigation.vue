<template>
  <ul>
    <li class="head-option">
      <font-awesome-icon :icon="['fa', 'paperclip']" />
      <NuxtLink to="/tc/">Terms of Service </NuxtLink>
    </li>
    <li class="head-option">
      <font-awesome-icon :icon="['fa', 'file']" />
      <NuxtLink to="/privacy/">Privacy</NuxtLink>
    </li>
    <li class="head-option">
      <font-awesome-icon :icon="['fa', 'phone-square']" />
      <NuxtLink to="/contact/">Contact</NuxtLink>
    </li>
    <li class="head-option">
      <font-awesome-icon :icon="['fa', 'info-circle']" />
      <NuxtLink to="/about/">About</NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.head-option {
  @apply lg:inline p-5 text-supplementary;
  @apply transition duration-150 hover:bg-white rounded-xl hover:text-dark;
}
</style>
