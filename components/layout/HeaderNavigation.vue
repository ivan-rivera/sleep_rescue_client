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
    <li v-if="!confirmedUser && $auth.loggedIn" class="head-option">
      <font-awesome-icon :icon="['fa', 'door-open']" class="inline" />
      <div class="inline" @click="$auth.logout()">Log Out</div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['confirmedUser']),
}
</script>

<style scoped>
.head-option {
  @apply xl:inline p-5 text-supplementary
  transition duration-150 hover:bg-white rounded-xl hover:text-dark;
}
</style>
