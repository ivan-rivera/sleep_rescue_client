<template>
  <Modal modal-width="" @toggleModal="toggleState">
    <form
      action=""
      name="nightSubmission"
      method="post"
      @submit.prevent="submitNight"
    >
      <h1 class="title-text text-center mt-2">Record a Night</h1>
      <no-ssr v-if="!pickMade">
        <p class="text-white text-center text-xs pt-5 pb-5">
          Select the date of the night you slept. If you went to bed after
          midnight, then select the previous date.
        </p>
        <DatePicker
          v-model="pickedDate"
          :inline="true"
          :monday-first="true"
          :disabled-dates="{ from: yesterday }"
          @selected="pickToggle"
        />
      </no-ssr>
      <div v-if="pickMade" class="text-white text-center pb-2">
        <div class="font-bold text-white pt-2 pb-2">
          Night of the {{ pickedDate.toISOString().split('T')[0] }}
        </div>
        <div class="border-t-2 border-white w-full" />
        <div class="back-btn" @click="pickToggle">
          <font-awesome-icon :icon="['fa', 'chevron-left']" />
          Go back
        </div>
        <div class="question-table text-xs">
          <p class="question-text">Did you sleep last night?</p>
          <span class="dropdown-selector arrow-selector">
            <select v-model="sleptLastNight" class="select-round">
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
          </span>
          <p class="question-text">What time did you start trying to sleep?</p>
          <TimePicker
            v-model="tryingToSleepTime"
            format="hh:mm A"
            :minute-interval="15"
            :disabled="!sleptBool"
            hide-clear-button
            manual-input
            hide-dropdown
            fixed-dropdown-button
          />
          <p class="question-text">
            How long did it take you to fall asleep? (in mins.)
          </p>
          <span class="dropdown-selector">
            <input
              v-model="timeToFallAsleep"
              :disabled="!sleptBool"
              type="number"
              min="0"
              max="500"
              class="number-selector"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Must be between 0-500')"
            />
          </span>
          <p class="question-text">
            How long did your night awakenings last? (in mins.)
          </p>
          <span class="dropdown-selector">
            <input
              v-model="midNightAwakenings"
              :disabled="!sleptBool"
              type="number"
              min="0"
              max="500"
              class="number-selector"
              oninput="setCustomValidity('')"
              oninvalid="setCustomValidity('Must be between 0-500')"
            />
          </span>
          <p class="question-text">When was your final awakening?</p>
          <TimePicker
            v-model="awakeTime"
            format="hh:mm A"
            :disabled="!sleptBool"
            :minute-interval="15"
            hide-clear-button
            manual-input
            hide-dropdown
            fixed-dropdown-button
          />
          <p class="question-text">When did you get out of bed?</p>
          <TimePicker
            v-model="outOfBedTime"
            format="hh:mm A"
            :disabled="!sleptBool"
            :minute-interval="15"
            hide-clear-button
            manual-input
            hide-dropdown
            fixed-dropdown-button
          />
          <p class="question-text">How would you rate the night?</p>
          <span class="dropdown-selector arrow-selector">
            <select
              v-model="rating"
              class="select-round"
              :disabled="!sleptBool"
            >
              <option value="0">1 (Bad)</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="4">5</option>
              <option value="5">6</option>
              <option value="6">7</option>
              <option value="7">8</option>
              <option value="8">9</option>
              <option value="9">10 (Great)</option>
            </select>
          </span>
        </div>
        <div class="w-full border-b-2 border-white pt-5"></div>
        <div class="w-full flex justify-between pt-4">
          <div v-if="inputsAreValid" class="self-center pl-5">
            <div v-if="sleptBool" class="text-right text-xs">
              <p>Hours slept: {{ hoursAsleep }} hrs, {{ minsAsleep }} mins.</p>
              <p>Hours in bed: {{ hoursInBed }} hrs, {{ minsInBed }} mins.</p>
              <p>Sleep efficiency: {{ Math.round(efficiency * 100) }}%</p>
            </div>
            <div v-if="!sleptBool" class="text-xs font-bold text-supplementary">
              <p>Ouch! ...This will be recorded as a sleepless night</p>
            </div>
          </div>
          <div
            v-if="!inputsAreValid"
            class="text-xs font-bold text-secondary self-center text-center w-full"
          >
            <p>Error: please check your inputs</p>
          </div>
          <input
            class="action-btn w-28 mr-1"
            type="submit"
            name="submitNight"
            :value="buttonLabel"
            :class="isLoading ? 'animate-pulse' : ''"
            :hidden="!inputsAreValid"
          />
        </div>
        <div
          v-if="error"
          class="text-center bg-secondary text-dark font-bold mt-2 p-1"
        >
          <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
          Submission failed, please try again later
        </div>
        <div
          v-if="success"
          class="text-center text-supplementary font-bold mt-2 p-1"
        >
          <font-awesome-icon :icon="['fa', 'check-circle']" />
          Success!
        </div>
      </div>
    </form>
  </Modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  components: { Modal },
  data() {
    return {
      isLoading: false,
      pickedDate: null,
      success: false,
      error: false,
      rating: '4',
      sleptLastNight: '0',
      timeToFallAsleep: 15,
      midNightAwakenings: 15,
      tryingToSleepTime: {
        hh: '10',
        mm: '00',
        A: 'PM',
      },
      awakeTime: {
        hh: '07',
        mm: '00',
        A: 'AM',
      },
      outOfBedTime: {
        hh: '07',
        mm: '15',
        A: 'AM',
      },
      pickMade: false,
    }
  },
  computed: {
    yesterday() {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return new Date(yesterday)
    },
    inputsAreValid() {
      return this.efficiency > 0 && this.upDateTime >= this.awakeDateTime
    },
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Submit'
    },
    sleptBool() {
      return this.sleptLastNight === '0'
    },
    sleepDate() {
      return this.tryingToSleepTime.A === 'PM'
        ? this.pickedDate
        : this.addDays(this.pickedDate, 1)
    },
    sleepDateTime() {
      return this.constructDate(this.sleepDate, this.tryingToSleepTime)
    },
    wakeupDate() {
      return this.addDays(this.pickedDate, 1)
    },
    awakeDateTime() {
      return this.constructDate(this.wakeupDate, this.awakeTime)
    },
    upDateTime() {
      return this.constructDate(this.wakeupDate, this.outOfBedTime)
    },
    morningMinsInBed() {
      return this.getDateDiffInMins(this.upDateTime, this.awakeDateTime)
    },
    totalMinsAwake() {
      return (
        parseInt(this.timeToFallAsleep) +
        parseInt(this.midNightAwakenings) +
        this.morningMinsInBed
      )
    },
    totalMinsInBed() {
      return this.getDateDiffInMins(this.upDateTime, this.sleepDateTime)
    },
    hoursInBed() {
      return Math.floor(this.totalMinsInBed / 60)
    },
    minsInBed() {
      return Math.round((this.totalMinsInBed / 60 - this.hoursInBed) * 60)
    },
    totalMinsAsleep() {
      return this.totalMinsInBed - this.totalMinsAwake
    },
    hoursAsleep() {
      return Math.floor(this.totalMinsAsleep / 60)
    },
    minsAsleep() {
      return Math.round((this.totalMinsAsleep / 60 - this.hoursAsleep) * 60)
    },
    efficiency() {
      return this.totalMinsAsleep / this.totalMinsInBed
    },
  },
  methods: {
    ...mapMutations(['toggleNightFormModal']),
    ...mapState(['showNightFormModal']),
    toggleState() {
      if (this.showNightFormModal) {
        this.$emit('closingNightModal')
      }
      this.toggleNightFormModal()
    },
    async submitNight() {
      this.$ga.event({
        eventCategory: 'product_use',
        eventLabel: 'night_entered',
        eventAction: 'method',
        eventValue: 1,
      })
      if (this.inputsAreValid) {
        try {
          this.isLoading = true
          const date = this.pickedDate.toISOString().split('T')[0]
          const night = {
            slept: this.sleptLastNight === '0',
            sleep_attempt_timestamp: this.sleepDateTime.getTime() / 1000,
            falling_asleep_duration: this.timeToFallAsleep,
            night_awakenings_duration: this.midNightAwakenings,
            final_awakening_timestamp: this.awakeDateTime.getTime() / 1000,
            up_timestamp: this.upDateTime.getTime() / 1000,
            rating: parseInt(this.rating) + 1,
          }
          await this.$axios.patch('v1/night', {
            date,
            night,
          })
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 3000)
        } catch (error) {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 3000)
        } finally {
          this.isLoading = false
        }
      }
    },
    pickToggle() {
      this.pickMade = !this.pickMade
    },
    addMins(baseDate, minutes) {
      return new Date(baseDate.getTime() + minutes * 60 * 1000)
    },
    addDays(baseDate, days) {
      return this.addMins(baseDate, days * 24 * 60)
    },
    getDateDiffInMins(laterDate, earlierDate) {
      const scale = 60 * 1000
      const timeDiff = laterDate.getTime() - earlierDate.getTime()
      return timeDiff / scale
    },
    constructDate(date, time) {
      const cleanDate = date.toISOString().split('T')[0].replaceAll('-', '/')
      const timestamp = `${time.hh}:${time.mm} ${time.A}`
      const rawDateTime = new Date(`${cleanDate} ${timestamp}`)
      return new Date(
        rawDateTime.getTime() - rawDateTime.getTimezoneOffset() * 60000
      )
    },
  },
}
</script>

<style>
.question-table {
  @apply items-center;
  display: grid;
  grid-template-columns: 4fr 6rem;
  grid-column-gap: 10px;
}
.question-text {
  @apply flex-grow text-right;
}
.back-btn {
  @apply text-center p-2.5
  hover:font-bold hover:text-secondary
  cursor-pointer;
}
.number-selector {
  width: 4.6rem;
  background-color: transparent;
  @apply relative pl-1 pr-1;
}
</style>
