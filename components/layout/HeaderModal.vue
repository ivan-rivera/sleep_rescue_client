<template>
  <div class="head-modal" @click="toggleHeaderModal">
    <HeaderNavigation />
  </div>
</template>

<script>
import HeaderNavigation from '@/components/layout/HeaderNavigation'
import { mapMutations } from 'vuex'
export default {
  components: { HeaderNavigation },
  methods: {
    ...mapMutations({
      toggleHeaderModal: 'toggleHeaderModal',
    }),
  },
}
</script>

<style scoped>
.head-modal {
  @apply xl:hidden absolute inline
  border-2 border-white rounded-2xl
  right-0 top-24 w-48 z-10 bg-dark;
}
</style>
