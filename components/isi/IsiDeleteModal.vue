<template>
  <Modal modal-width="" class="pb-10" @toggleModal="toggleIsiDeleteModal">
    <h1 class="title-text text-center mt-8 mb-8">Delete ISI Result</h1>
    <p class="text-white text-center">Would you like to delete this result?</p>
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
  computed: {
    ...mapState(['resultToDelete']),
  },
  methods: {
    ...mapMutations(['toggleIsiDeleteModal']),
    async confirmDelete() {
      try {
        await this.$axios.delete(`v1/isi`, {
          data: { id: this.resultToDelete },
        })
        this.$store.commit('setResultToDelete', null)
        this.$emit('dataUpdated')
        this.toggleIsiDeleteModal()
      } catch (e) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      }
    },
    cancelDelete() {
      this.$store.commit('setResultToDelete', null)
      this.toggleIsiDeleteModal()
    },
  },
}
</script>
