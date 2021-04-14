<template>
  <Modal :modal-width="modalWidth" :click-fn="clickFn">
    <div>
      <div v-if="showSignIn">
        <section class="modal-content">
          <h1 class="title-text text-center mb-8 mt-8">Sign In</h1>
          <form
            action=""
            name="signin"
            method="post"
            class="form-entry"
            @submit.prevent="login"
          >
            <FormEntry icon="at">
              <input
                v-model="loginForm.user.email"
                type="text"
                placeholder="Email..."
                class="form-input"
                required
                :pattern="emailPattern"
                oninput="setCustomValidity('')"
                oninvalid="setCustomValidity('Please provide a valid email address')"
              />
            </FormEntry>
            <FormEntry icon="key">
              <input
                v-model="loginForm.user.password"
                type="password"
                placeholder="Password..."
                class="form-input"
                pattern="\w{8,}"
                required
                oninput="setCustomValidity('')"
                oninvalid="setCustomValidity('Your password must contain at least 8 characters')"
              />
            </FormEntry>
            <input
              class="dark-btn w-full"
              type="submit"
              name="sign in"
              :class="isLoading ? 'animate-pulse' : ''"
              :value="buttonLabel"
            />
          </form>
          <div class="mt-5 mb-5 line-divider" />
          <section class="text-center">
            <p>Forgot your password?</p>
            <p>
              <u
                ><strong
                  class="highlight-text-white"
                  @click="showSignIn = !showSignIn"
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
          <form action="" name="signin" method="post" class="form-entry">
            <FormEntry icon="at">
              <input
                v-model="resetForm.user.email"
                type="text"
                placeholder="Email..."
                class="form-input"
                required
                :pattern="emailPattern"
                oninput="setCustomValidity('')"
                oninvalid="setCustomValidity('Please provide a valid email address')"
              />
            </FormEntry>
            <input
              class="dark-btn w-full"
              type="submit"
              name="reset"
              :value="buttonLabel"
            />
          </form>
          <div class="mt-5"></div>
          <p class="text-center">We'll send you the instructions</p>
          <div class="mt-8 mb-8 line-divider" />
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
import FormEntry from '~/components/layout/FormEntry'
import Modal from '~/components/layout/Modal'
export default {
  components: { FormEntry, Modal },
  props: {
    modalWidth: {
      type: String,
      default: '',
      required: false,
    },
    clickFn: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      emailPattern: EMAIL_PATTERN,
      isLoading: false,
      showSignIn: true,
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
    async login() {
      try {
        this.isLoading = true
        await this.$auth.loginWith('local', { data: this.loginForm })
        this.$auth.redirect('home')
      } catch (error) {
        this.$store.commit('setError', error.response.data.message)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
