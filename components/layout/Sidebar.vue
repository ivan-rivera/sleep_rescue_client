<template>
  <div
    class="sr-sidebar slide-in"
    :class="expanded ? 'sr-sidebar-full' : 'sr-sidebar-default'"
  >
    <div
      :class="{ 'menu-border': expanded }"
      class="mt-10 w-full cursor-pointer"
      @click="expand"
    >
      <div class="option-holder">
        <div class="icon-box">
          <font-awesome-icon :icon="['fa', expanded ? 'times' : 'bars']" />
        </div>
        <transition name="fade">
          <p v-if="expanded" class="text-3xl pl-2 uppercase">Menu</p>
        </transition>
      </div>
    </div>
    <div class="flex flex-col justify-between h-72">
      <NuxtLink to="/dashboard">
        <div class="option-holder" :class="isSelected('dashboard')">
          <div class="icon-box">
            <font-awesome-icon :icon="['fa', 'chart-pie']" />
          </div>
          <transition name="fade">
            <p v-if="expanded" class="route-desc">Dashboard</p>
          </transition>
        </div>
      </NuxtLink>
      <NuxtLink to="/goals">
        <div class="option-holder" :class="isSelected('goals')">
          <div class="icon-box">
            <font-awesome-icon :icon="['fa', 'trophy']" />
          </div>
          <transition name="fade">
            <p v-if="expanded" class="route-desc">Goals</p>
          </transition>
        </div>
      </NuxtLink>
      <NuxtLink to="/thoughts">
        <div class="option-holder" :class="isSelected('thoughts')">
          <div class="icon-box">
            <font-awesome-icon :icon="['fa', 'comment-dots']" />
          </div>
          <transition name="fade">
            <p v-if="expanded" class="route-desc">Thought Checker</p>
          </transition>
        </div>
      </NuxtLink>
      <NuxtLink to="/isi">
        <div class="option-holder" :class="isSelected('isi')">
          <div class="icon-box">
            <font-awesome-icon :icon="['fa', 'clipboard-list']" />
          </div>
          <transition name="fade">
            <p v-if="expanded" class="route-desc">ISI Survey</p>
          </transition>
        </div>
      </NuxtLink>
      <NuxtLink to="/learn">
        <div class="option-holder" :class="isSelected('learn')">
          <div class="icon-box">
            <font-awesome-icon :icon="['fa', 'book-medical']" />
          </div>
          <transition name="fade">
            <p v-if="expanded" class="route-desc">Learning Center</p>
          </transition>
        </div>
      </NuxtLink>
    </div>
    <div class="mb-10">
      <NuxtLink to="/account">
        <div class="option-holder" :class="isSelected('account')">
          <div class="icon-box">
            <font-awesome-icon :icon="['fa', 'user-circle']" />
          </div>
          <transition name="fade">
            <p v-if="expanded" class="route-desc">Account</p>
          </transition>
        </div>
      </NuxtLink>
      <div class="cursor-pointer option-holder" @click="$auth.logout()">
        <div class="icon-box">
          <font-awesome-icon :icon="['fa', 'door-open']" />
        </div>
        <transition name="fade">
          <p v-if="expanded" class="route-desc">Log out</p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: transition effects
  // TODO: hover effects + tooltip
  transition: 'fade',
  data() {
    return {
      expanded: true,
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
      this.expanded = !this.expanded
    },
  },
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.sr-sidebar {
  @apply fixed
  left-0 top-0
  h-full
  flex flex-col justify-between
  text-dark text-3xl
  text-left
  bg-white
  border-r-2 border-dark;
  transition: width 500ms;
}

.sr-sidebar-default {
  @apply w-20;
}

.sr-sidebar-full {
  @apply w-72;
  /*  72*/
}

.selected-page {
  @apply bg-dark text-secondary text-4xl
  rounded-bl-3xl rounded-tl-3xl
  pl-4 pt-4 pb-4
  text-center;
}

.icon-box {
  @apply w-12;
}

.option-holder {
  @apply pt-2 pb-2 pl-6;
  @apply mt-2 mb-2;
  @apply flex flex-row items-center;
}

.route-desc {
  @apply pl-2
  uppercase
  text-base font-bold
  overflow-hidden whitespace-nowrap;
}

.menu-border {
  @apply border-t-2 border-b-2 border-dark;
}
</style>
