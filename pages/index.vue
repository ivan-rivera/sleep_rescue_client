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
          @submit.prevent="registerUser"
        >
          <FormEntry icon="at">
            <input
              v-model="registration.user.email"
              type="text"
              placeholder="Email..."
              class="form-input"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Please provide a valid email address')"
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              v-model="registration.user.password"
              type="password"
              placeholder="Password..."
              class="form-input"
              required
              minlength="8"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Your password must contain at least 8 characters')"
            />
          </FormEntry>
          <FormEntry icon="key">
            <input
              id="password_confirmation"
              ref="password_confirmation"
              v-model="registration.user.password_confirmation"
              type="password"
              placeholder="Repeat password..."
              class="form-input"
              oninput="setCustomValidity('')"
              required
              @change="checkPasswordEquality"
            />
          </FormEntry>
          <input
            class="dark-btn"
            type="submit"
            name="sign up"
            :value="buttonLabel"
            :class="isLoading ? 'animate-pulse' : ''"
          />
        </form>
        <section class="existing-users">
          <div>
            Already have an account?
            <span class="highlight-text-white" @click="toggleSignInModal"
              ><u><strong>Sign in</strong></u></span
            >
          </div>
        </section>
        <div class="line-divider" />
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
    <SigninModal
      v-if="showSignInModal"
      :click-fn="toggleSignInModal"
      modal-width="max-w-md"
    />
    <CookiesNotice />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { minLength, sameAs, email, required } from 'vuelidate/lib/validators'
import HeroCard from '~/components/signup/HeroCard'
import SigninModal from '~/components/signup/SigninModal'
import FormEntry from '~/components/layout/FormEntry'
import CookiesNotice from '~/components/signup/CookiesNotice'
export default {
  auth: false,
  components: {
    CookiesNotice,
    HeroCard,
    FormEntry,
    SigninModal,
  },
  data() {
    return {
      isLoading: false,
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
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Continue'
    },
    showSignInModal() {
      return this.$store.state.showSignInModal
    },
    passwordsMatch() {
      const form = this.registration.user
      return form.password === form.password_confirmation
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
    }),
    async registerUser() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.flashError(
          'Please provide a valid email with matching passwords containing at least 8 alphanumeric characters'
        )
      } else {
        try {
          this.isLoading = true
          await this.$axios.post('registration', this.registration)
          await this.$auth.loginWith('local', { data: this.registration })
          this.$auth.redirect('home')
        } catch (error) {
          if (error.name === 'NetworkError') {
            this.flashError('Our server seems to be down :(')
          } else {
            this.flashError(error.response.data.error.message)
          }
        } finally {
          this.isLoading = false
        }
      }
    },
    checkPasswordEquality() {
      const validity = this.passwordsMatch ? '' : 'passwords do not match'
      this.$refs.password_confirmation.setCustomValidity(validity)
    },
    flashError(message) {
      this.$store.commit('setError', message)
      setTimeout(() => {
        this.$store.commit('setError', null)
      }, 5000)
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
  @apply flex flex-col justify-between items-center;
  @apply max-w-lg 2xl:max-w-xl;
  @apply p-1.5 pt-10 pb-10 lg:pl-16 lg:pr-16;
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

.existing-users {
  @apply text-center;
  @apply mb-2.5 mt-2.5;
}
</style>
