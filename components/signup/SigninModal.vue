<template>
  <Modal modal-width="max-w-md" @toggleModal="toggleSignInModal">
    <div>
      <div v-if="showSignIn">
        <section class="modal-content text-white">
          <h1 class="title-text text-center mb-8 mt-8">Sign In</h1>
          <div v-if="error" class="error-message mb-5">
            <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
            {{ error }}
          </div>
          <form
            action=""
            name="signin"
            method="post"
            class="form-entry"
            @submit.prevent="login"
          >
            <label for="login-email"><strong>E-mail</strong></label>
            <input
              id="login-email"
              v-model="loginForm.user.email"
              type="text"
              class="form-input-alternative"
              required
              :pattern="emailPattern"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Please provide a valid email address')"
            />
            <div class="mb-2.5" />
            <label for="login-password"><strong>Password</strong></label>
            <input
              id="login-password"
              v-model="loginForm.user.password"
              type="password"
              class="form-input-alternative"
              pattern="\w{8,}"
              required
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Your password must contain at least 8 characters')"
            />
            <div class="mb-8" />
            <input
              class="light-btn w-full"
              type="submit"
              name="sign in"
              :class="isLoading ? 'animate-pulse' : ''"
              :value="buttonLabel"
            />
          </form>
          <div class="mb-2.5" />
          <div class="mt-5 mb-5 line-divider !border-secondary opacity-50" />
          <section class="text-center">
            <p>Forgot your password?</p>
            <p class="cursor-pointer">
              <u><strong @click="switchModal">Reset it here</strong></u>
            </p>
          </section>
        </section>
      </div>
      <div v-if="!showSignIn">
        <section class="modal-content text-white">
          <h1 class="title-text text-center mb-8 mt-8">Reset Password</h1>
          <div v-if="error" class="error-message mb-5">
            <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
            {{ error }}
          </div>
          <div v-if="resetMessage" class="notice-message mb-5">
            <font-awesome-icon :icon="['fa', 'check-circle']" />
            {{ resetMessage }}
          </div>
          <form
            action=""
            name="reset"
            method="post"
            class="form-entry"
            @submit.prevent="reset"
          >
            <label for="reset-email"><strong>E-mail</strong></label>
            <input
              id="reset-email"
              v-model="resetForm.email"
              type="text"
              class="form-input-alternative"
              required
              :pattern="emailPattern"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Please provide a valid email address')"
            />
            <div class="mb-8" />
            <input
              class="light-btn w-full"
              type="submit"
              name="reset"
              :value="buttonLabel"
            />
          </form>
          <div class="mt-5"></div>
          <p class="text-center">
            We'll send you the instructions, please check you spam folder!
          </p>
          <div class="mb-2.5" />
          <div class="mt-5 mb-8 line-divider !border-secondary opacity-50" />
          <section class="text-center">
            <p>Do you want to try another password?</p>
            <p>
              <u
                ><strong @click="showSignIn = !showSignIn"
                  >Back to sign in</strong
                ></u
              >
            </p>
          </section>
        </section>
      </div>
      <div class="mb-8"></div>
    </div>
  </Modal>
</template>

<script>
import { mapMutations } from 'vuex'
import { EMAIL_PATTERN } from '~/assets/js/constants'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      emailPattern: EMAIL_PATTERN,
      isLoading: false,
      showSignIn: true,
      error: null,
      resetMessage: null,
      loginForm: {
        user: {
          email: null,
          password: null,
        },
      },
      resetForm: {
        email: null,
      },
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Continue'
    },
  },
  methods: {
    ...mapMutations({
      toggleSignInModal: 'toggleSignInModal',
      setError: 'setError',
    }),
    switchModal() {
      this.error = null
      this.showSignIn = !this.showSignIn
    },
    async login() {
      try {
        this.isLoading = true
        await this.$auth.loginWith('local', { data: this.loginForm })
        this.error = null
        this.$auth.redirect('home')
      } catch (error) {
        this.catchError(error)
      } finally {
        this.isLoading = false
      }
    },
    async reset() {
      try {
        this.isLoading = true
        const response = await this.$axios.$post(
          'v1/password/reset',
          this.resetForm
        )
        this.resetForm.email = null
        this.resetMessage = response.data.message
      } catch (error) {
        this.catchError(error)
      } finally {
        this.isLoading = false
      }
    },
    catchError(error) {
      this.error =
        error?.response?.data?.error?.message ??
        'Server error, please try later'
    },
  },
}
</script>
