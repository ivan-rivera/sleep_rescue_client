<template>
  <div class="welcome-page">
    <div class="visible-content">
      <div class="hero-content">
        <!-- left/top: text and cards -->
        <section>
          <div class="heading-top text-center">SleepRescue.org</div>
          <div class="heading-sub text-center">
            Let's get your sleep back on track
          </div>
          <div class="hero-text">
            Sleep is not a privilege, yet so many of us are struggling with
            insomnia. Sleep Rescue offers resources for self-guided Cognitive
            Behavioural Therapy for insomnia.
          </div>
        </section>
        <section class="welcome-cards">
          <HeroCard
            text="Learn to use CBT-i"
            card-type="card-group-secondary"
            img-path="images/cbti_book.svg"
          />
          <HeroCard
            text="Track your progress"
            card-type="card-group-primary"
            img-path="images/track_progress.svg"
          />
          <HeroCard
            text="Improve your sleep"
            card-type="card-group-secondary"
            img-path="images/improve_sleep.svg"
          />
        </section>
      </div>
      <div class="signup-card card-background">
        <section class="signup-text">
          <div class="signup-header">Sign Up For Free</div>
          <div class="signup-subheader">Your recovery begins today</div>
        </section>
        <form
          action=""
          name="signup"
          method="post"
          class="form-entry"
          @submit="registerUser"
        >
          <FormEntry icon="at">
            <input
              v-model="registration.user.email"
              type="text"
              placeholder="Email..."
              class="form-input"
              required
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              v-model="registration.user.password"
              type="password"
              placeholder="Password..."
              class="form-input"
              required
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              v-model="registration.user.password_confirmation"
              type="password"
              placeholder="Repeat password..."
              class="form-input"
              required
            />
          </FormEntry>
          <input
            class="action-btn"
            type="submit"
            name="sign up"
            value="Continue"
          />
        </form>
        <section class="existing-users">
          <div>
            Already have an account?
            <span class="existing-user-option" @click="toggleSignInModal"
              ><u><strong>Sign in</strong></u></span
            >
          </div>
          <div>
            Forgot your password?
            <span class="existing-user-option" @click="toggleResetModal"
              ><u><strong>Reset here</strong></u></span
            >
          </div>
        </section>
        <div class="signup-divider" />
        <div class="signup-disclaimer">
          By signing up, you confirm that you agree to our
          <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>
        </div>
      </div>
    </div>
    <p class="disclaimer-text">
      This website was was created by CBT-i practitioners, not by medical
      professionals, check with your doctor if CBT-i is right for you
    </p>
    <!-- Revealable content -->
    <Modal
      v-if="showSignInModal"
      :click-fn="toggleSignInModal"
      modal-width="max-w-md"
    >
      <SigninModal />
    </Modal>
    <Modal
      v-if="showResetModal"
      :click-fn="toggleResetModal"
      modal-width="max-w-md"
    >
      <ResetModal />
    </Modal>
    <CookiesNotice />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'
import { minLength, sameAs, email, required } from 'vuelidate/lib/validators'
import HeroCard from '~/components/signup/HeroCard'
import SigninModal from '~/components/signup/SigninModal'
import ResetModal from '~/components/signup/ResetModal'
import FormEntry from '~/components/layout/FormEntry'
import Modal from '~/components/layout/Modal'
import CookiesNotice from '~/components/signup/CookiesNotice'
export default {
  auth: false,
  components: {
    CookiesNotice,
    HeroCard,
    FormEntry,
    Modal,
    ResetModal,
    SigninModal,
  },
  data() {
    return {
      registration: {
        user: {
          email: null,
          password: null,
          password_confirmation: null,
        },
      },
    }
  },
  validations: {
    registration: {
      user: {
        email: {
          email,
        },
        password: {
          minLength: minLength(8),
          required,
        },
        password_confirmation: {
          sameAsPassword: sameAs('password'),
        },
      },
    },
  },
  head: {
    title: 'Signup',
    meta: [
      {
        hid: 'signup-description',
        name: 'SleepRescue signup',
        content:
          'Sign up for SleepRescue.org and start fixing your insomnia today',
      },
    ],
  },
  computed: {
    showSignInModal() {
      return this.$store.state.showSignInModal
    },
    showResetModal() {
      return this.$store.state.showResetModal
    },
  },
  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$auth.redirect('home')
    } else {
      this.$store.commit('clearSignUpState')
    }
  },
  methods: {
    ...mapMutations({
      setError: 'setError',
      toggleSignInModal: 'toggleSignInModal',
      toggleResetModal: 'toggleResetModal',
    }),
    async registerUser(event) {
      event.preventDefault()
      this.$v.$touch()
      const valid = _.every(
        ['email', 'password', 'password_confirmation'],
        (v) => !this.$v.registration.user[v].$invalid
      )
      if (valid) {
        try {
          await this.$axios.post('registration', this.registration)
          await this.$auth.loginWith('local', { data: this.registration })
          this.$auth.redirect('home')
        } catch (error) {
          this.$store.commit('setError', error.response.data.error.message)
        }
      } else {
        this.$store.commit(
          'setError',
          'You need to give us a valid email address and 2 identical passwords with at least 8 characters'
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.welcome-page {
  @apply relative flex flex-col justify-between;
}

.visible-content {
  @apply flex flex-col justify-between items-center ml-auto mr-auto lg:ml-0 lg:mr-0;
  @screen lg {
    @apply flex-row items-baseline;
  }
  @screen xl {
    @apply items-start;
  }
}

.hero-content {
  @apply flex flex-col justify-between;
  @apply max-w-md;
  @apply mb-5;
}

.hero-text {
  @apply text-center text-base xl:text-xl;
  @apply mt-3 mb-3;
}

.disclaimer-text {
  @apply text-center text-xs 2xl:text-sm;
  @apply pb-5 pt-5 2xl:pt-16 3xl:pb-16;
}

.signup-disclaimer {
  @apply text-center;
  @apply pb-5 ml-5 mr-5;
}

.welcome-cards {
  @apply flex flex-row justify-between;
  @apply max-w-xs;
}

.signup-card {
  @apply text-dark;
  @apply rounded-xl;
  @apply flex flex-col justify-between;
  @apply max-w-lg 2xl:max-w-xl;
  @apply p-1.5 lg:pl-16 lg:pr-16;
}

.signup-text {
  @apply pb-5;
}

.signup-header {
  @apply text-center font-bold text-3xl;
  @apply pb-2.5;
}

.signup-subheader {
  @apply text-center;
}

.signup-divider {
  @apply self-center;
  @apply mb-5;
  @apply w-56;
  @apply rounded;
  @apply border-4 border-primary;
}

.existing-users {
  @apply text-center;
  @apply mb-2.5;
}

.existing-user-option {
  @apply transition duration-150;
  @apply hover:text-white;
  @apply cursor-pointer;
}
</style>
