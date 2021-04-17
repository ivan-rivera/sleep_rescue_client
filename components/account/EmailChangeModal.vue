<template>
  <Modal modal-width="max-w-md" :click-fn="toggleEmailChangeModal">
    <section>
      <h1 class="title-text text-center mb-8 mt-8">Change Email</h1>
      <div v-if="error" class="error-message mb-5">
        <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
        {{ error }}
      </div>
      <form
        action=""
        name="email-change"
        method="post"
        class="form-entry"
        @submit="changeEmail"
      >
        <!-- PASSWORD -->
        <label for="email-change-p1"><strong>Password</strong></label>
        <input
          id="email-change-p1"
          v-model="form.user.password"
          type="password"
          class="form-input-alternative"
          required
          pattern="\w{8,}"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Must contain at least 8 alphanumeric characters')"
        />
        <!-- NEW EMAIL -->
        <label for="email-change-p2"><strong>New Email</strong></label>
        <input
          id="email-change-p2"
          v-model="form.user.email"
          type="email"
          class="form-input-alternative"
          required
          :pattern="emailPattern"
          oninput="setCustomValidity('')"
          oninvalid="setCustomValidity('Please enter a valid email address')"
        />
        <div class="mb-8" />
        <input
          class="dark-btn w-full"
          type="submit"
          name="change-email"
          :value="buttonLabel"
        />
      </form>
      <div v-if="success" class="text-center font-bold mt-8">
        <font-awesome-icon :icon="['fa', 'check-circle']" />
        Success!
      </div>
      <div class="m-8" />
    </section>
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
      error: null,
      success: null,
      isLoading: false,
      form: {
        user: {
          password: null,
          email: null,
        },
      },
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Change'
    },
  },
  methods: {
    ...mapMutations(['toggleEmailChangeModal']),
    markSuccess() {
      this.success = true
      setTimeout(() => {
        this.success = null
      }, 3000)
    },
    changeEmail() {
      // TODO: check current password
      // TODO: check that email is not already taken
      // TODO: check for server errors
      this.markSuccess()
      console.log('...')
    },
  },
}
</script>
