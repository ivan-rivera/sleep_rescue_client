<template>
  <Modal modal-width="max-w-xs" @toggleModal="toggleAccountDeletionModal">
    <section>
      <h1 class="title-text text-center mb-8 mt-8">Delete Account</h1>
      <div v-if="error" class="error-message mb-5">
        <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
        {{ error }}
      </div>
      <form
        action=""
        name="delete-account"
        method="post"
        class="form-entry text-white"
        @submit.prevent="deleteAccount"
      >
        <!-- PASSWORD -->
        <label for="account-delete-pass"><strong>Password</strong></label>
        <input
          id="account-delete-pass"
          v-model="form.current_password"
          type="password"
          class="form-input-alternative"
          required
          pattern="\w{8,}"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Must contain at least 8 alphanumeric characters')"
        />
        <div class="mb-8" />
        <input
          class="light-btn"
          type="submit"
          name="change-email"
          :value="buttonLabel"
        />
      </form>
      <div class="m-8" />
      <div v-if="success" class="text-center font-bold mt-8 mb-8">
        <font-awesome-icon :icon="['fa', 'check-circle']" />
        Success! You are about to be logged out...
      </div>
      <div class="warning-notice">
        <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
        <p class="inline-block">This action is irreversible!</p>
      </div>
    </section>
  </Modal>
</template>

<script>
import { mapMutations } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      error: null,
      success: false,
      isLoading: false,
      form: { current_password: null },
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Delete!'
    },
  },
  methods: {
    ...mapMutations(['toggleAccountDeletionModal']),
    async deleteAccount() {
      this.$ga.event({
        eventCategory: 'engagement',
        eventLabel: 'delete_account',
        eventAction: 'method',
        eventValue: 1,
      })
      try {
        await this.$axios.delete('v1/user', { data: this.form })
        this.success = true
        this.error = null
        await setTimeout(() => {
          this.success = false
          this.$auth.logout()
        }, 1000)
      } catch (error) {
        this.error =
          error.response.status === 401
            ? 'Wrong password'
            : 'Server Error, please try again later'
      }
    },
  },
}
</script>

<style scoped>
.warning-notice {
  @apply text-center text-dark font-bold
  bg-secondary
  pt-2 pb-2;
}
</style>
