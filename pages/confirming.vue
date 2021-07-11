<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">Email Confirmation</h1>
    <div v-if="!ready" class="title-text text-center mt-24">Loading...</div>
    <div v-if="ready" class="text-2xl text-center mt-28 mb-28">
      <div v-if="error">
        <p>{{ error }}</p>
        <img
          src="images/warning.svg"
          alt="error"
          class="absolute m-auto top-0 bottom-0 left-0 right-0 opacity-50 behind"
        />
      </div>
      <div v-if="!error" class="card-background card">
        <p class="pb-8 font-bold">
          Email confirmed
          <br />
          you can now log in!
        </p>
        <form
          action=""
          name="signin"
          method="post"
          class="form-entry"
          @submit.prevent="login"
        >
          <div class="mb-2.5" />
          <label for="login-password"><strong>Password</strong></label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            class="form-input-alternative"
            pattern="\w{8,}"
            required
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('Your password must contain at least 8 characters')"
          />
          <div class="mb-8" />
          <input
            class="dark-btn w-3/4"
            type="submit"
            name="sign in"
            :class="isLoading ? 'animate-pulse' : ''"
            :value="buttonLabel"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { EMAIL_PATTERN } from '~/assets/js/constants'
export default {
  auth: false,
  data() {
    return {
      emailPattern: EMAIL_PATTERN,
      isLoading: false,
      ready: false,
      error: null,
      password: null,
      email: null,
    }
  },
  async fetch() {
    if (this.$route.query?.token === undefined) {
      this.success = false
      this.error = 'Oops, it looks like the token is missing, check you link!'
    } else {
      try {
        const response = await this.$axios.get(
          `v1/confirmation/token/${this.$route.query?.token}`
        )
        this.email = response.data.email
        this.error =
          response?.data?.message === 'Email confirmed'
            ? null
            : 'Invalid token, please request another'
      } catch (error) {
        this.success = false
        this.error = 'Oops, something went wrong, please try again later'
      }
    }
    this.ready = true
  },
  head: {
    title: 'Account Confirmed!',
    meta: [
      {
        hid: 'sleep-rescue-account-confirmed',
        name: 'Account Confirmed',
        content: 'Account confirmation page for SleepRescue.org',
      },
    ],
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Continue'
    },
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: { user: { email: this.email, password: this.password } },
        })
        this.$auth.redirect('home')
      } catch (error) {
        this.error = 'Oops, something went wrong, please try again later'
      }
    },
  },
}
</script>

<style scoped>
.card {
  @apply max-w-md
  ml-auto mr-auto
  pt-10 pb-10
  rounded-3xl
  text-dark;
}
</style>
