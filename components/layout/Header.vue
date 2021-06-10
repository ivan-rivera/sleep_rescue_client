<template>
  <header class="header">
    <div class="logo">
      <NuxtLink :to="home_path">
        <img src="images/logo.svg" alt="logo" />
      </NuxtLink>
    </div>
    <div>
      <HeaderNavigation class="hidden xl:block" />
      <HeaderButton @click.native="toggleHeaderModal" />
      <HeaderModal v-if="$store.state.showHeaderModal" />
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
import { HOME_PATH } from 'assets/js/constants'
import HeaderNavigation from '~/components/layout/HeaderNavigation'
import HeaderButton from '~/components/layout/HeaderButton'
import HeaderModal from '~/components/layout/HeaderModal'
export default {
  components: {
    HeaderModal,
    HeaderNavigation,
    HeaderButton,
  },
  data() {
    return {
      home_path: HOME_PATH,
    }
  },
  methods: {
    ...mapMutations({
      toggleHeaderModal: 'toggleHeaderModal',
    }),
  },
}
</script>

<style scoped>
.header {
  @apply flex items-center justify-between
  pt-2.5 pb-2.5 ml-auto mr-auto;
  max-width: 1200px;
}

.logo {
  @apply transform scale-75 origin-left;
}
</style>
