<template>
  <Modal modal-width="" class="pb-10" @toggleModal="toggleDeleteGoalModal">
    <h1 class="title-text text-center mt-8 mb-8">Delete Goal</h1>
    <p class="text-white text-center">Would you like to delete this goal?</p>
    <div class="flex flex-row ml-auto mr-auto w-full">
      <div class="secondary-btn !w-16 !mr-2" @click="confirmDelete">Yes</div>
      <div class="secondary-btn !w-16 !ml-2" @click="cancelDelete">No</div>
    </div>
    <div v-if="error" class="text-center bg-secondary text-dark font-bold p-2">
      <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
      Submission failed, try again later
    </div>
  </Modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      error: false,
    }
  },
  methods: {
    ...mapMutations(['toggleDeleteGoalModal']),
    async confirmDelete() {
      try {
        await this.$axios.delete(`v1/goal/${this.goalToDelete}`)
        this.$store.commit('setGoalToDelete', null)
        this.toggleDeleteGoalModal()
      } catch (e) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      }
    },
    cancelDelete() {
      this.$store.commit('setGoalToDelete', null)
      this.toggleDeleteGoalModal()
    },
  },
  computed: {
    ...mapState(['goalToDelete']),
  },
}
</script>
