<template>
  <div>
    <h1 class="heading-top">Your Account</h1>
    <div class="flex flex-row">
      <section class="mt-10 flex flex-col">
        <h2 class="heading-sub">Your details</h2>
        <p>
          Email address: <strong>{{ email }}</strong>
        </p>
        <p>
          Joined on: <strong>{{ dateJoined }}</strong>
        </p>
        <div class="danger-btn text-center w-52 mt-8">Delete my account</div>
        <!-- TODO: confirmation modal + account deletion action       -->
      </section>
      <section>
        <h2>Reset Password</h2>
        <form
          action=""
          name="account-password-reset"
          method="post"
          class="form-entry"
          @submit="resetPassword"
        >
          <FormEntry icon="key">
            <input
              v-model="passwordReset.user.password"
              type="password"
              placeholder="Current Password"
              class="form-input"
              required
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              v-model="passwordReset.user.new_password"
              type="password"
              placeholder="New Password"
              class="form-input"
              required
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              v-model="passwordReset.user.new_password_confirmation"
              type="password"
              placeholder="Repeat New Password"
              class="form-input"
              required
            />
          </FormEntry>
          <input
            class="action-btn"
            type="submit"
            name="reset-password"
            value="Reset"
          />
        </form>
      </section>
      <section>
        <h2>Change Email</h2>
        <form
          action=""
          name="account-email-change"
          method="post"
          class="form-entry"
          @submit="changeEmail"
        >
          <FormEntry icon="at">
            <input
              v-model="emailChange.user.new_email"
              type="text"
              placeholder="New Email"
              class="form-input"
              required
            />
          </FormEntry>
          <FormEntry icon="at">
            <input
              v-model="emailChange.user.new_email_confirmation"
              type="text"
              placeholder="Repeat New Email"
              class="form-input"
              required
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              v-model="emailChange.user.password"
              type="text"
              placeholder="Password"
              class="form-input"
              required
            />
          </FormEntry>
          <input
            class="action-btn"
            type="submit"
            name="change-email"
            value="Change"
          />
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import FormEntry from '~/components/layout/FormEntry'
export default {
  components: { FormEntry },
  async asyncData({ $axios }) {
    const response = await $axios.$get('user')
    const email = response.user.email
    const dateJoined = new Date(response.user.inserted_at).toLocaleDateString()
    return { email, dateJoined }
  },
  data() {
    return {
      passwordReset: {
        user: {
          password: null,
          new_password: null,
          new_password_confirmation: null,
        },
      },
      emailChange: {
        user: {
          new_email: null,
          new_email_confirmation: null,
          password: null,
        },
      },
    }
  },
  methods: {
    resetPassword(event) {
      event.preventDefault()
      console.log('reset password...') // TODO: reset password
    },
    changeEmail(event) {
      event.preventDefault()
      console.log('change email...') // TODO: change email
    },
  },
}
</script>
