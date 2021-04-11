<template>
  <Modal :modal-width="modalWidth" :click-fn="clickFn">
    <div>
      <div v-if="showSignIn">
        <section class="modal-content">
          <h1 class="title-text">Sign In</h1>
          <form
            action=""
            name="signin"
            method="post"
            class="form-entry"
            @submit="login"
          >
            <FormEntry icon="at">
              <input
                v-model="loginForm.user.email"
                type="text"
                placeholder="Email..."
                class="form-input"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                minlength="8"
                required
                oninput="setCustomValidity('')"
                oninvalid="setCustomValidity('Your password must contain at least 8 characters')"
              />
            </FormEntry>
            <input
              class="dark-btn w-full"
              type="submit"
              name="sign in"
              value="Continue"
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
          <h1 class="title-text">Reset Password</h1>
          <form
            action=""
            name="signin"
            method="post"
            class="form-entry"
            @submit="login"
          >
            <FormEntry icon="at">
              <input
                v-model="resetForm.user.email"
                type="text"
                placeholder="Email..."
                class="form-input"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                oninput="setCustomValidity('')"
                oninvalid="setCustomValidity('Please provide a valid email address')"
              />
            </FormEntry>
            <input
              class="dark-btn w-full"
              type="submit"
              name="reset"
              value="Reset"
            />
          </form>
          <div class="mt-5"></div>
          <p class="text-center">We'll send you the instructions</p>
          <div class="mt-5 mb-5 line-divider" />
          <section class="text-center">
            <p>Want to try another password?</p>
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
      showSignIn: true,
      loginForm: {
        user: {
          email: null,
          password: null,
        },
      },
      resetForm: {
        user: {
          email: null,
        },
      },
    }
  },
  methods: {
    ...mapMutations({
      toggleSignInModal: 'toggleSignInModal',
      setError: 'setError',
    }),
    async login(event) {
      event.preventDefault()
      try {
        await this.$auth.loginWith('local', { data: this.loginForm })
        this.$auth.redirect('home')
      } catch (error) {
        this.$store.commit('setError', error.response.data.message)
      }
    },
  },
}
</script>
