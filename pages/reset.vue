<template>
  <div class="centralize">
    <div class="heading-top text-center mb-10">Password Reset</div>
    <div v-if="!ready" class="title-text text-center mt-24">
      Loading your file...
    </div>
    <div v-if="ready">
      <div v-if="error">
        <div class="title-text text-center mt-24 z-50">
          {{ error }}
        </div>
        <img
          src="images/warning.svg"
          alt="error"
          class="absolute m-auto top-0 bottom-0 left-0 right-0 opacity-50 behind"
        />
      </div>
      <div v-if="!error" class="card-background reset-card">
        <div class="title-text text-center">Set a new password</div>
        <form
          action=""
          name="newPassword"
          method="post"
          class="form-entry mb-5"
          @submit.prevent="updatePassword"
        >
          <label for="resetPassword"><strong>New Password</strong></label>
          <input
            id="resetPassword"
            v-model="updateForm.password"
            type="password"
            class="form-input-alternative mb-2.5"
            required
            pattern="\w{8,}"
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('Your password must contain at least 8 alphanumeric characters')"
          />
          <label for="passwordConfirmation"
            ><strong>New Password Again</strong></label
          >
          <input
            id="passwordConfirmation"
            ref="password_confirmation"
            v-model="updateForm.password_confirmation"
            type="password"
            class="form-input-alternative mb-2.5"
            oninput="setCustomValidity('')"
            required
            @change="checkPasswordEquality"
          />
          <input
            class="dark-btn"
            type="submit"
            name="updatePasswordButton"
            :value="buttonLabel"
            :class="isLoading ? 'animate-pulse' : ''"
          />
        </form>
        <div v-if="backendError" class="error-message mb-5">
          <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
          {{ backendError }}
        </div>
        <div v-if="resultMessage" class="notice-message mb-5">
          <font-awesome-icon :icon="['fa', 'check-circle']" />
          {{ resultMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      ready: false,
      isLoading: false,
      error: null,
      backendError: null,
      resultMessage: null,
      updateForm: {
        password: null,
        password_confirmation: null,
      },
    }
  },
  head: {
    title: 'Password Reset',
    meta: [
      {
        hid: 'sleep-rescue-pass-reset',
        name: 'Reset your account password',
        content: 'Password reset page',
      },
    ],
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Continue'
    },
    passwordsMatch() {
      return this.updateForm.password === this.updateForm.password_confirmation
    },
  },
  mounted() {
    if (this.$route.query?.token === undefined) {
      this.error =
        'Oops, it looks like the reset token is missing, check your link!'
    }
    this.ready = true
  },
  methods: {
    checkPasswordEquality() {
      const validity = this.passwordsMatch ? '' : 'passwords do not match'
      this.$refs.password_confirmation.setCustomValidity(validity)
    },
    async updatePassword() {
      try {
        const updateResponse = await this.$axios.$patch(
          `v1/password/update/${this.$route.query?.token}`,
          this.updateForm
        )
        const loginData = {
          user: {
            email: updateResponse.data.email,
            password: this.updateForm.password,
          },
        }
        await this.$auth.loginWith('local', { data: loginData })
        this.resultMessage = 'Your password has been updated, redirecting...'
        setTimeout(() => {
          this.$auth.redirect('home')
        }, 3000)
      } catch (error) {
        this.backendError =
          error?.response?.error?.message ??
          'Server error, please try again later'
      }
    },
  },
}
</script>

<style scoped>
.reset-card {
  @apply max-w-lg
  ml-auto mr-auto
  pt-10 pb-10
  rounded-3xl
  text-dark;
}
</style>
