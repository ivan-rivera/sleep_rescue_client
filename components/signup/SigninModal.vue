<template>
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
        />
      </FormEntry>
      <FormEntry icon="key">
        <input
          v-model="loginForm.user.password"
          type="password"
          placeholder="Password..."
          class="form-input"
          required
        />
      </FormEntry>
      <input class="action-btn" type="submit" name="sign in" value="Continue" />
    </form>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import FormEntry from '~/components/layout/FormEntry'
export default {
  components: { FormEntry },
  data() {
    return {
      loginForm: {
        user: {
          email: 'tester@mail.com',
          password: 'secret123',
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

<style>
.modal-content {
  @apply flex flex-col;
  @apply pt-5 pb-16;
}

.modal-width {
  @apply max-w-md;
}

.title-text {
  @apply pb-5;
  @apply text-center;
  @apply text-dark;
  @apply font-bold text-3xl;
}
</style>
