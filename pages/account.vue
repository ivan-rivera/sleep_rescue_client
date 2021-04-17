<template>
  <div>
    <h1 class="heading-top text-right mb-10 pr-32">Your Account</h1>
    <div class="flex flex-row space-between">
      <div class="flex flex-col border-2 border-white rounded-3xl p-5">
        <div class="p-5 text-white text-center">
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
          </div>
        </div>
        <div class="w-72 mt-5">
          <div class="secondary-btn" @click="togglePasswordChangeModal">
            Change my password
          </div>
          <div class="secondary-btn" @click="toggleEmailChangeModal">
            Change my email
          </div>
          <div class="secondary-btn" @click="toggleAccountDeletionModal">
            Delete my account
          </div>
        </div>
      </div>
      <img src="images/profile.svg" alt="account" class="ml-auto" />
    </div>
    <PasswordChangeModal v-if="showPasswordChangeModal" />
    <EmailChangeModal v-if="showEmailChangeModal" />
    <AccountDeletionModal v-if="showAccountDeletionModal" />
  </div>
</template>

<script>
// TODO: make it responsive
// TODO: add email and deletion modals
// TODO: add sidebar
import { mapMutations, mapState } from 'vuex'
import PasswordChangeModal from '~/components/account/PasswordChangeModal'
import EmailChangeModal from '~/components/account/EmailChangeModal'
import AccountDeletionModal from '~/components/account/AccountDeletionModal'
export default {
  components: { PasswordChangeModal, EmailChangeModal, AccountDeletionModal },
  async asyncData({ $axios }) {
    const response = await $axios.$get('user')
    const email = response.user.email
    const dateJoined = new Date(response.user.inserted_at).toLocaleDateString()
    return { email, dateJoined }
  },
  data() {
    return {
      temp: {
        // todo: pull these from the backend via asyncData
        nightsRecorded: 30,
      },
      modal: {
        password: false,
        email: false,
        account: false,
      },
    }
  },
  computed: mapState([
    'showPasswordChangeModal',
    'showEmailChangeModal',
    'showAccountDeletionModal',
  ]),
  methods: mapMutations([
    'togglePasswordChangeModal',
    'toggleEmailChangeModal',
    'toggleAccountDeletionModal',
  ]),
}
</script>
