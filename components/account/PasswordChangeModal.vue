<template>
  <Modal modal-width="max-w-md" @toggleModal="togglePasswordChangeModal">
    <section>
      <h1 class="title-text text-center mb-8 mt-8">Change Password</h1>
      <div v-if="error" class="error-message mb-5">
        <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
        {{ error }}
      </div>
      <form
        action=""
        name="password-change"
        method="post"
        class="form-entry"
        @submit="changePassword"
      >
        <!-- PASSWORD -->
        <label for="password-change-p1"
          ><strong>Current Password</strong></label
        >
        <input
          id="password-change-p1"
          v-model="form.user.password"
          type="password"
          class="form-input-alternative"
          required
          pattern="\w{8,}"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Must contain at least 8 alphanumeric characters')"
        />
        <!-- NEW PASSWORD -->
        <label for="password-change-p2"><strong>New Password</strong></label>
        <input
          id="password-change-p2"
          v-model="form.user.new_password"
          type="password"
          class="form-input-alternative"
          required
          pattern="\w{8,}"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Must contain at least 8 alphanumeric characters')"
        />
        <!-- NEW PASSWORD CONFIRMATION -->
        <label for="password-change-p3"
          ><strong>Confirm New Password</strong></label
        >
        <input
          id="password-change-p3"
          v-model="form.user.new_password_confirmation"
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
          name="change-password"
          :value="buttonLabel"
        />
      </form>
      <div v-if="success" class="text-center font-bold mt-8">
        <font-awesome-icon :icon="['fa', 'check-circle']" />
        Success!
      </div>
      <div class="m-8" />
    </section>
  </Modal>
</template>

<script>
// TODO: test it
import { mapMutations } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      isLoading: false,
      error: null,
      success: null,
      form: {
        user: {
          password: null,
          new_password: null,
          new_password_confirmation: null,
        },
      },
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Change'
    },
  },
  methods: {
    ...mapMutations(['togglePasswordChangeModal']),
    markSuccess() {
      this.success = true
      setTimeout(() => {
        this.success = null
      }, 3000)
    },
    changePassword() {
      // TODO: check 2 passwords match
      // TODO: check current password
      // TODO: check for server errors
      console.log('Change password...')
      this.markSuccess()
    },
  },
}
</script>
