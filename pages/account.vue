<template>
  <div>
    <h1 class="heading-top text-center mb-10">My Account</h1>
    <div class="flex flex-row space-between">
      <div
        class="flex flex-col border-2 border-white rounded-3xl p-5 ml-auto mr-auto lg:mr-0 lg:ml-0"
      >
        <div class="pt-5 pb-5 pl-1 pr-1 text-white text-center">
          <h2 class="title-text text-center pb-2.5">About you</h2>
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
        <div class="w-64 mt-5">
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
      <img
        src="images/profile.svg"
        alt="account"
        class="ml-auto hidden transform lg:block lg:scale-75 xl:scale-100"
      />
    </div>
    <PasswordChangeModal v-if="showPasswordChangeModal" />
    <EmailChangeModal v-if="showEmailChangeModal" />
    <AccountDeletionModal v-if="showAccountDeletionModal" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import PasswordChangeModal from '~/components/account/PasswordChangeModal'
import EmailChangeModal from '~/components/account/EmailChangeModal'
import AccountDeletionModal from '~/components/account/AccountDeletionModal'
export default {
  components: { PasswordChangeModal, EmailChangeModal, AccountDeletionModal },
  async asyncData({ $axios }) {
    const response = await $axios.$get('v1/user')
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
