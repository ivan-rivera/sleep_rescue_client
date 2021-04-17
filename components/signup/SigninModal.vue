<template>
  <Modal modal-width="max-w-md" :click-fn="toggleSignInModal">
    <div>
      <div v-if="showSignIn">
        <section class="modal-content">
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
              placeholder="email@example.com"
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
              placeholder="8 alphanumeric characters..."
              class="form-input-alternative"
              pattern="\w{8,}"
              required
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Your password must contain at least 8 characters')"
            />
            <div class="mb-8" />
            <input
              class="dark-btn w-full"
              type="submit"
              name="sign in"
              :class="isLoading ? 'animate-pulse' : ''"
              :value="buttonLabel"
            />
          </form>
          <div class="mb-2.5" />
          <div class="mt-5 mb-5 line-divider" />
          <section class="text-center">
            <p>Forgot your password?</p>
            <p>
              <u
                ><strong class="highlight-text-white" @click="switchModal"
                  >Reset it here</strong
                ></u
              >
            </p>
          </section>
        </section>
      </div>
      <div v-if="!showSignIn">
        <section class="modal-content">
          <h1 class="title-text text-center mb-8 mt-8">Reset Password</h1>
          <div v-if="error" class="error-message mb-5">
            <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
            {{ error }}
          </div>
          <form action="" name="signin" method="post" class="form-entry">
            <label for="reset-email"><strong>E-mail</strong></label>
            <input
              id="reset-email"
              v-model="resetForm.user.email"
              type="text"
              placeholder="example@mail.com"
              class="form-input-alternative"
              required
              :pattern="emailPattern"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Please provide a valid email address')"
            />
            <div class="mb-8" />
            <input
              class="dark-btn w-full"
              type="submit"
              name="reset"
              :value="buttonLabel"
            />
          </form>
          <div class="mt-5"></div>
          <p class="text-center">We'll send you the instructions</p>
          <div class="mb-2.5" />
          <div class="mt-5 mb-8 line-divider" />
          <section class="text-center">
            <p>Do you want to try another password?</p>
            <p>
              <u
                ><strong
                  class="highlight-text-white"
                  @click="showSignIn = !showSignIn"
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
      loginForm: {
        user: {
          email: 'tester@mail.com',
          password: 'secret123',
        },
      },
      resetForm: {
        user: {
          email: null,
        },
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
        if (error.name === 'NetworkError') {
          this.error = 'Server error, please try later'
        } else {
          this.error = error.response.data.error.message
        }
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
