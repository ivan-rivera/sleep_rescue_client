<template>
  <div class="sr-sidebar sr-sidebar-default">
    <div class="mt-10 w-full cursor-pointer" @click="expand">
      <div>
        <font-awesome-icon :icon="['fa', 'bars']" />
      </div>
    </div>
    <div class="flex flex-col justify-between h-72">
      <NuxtLink to="/dashboard">
        <div :class="isSelected('dashboard')">
          <font-awesome-icon :icon="['fa', 'chart-pie']" />
        </div>
      </NuxtLink>
      <NuxtLink to="/goals">
        <div :class="isSelected('goals')">
          <font-awesome-icon :icon="['fa', 'trophy']" />
        </div>
      </NuxtLink>
      <NuxtLink to="/thoughts">
        <div :class="isSelected('thoughts')">
          <font-awesome-icon :icon="['fa', 'brain']" />
        </div>
      </NuxtLink>
      <NuxtLink to="/isi">
        <div :class="isSelected('isi')">
          <font-awesome-icon :icon="['fa', 'procedures']" />
        </div>
      </NuxtLink>
      <NuxtLink to="/learn">
        <div :class="isSelected('learn')">
          <font-awesome-icon :icon="['fa', 'book-medical']" />
        </div>
      </NuxtLink>
    </div>
    <div class="mb-10">
      <NuxtLink to="/account">
        <div class="option-holder" :class="isSelected('account')">
          <font-awesome-icon :icon="['fa', 'user-circle']" />
        </div>
      </NuxtLink>
      <div class="cursor-pointer" @click="$auth.logout()">
        <font-awesome-icon :icon="['fa', 'door-open']" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: expand logic
  // TODO: highlight current (use sexy curve outward stuff)
  // TODO: hover effects + tooltip
  // TODO: transition effects
  // TODO: move CSS into classes
  data() {
    return {
      expanded: false,
    }
  },
  mounted() {
    const page = this.$route.name
    console.log(`page: ${page}`)
  },
  methods: {
    isSelected(page) {
      return this.$route.name === page ? 'selected-page' : ''
    },
    expand() {
      console.log('...')
    },
  },
}
</script>

<style>
.sr-sidebar {
  @apply fixed
  left-0 top-0
  h-full
  flex flex-col justify-between
  text-dark text-center text-3xl
  bg-white;
}

.sr-sidebar-default {
  @apply w-16;
}

.sr-sidebar-full {
  @apply w-72;
}

.selected-page {
  @apply bg-dark text-secondary text-4xl
  rounded-bl-3xl rounded-tl-3xl
  pt-4 pb-4;
}

.option-holder {
  @apply pt-2 pb-2;
  @apply mt-2 mb-2;
}
</style>
