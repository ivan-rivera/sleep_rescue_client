<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">Contact Us</h1>
    <p class="text-center mb-10">
      If you have any comments, suggestions or if you'd just like to chat, then
      use the below form to send us a message
    </p>
    <form
      action=""
      name="contact"
      method="post"
      class="ml-auto mr-auto max-w-3xl flex flex-col items-center"
      @submit.prevent="sendForm"
    >
      <textarea
        id="contact-text"
        v-model="contactText"
        class="contact-text-form"
        name="contact-text"
        minlength="20"
        cols=""
        rows=""
        oninput="setCustomValidity('')"
        oninvalid="setCustomValidity('A thought must be at least 20 characters long')"
      ></textarea>
      <div class="flex flex-row justify-between w-full">
        <NuxtLink :to="homePath">
          <div class="action-btn w-28 !bg-white font-bold">Back</div>
        </NuxtLink>
        <input
          class="action-btn w-28"
          type="submit"
          name="submit-contact"
          :value="buttonLabel"
          :class="isLoading ? 'animate-pulse' : ''"
        />
      </div>
    </form>
    <div
      v-if="success"
      class="text-center text-supplementary font-bold mt-5 p-2"
    >
      <font-awesome-icon :icon="['fa', 'check-circle']" />
      Message sent!
    </div>
    <div v-if="error" class="text-center text-secondary font-bold mt-5 p-2">
      <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
      Submission failed, try again later
    </div>
  </div>
</template>

<script>
import { HOME_PATH } from 'assets/js/constants'
export default {
  auth: false,
  data() {
    return {
      homePath: HOME_PATH,
      error: false,
      success: false,
      isLoading: false,
      contactText: null,
    }
  },
  head: {
    title: 'Contact Us',
    meta: [
      {
        hid: 'sleep-rescue-contact',
        name: 'description',
        content: 'description',
      },
      { charset: 'utf-8' },
    ],
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Submit'
    },
  },
  methods: {
    async sendForm() {
      try {
        this.isLoading = true
        await this.$axios.post('v1/contact', {
          user: this.$nuxt.$auth.loggedIn ? this.$nuxt.$auth.user.email : null,
          text: this.contactText,
        })
        this.contactText = null
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 5000)
      } catch (e) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 5000)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.contact-text-form {
  @apply ml-auto mr-auto w-full rounded-t-2xl rounded-bl-2xl bg-primary p-2 text-white;
  min-height: 150px;
}
</style>
