<template>
  <Modal modal-width="max-w-md" @toggleModal="toggleAccountDeletionModal">
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
        class="form-entry"
        @submit="deleteAccount"
      >
        <!-- PASSWORD -->
        <label for="account-delete-pass"><strong>Password</strong></label>
        <input
          id="account-delete-pass"
          v-model="form.user.password"
          type="password"
          class="form-input-alternative"
          required
          pattern="\w{8,}"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Must contain at least 8 alphanumeric characters')"
        />
        <div class="mb-8" />
        <input
          class="dark-btn w-full"
          type="submit"
          name="change-email"
          :value="buttonLabel"
        />
      </form>
      <div class="m-8" />
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
      isLoading: false,
      form: { user: { password: null } },
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Delete!'
    },
  },
  methods: {
    ...mapMutations(['toggleAccountDeletionModal']),
    deleteAccount() {
      // TODO: check current password
      // TODO: check for server errors
      // TODO: send to signup page
      console.log('...')
    },
  },
}
</script>

<style scoped>
.warning-notice {
  @apply text-center text-dark font-bold
  bg-secondary
  rounded-br-2xl rounded-bl-2xl
  pt-2 pb-2;
}
</style>
