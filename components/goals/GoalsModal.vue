<template>
  <Modal modal-width="" @toggleModal="toggleWithUpdate">
    <h1 class="title-text text-center mt-8 mb-8">Create a new goal</h1>
    <form
      action=""
      name="create-goal"
      method="post"
      class="ml-auto mr-auto w-full"
      @submit.prevent="createGoal"
    >
      <div class="goal-setting">
        <p class="specification">I want my average...</p>
        <span class="dropdown-selector arrow-selector drop-select">
          <select v-model="metricSelection" class="selection-value">
            <option value="0">Sleep duration</option>
            <option value="1">Time to fall asleep</option>
            <option value="2">Time awake at night</option>
            <option value="3">Sleep efficiency</option>
            <option value="4">Sleep rating</option>
          </select>
        </span>
      </div>
      <div class="goal-setting">
        <p class="specification">Over the past...</p>
        <span class="dropdown-selector arrow-selector drop-select">
          <select v-model="durationSelection" class="selection-value">
            <option value="0">1 week</option>
            <option value="1">2 weeks</option>
            <option value="2">1 month</option>
            <option value="3">3 months</option>
            <option value="4">6 months</option>
          </select>
        </span>
      </div>
      <div class="goal-setting">
        <p>
          To be <u>{{ greaterOrLess }}</u
          >...
        </p>
      </div>
      <div class="goal-setting">
        <p class="specification">Than...</p>
        <span class="dropdown-selector arrow-selector drop-select">
          <select
            v-if="metricSelection == '0'"
            v-model="sleepThreshold"
            class="selection-value"
          >
            <option value="0">5.5 hours</option>
            <option value="1">6.0 hours</option>
            <option value="2">6.5 hours</option>
            <option value="3">7.0 hours</option>
            <option value="4">7.5 hours</option>
          </select>
          <select
            v-if="metricSelection == '1'"
            v-model="fallingAsleepThreshold"
            class="selection-value"
          >
            <option value="0">30 mins</option>
            <option value="1">45 mins</option>
            <option value="2">60 mins</option>
            <option value="3">75 mins</option>
          </select>
          <select
            v-if="metricSelection == '2'"
            v-model="awakeAtNightThreshold"
            class="selection-value"
          >
            <option value="0">30 mins</option>
            <option value="1">45 mins</option>
            <option value="2">60 mins</option>
            <option value="3">75 mins</option>
          </select>
          <select
            v-if="metricSelection == '3'"
            v-model="efficiencyThreshold"
            class="selection-value"
          >
            <option value="0">75%</option>
            <option value="1">80%</option>
            <option value="2">85%</option>
            <option value="3">90%</option>
          </select>
          <select
            v-if="metricSelection == '4'"
            v-model="ratingThreshold"
            class="selection-value"
          >
            <option value="0">50%</option>
            <option value="1">60%</option>
            <option value="2">70%</option>
            <option value="3">80%</option>
          </select>
        </span>
      </div>
      <div v-if="goalIsDuplicated" class="font-bold text-center text-secondary">
        Oops, it looks like you have already created this goal!
      </div>
      <div v-if="!goalIsDuplicated" class="w-full text-center mt-5">
        <input
          class="action-btn w-28"
          type="submit"
          name="submit-goal"
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
      Success!
    </div>
    <div
      v-if="error"
      class="text-center bg-secondary text-dark font-bold mt-5 p-2"
    >
      <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
      Submission failed, try again later
    </div>
  </Modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  props: {
    existingGoals: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      error: false,
      success: false,
      isLoading: false,
      metricSelection: '0',
      durationSelection: '0',
      sleepThreshold: '0',
      fallingAsleepThreshold: '0',
      awakeAtNightThreshold: '0',
      efficiencyThreshold: '0',
      ratingThreshold: '0',
    }
  },
  computed: {
    ...mapState(['showGoalsModal']),
    greaterOrLess() {
      return ['0', '3', '4'].includes(this.metricSelection) ? 'greater' : 'less'
    },
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Submit'
    },
    metricName() {
      switch (this.metricSelection) {
        case '0':
          return 'Sleep duration'
        case '1':
          return 'Time to fall asleep'
        case '2':
          return 'Time awake at night'
        case '3':
          return 'Efficiency'
        case '4':
          return 'Rating'
        default:
          return 'Unknown'
      }
    },
    durationValue() {
      switch (this.durationSelection) {
        case '0':
          return 7 // '1 week'
        case '1':
          return 14 // '2 weeks'
        case '2':
          return 30 // '1 month'
        case '3':
          return 90 // '3 months'
        case '4':
          return 180 // '6 months'
        default:
          return 999 // 'unknown'
      }
    },
    sleepThresholdName() {
      switch (this.sleepThreshold) {
        case '0':
          return 5.5
        case '1':
          return 6.0
        case '2':
          return 6.5
        case '3':
          return 7.0
        case '4':
          return 7.5
        default:
          return 0
      }
    },
    fallingAsleepThresholdName() {
      switch (this.fallingAsleepThreshold) {
        case '0':
          return 30
        case '1':
          return 45
        case '2':
          return 60
        case '3':
          return 75
        default:
          return 0
      }
    },
    awakeAtNightThresholdName() {
      switch (this.awakeAtNightThreshold) {
        case '0':
          return 30
        case '1':
          return 45
        case '2':
          return 60
        case '3':
          return 75
        default:
          return 0
      }
    },
    efficiencyThresholdName() {
      switch (this.efficiencyThreshold) {
        case '0':
          return 0.75
        case '1':
          return 0.8
        case '2':
          return 0.85
        case '3':
          return 0.9
        default:
          return 0
      }
    },
    ratingThresholdName() {
      switch (this.ratingThreshold) {
        case '0':
          return 0.5
        case '1':
          return 0.6
        case '2':
          return 0.7
        case '3':
          return 0.8
        default:
          return 0
      }
    },
    thresholdName() {
      switch (this.metricSelection) {
        case '0':
          return this.sleepThresholdName
        case '1':
          return this.fallingAsleepThresholdName
        case '2':
          return this.awakeAtNightThresholdName
        case '3':
          return this.efficiencyThresholdName
        case '4':
          return this.ratingThresholdName
        default:
          return 0
      }
    },
    constructedGoal() {
      return {
        metric: this.metricName,
        duration: this.durationValue,
        threshold: this.thresholdName,
      }
    },
    goalIsDuplicated() {
      return this.existingGoals.some(
        (g) =>
          g.metric === this.constructedGoal.metric &&
          g.duration === this.constructedGoal.duration
      )
    },
  },
  methods: {
    ...mapMutations(['toggleGoalsModal']),
    toggleWithUpdate() {
      if (this.showGoalsModal) {
        this.$emit('dataUpdated')
      }
      this.toggleGoalsModal()
    },
    async createGoal() {
      try {
        this.isLoading = true
        await this.$axios.post('v1/goal', this.constructedGoal)
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
.goal-setting {
  @apply text-white flex flex-row pl-2 pr-2 items-center;
}
.specification {
  @apply w-full;
}
.drop-select {
  @apply w-80;
}
</style>
