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
        class="form-entry text-white"
        @submit.prevent="changePassword"
      >
        <!-- PASSWORD -->
        <label for="password-change-p1"
          ><strong>Current Password</strong></label
        >
        <input
          id="password-change-p1"
          v-model="form.current_password"
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
          v-model="form.password"
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
          ref="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="form-input-alternative"
          required
          pattern="\w{8,}"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Must contain at least 8 alphanumeric characters')"
          @change="checkPasswordEquality"
        />
        <div class="mb-8" />
        <input
          class="light-btn"
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
import { mapMutations } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      genericError: 'Oops, something went wrong, please try again later',
      isLoading: false,
      error: null,
      success: null,
      form: {
        current_password: null,
        password: null,
        password_confirmation: null,
      },
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Change'
    },
    passwordsMatch() {
      return this.form.password === this.form.password_confirmation
    },
  },
  methods: {
    ...mapMutations(['togglePasswordChangeModal']),
    async changePassword() {
      try {
        await this.$axios.patch('v1/user', this.form)
        this.success = true
      } catch (error) {
        this.error = this.genericError
      }
    },
    checkPasswordEquality() {
      const validity = this.passwordsMatch ? '' : 'passwords do not match'
      this.$refs.password_confirmation.setCustomValidity(validity)
    },
  },
}
</script>
