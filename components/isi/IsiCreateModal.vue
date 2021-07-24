<template>
  <Modal modal-width="" class="pb-2" @toggleModal="toggleIsiCreateModal">
    <h1 class="title-text text-center mt-2 mb-2">Survey</h1>
    <p class="text-secondary text-center mb-5">
      Base your answers on
      <span class="underline">the last 2 weeks</span>
    </p>
    <form
      action=""
      name="create-isi"
      method="post"
      class="ml-auto mr-auto w-full"
      @submit.prevent="createIsi"
    >
      <div class="question-group">
        <h3 class="group-title">
          On the scale from 0-4, rate the severity of the following problems:
        </h3>
        <div class="question-cell">
          <div class="question-text">Fall asleep</div>
          <span class="dropdown-selector arrow-selector">
            <select v-model="fallingAsleep" class="select-round">
              <option value="0">0 (None)</option>
              <option value="1">1 (Mild)</option>
              <option value="2">2 (Moderate)</option>
              <option value="3">3 (Severe)</option>
              <option value="4">4 (Very severe)</option>
            </select>
          </span>
        </div>
        <div class="question-cell">
          <div class="question-text">Staying asleep</div>
          <span class="dropdown-selector arrow-selector">
            <select v-model="stayingAsleep" class="select-round">
              <option value="0">0 (None)</option>
              <option value="1">1 (Mild)</option>
              <option value="2">2 (Moderate)</option>
              <option value="3">3 (Severe)</option>
              <option value="4">4 (Very severe)</option>
            </select>
          </span>
        </div>
        <div class="question-cell">
          <div class="question-text">Waking up too early</div>
          <span class="dropdown-selector arrow-selector text-xs">
            <select v-model="earlyWakeUp" class="select-round">
              <option value="0">0 (None)</option>
              <option value="1">1 (Mild)</option>
              <option value="2">2 (Moderate)</option>
              <option value="3">3 (Severe)</option>
              <option value="4">4 (Very severe)</option>
            </select>
          </span>
        </div>
      </div>
      <div class="question-group">
        <h3 class="group-title mt-5">Answer the following questions:</h3>
        <div class="question-cell">
          <div class="question-text">
            How satisfied are you with your sleep pattern?
          </div>
          <span class="dropdown-selector arrow-selector">
            <select v-model="sleepPattern" class="select-round">
              <option value="0">Very satisfied</option>
              <option value="1">Satisfied</option>
              <option value="2">Moderately satisfied</option>
              <option value="3">Dissatisfied</option>
              <option value="4">Very dissatisfied</option>
            </select>
          </span>
        </div>
        <div class="question-cell">
          <div class="question-text">
            How noticeable to others do you think your sleep problem is?
          </div>
          <span class="dropdown-selector arrow-selector">
            <select v-model="noticeable" class="select-round">
              <option value="0">Not at all</option>
              <option value="1">A little</option>
              <option value="2">Somewhat</option>
              <option value="3">Noticeable</option>
              <option value="4">Very much</option>
            </select>
          </span>
        </div>
        <div class="question-cell">
          <div class="question-text">
            How worried are you about your sleep problems?
          </div>
          <span class="dropdown-selector arrow-selector">
            <select v-model="worried" class="select-round">
              <option value="0">Not at all</option>
              <option value="1">A little</option>
              <option value="2">Somewhat</option>
              <option value="3">Worried</option>
              <option value="4">Very worried</option>
            </select>
          </span>
        </div>
        <div class="question-cell">
          <div class="question-text">
            To what extend do you believe your sleep problem interferes with
            your life?
          </div>
          <span class="dropdown-selector arrow-selector">
            <select v-model="interference" class="select-round">
              <option value="0">Not at all</option>
              <option value="1">A little</option>
              <option value="2">Somewhat</option>
              <option value="3">Worried</option>
              <option value="4">Very much</option>
            </select>
          </span>
        </div>
      </div>
      <div class="w-full text-center">
        <input
          class="action-btn w-28"
          type="submit"
          name="submit-thought"
          :value="buttonLabel"
          :class="isLoading ? 'animate-pulse' : ''"
        />
      </div>
    </form>
    <div
      v-if="success"
      class="text-center text-supplementary font-bold mt-2 p-2"
    >
      <font-awesome-icon :icon="['fa', 'check-circle']" />
      Success!
    </div>
    <div
      v-if="error"
      class="text-center bg-secondary text-dark font-bold mt-2 p-2"
    >
      <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
      Submission failed, try again later
    </div>
  </Modal>
</template>

<script>
import { mapMutations } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      fallingAsleep: '0',
      stayingAsleep: '0',
      earlyWakeUp: '0',
      sleepPattern: '0',
      noticeable: '0',
      worried: '0',
      interference: '0',
      isLoading: false,
      error: false,
      success: false,
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Submit'
    },
  },
  methods: {
    ...mapMutations(['toggleIsiCreateModal']),
    async createIsi() {
      this.$ga.event({
        eventCategory: 'product_use',
        eventLabel: 'isi_entered',
        eventAction: 'method',
        eventValue: 1,
      })
      try {
        this.isLoading = true
        await this.$axios.patch('v1/isi', {
          falling_asleep: parseInt(this.fallingAsleep),
          staying_asleep: parseInt(this.stayingAsleep),
          early_wake_up: parseInt(this.earlyWakeUp),
          sleep_pattern: parseInt(this.sleepPattern),
          noticeable: parseInt(this.noticeable),
          worried: parseInt(this.worried),
          interference: parseInt(this.interference),
        })
        this.$emit('dataUpdated')
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 3000)
      } catch (e) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.question-group {
  @apply pr-2 pl-2;
}
.group-title {
  @apply text-center italic text-sm text-white mb-1;
}
.question-cell {
  @apply flex flex-row items-center justify-between text-white text-xs;
}
.question-text {
  @apply text-left;
  max-width: 150px;
}
</style>
