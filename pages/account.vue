<template>
  <div class="flex flex-row items-left">
    <h1 class="heading-top">Your Account</h1>
    <!-- About you card -->
    <div class="card card-background">
      <h2 class="title-text text-center">About you</h2>
      <div>
        <p>
          Email: <strong>{{ email }}</strong>
        </p>
        <p>
          Joined on: <strong>{{ dateJoined }}</strong>
        </p>
        <p>
          Nights recorded: <strong>{{ temp.nightsRecorded }}</strong>
        </p>
        <p>
          1st week sleep efficiency:
          <strong>{{ temp.firstWeekSleepEfficiency }}</strong>
        </p>
        <p>
          Last week sleep efficiency:
          <strong>{{ temp.lastWeekSleepEfficiency }}</strong>
        </p>
      </div>
    </div>
    <!-- Change password card -->
    <div class="card card-background">
      <h2 class="title-text text-center">Change password</h2>
      <form action="" name="signin" method="post" class="form-entry">
        <FormEntry icon="key">
          <input
            v-model="passwordReset.user.password"
            type="password"
            placeholder="Current password"
            class="form-input"
            pattern="\w{8,}"
            required
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('You password must contain at least 8 alphanumeric characters')"
          />
        </FormEntry>
        <FormEntry icon="key">
          <input
            v-model="passwordReset.user.new_password"
            type="password"
            placeholder="New password"
            class="form-input"
            pattern="\w{8,}"
            required
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('You password must contain at least 8 alphanumeric characters')"
          />
        </FormEntry>
        <FormEntry icon="key">
          <input
            v-model="passwordReset.user.new_password_confirmation"
            type="password"
            placeholder="Repeat new password"
            class="form-input"
            pattern="\w{8,}"
            required
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('You password must contain at least 8 alphanumeric characters')"
          />
        </FormEntry>
        <input
          class="dark-btn w-full"
          type="submit"
          name="reset"
          :value="buttonLabel"
        />
      </form>
    </div>
  </div>
</template>

<script>
import FormEntry from '~/components/layout/FormEntry'
export default {
  // todo: look for account settings pages on Figma for inspiration
  // todo: add a flash message indicating success
  components: { FormEntry },
  async asyncData({ $axios }) {
    const response = await $axios.$get('user')
    const email = response.user.email
    const dateJoined = new Date(response.user.inserted_at).toLocaleDateString()
    return { email, dateJoined }
  },
  data() {
    return {
      temp: {
        // todo: look into anonymous components: do I have to repeat forms?
        // todo: pull these from the backend via asyncData
        nightsRecorded: 30,
        firstWeekSleepEfficiency: 0.7,
        lastWeekSleepEfficiency: 0.9,
      },
      isLoading: false,
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
  computed: {
    // todo: find a way to convert pct in JS + access asyncData
    firstWeekSleepEfficiencyFmt() {
      return this.firstWeekSleepEfficiency * 100
    },
    lastWeekSleepEfficiencyFmt() {
      return this.lastWeekSleepEfficiency * 100
    },
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Continue'
    },
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

<style scoped>
.card {
  @apply p-8 rounded-2xl text-dark;
}
</style>
