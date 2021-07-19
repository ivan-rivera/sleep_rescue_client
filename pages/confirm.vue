<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">Please confirm your account</h1>
    <span class="block text-center text-2xl mb-14">
      We sent you an email with a confirmation link to
      <span class="attention">{{ email }}</span
      >, please click on that link before proceeding to use this website. It may
      take 10 mins or so for the email to get delivered.
      <br />
      <br />
      If you didn't get the email, you can request it again.
    </span>
    <div class="flex flex-col">
      <div class="secondary-btn max-w-sm" @click="$auth.logout()">Log out</div>
      <div class="secondary-btn max-w-sm" @click="sendEmail">Send again</div>
      <div
        v-if="unconfirmedEmail"
        class="secondary-btn max-w-sm"
        @click="cancel"
      >
        Cancel update
      </div>
    </div>
    <div v-if="message" class="text-center font-bold text-secondary mt-5">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const response = await $axios.get('v1/user')
    const email = response.data.user.email
    const unconfirmedEmail = response.data.user.unconfirmed_email
    return { email, unconfirmedEmail }
  },
  data() {
    return {
      genericError: 'Server error, please try again later',
      message: null,
    }
  },
  head: {
    title: 'Confirm Your Account',
    meta: [
      {
        hid: 'sleep-rescue-account-confirmation',
        name: 'Confirm Your Sleep Rescue Account',
        content: 'Account confirmation page for SleepRescue.org',
      },
    ],
  },
  methods: {
    async sendEmail() {
      try {
        const response = await this.$axios.get('v1/confirmation/resend')
        this.message = response?.data?.message ?? this.genericError
      } catch (error) {
        this.message = this.genericError
      }
    },
    async cancel() {
      try {
        await this.$axios.get('v1/user/reset')
        await this.$auth.logout()
      } catch (_error) {
        this.message = this.genericError
      }
    },
  },
}
</script>

<style scoped>
.attention {
  @apply font-bold text-secondary;
}
</style>
