<template>
  <div>
    <h1 class="heading-top text-center mb-10">My Goals</h1>
    <div v-if="loading" class="text-xl text-center">Loading...</div>
    <div v-if="!loading">
      <p
        class="mb-5 text-xs text-center md:text-base md:mb-10 lg:text-xl max-w-5xl ml-auto mr-auto"
      >
        This is the space to set and track sleep goals. Make sure that you set
        realistic goals as, for example, your expected sleep duration will
        change with age.
      </p>
      <div v-if="goalsExist">
        <table class="goals-table">
          <tr>
            <th class="pl-0"></th>
            <th class="pl-2.5">My average</th>
            <th class="pl-1 lg:pl-10">Over last</th>
            <th class="pl-1 lg:pl-5 pr-1 lg:pr-5">Should be</th>
            <th class="pl-2.5 lg:pl-5"></th>
            <th class="pl-5 hidden sm:table-cell">Actual</th>
            <th class="pl-5 hidden sm:table-cell">Logged nights</th>
          </tr>
          <tr v-for="goal in goals" :key="goal.id">
            <td
              class="pl-0 text-center delete-goal"
              @click="toggleDeleteGoalModalWithId(goal.id)"
            >
              <font-awesome-icon :icon="['fa', 'trash-alt']" />
            </td>
            <td class="pl-2.5">{{ goal.metric }}</td>
            <td class="pl-1 lg:pl-10">{{ durationLabel(goal.duration) }}</td>
            <td class="pl-1 lg:pl-5 pr-1 lg:pr-5">
              {{ greaterOrLess(goal.metric) }}
              {{ resolveMetric(goal.metric, goal.threshold) }}
            </td>
            <td class="pl-2.5 lg:pl-5 text-center border-l-2 border-white">
              <font-awesome-icon
                :icon="['fa', statusMarker(goal)]"
                :class="
                  goalAchieved(goal) ? 'text-supplementary' : 'text-secondary'
                "
              />
            </td>
            <td
              class="pl-5 hidden sm:table-cell text-secondary"
              :class="{
                '!text-supplementary': actualBetterThanThreshold(goal),
                'opacity-50': !loggedAllNights(goal),
              }"
            >
              {{ formatActual(goal) }}
            </td>
            <td
              class="pl-5 hidden sm:table-cell"
              :class="
                loggedAllNights(goal) ? 'text-supplementary' : 'text-secondary'
              "
            >
              {{ goal.completed }} / {{ goal.duration }}
            </td>
          </tr>
        </table>
        <div class="button-or-message mt-10">
          <div v-if="!goalLimitReached" class="goal-creation">
            <div
              class="ml-auto mr-auto action-btn w-28 lg:text-lg lg:w-32 lg:!pb-8"
              @click="toggleGoalsModal"
            >
              <font-awesome-icon :icon="['fa', 'pen']" />
              Add goal
            </div>
          </div>
          <div
            v-if="goalLimitReached"
            class="text-xs italic text-center text-secondary pb-5 pt-5 w-full"
          >
            Goal limit reached!
          </div>
        </div>
        <p
          class="mt-5 text-xs text-center md:text-base lg:text-xl max-w-5xl ml-auto mr-auto"
        >
          To achieve a goal, you need to have logged
          <span class="font-bold text-secondary">all nights</span> for the
          period of interest.
        </p>
        <p class="text-xs text-center italic mt-5 sm:hidden">
          Tip: the desktop version of this site allows you to see your actual
          results for each goal.
        </p>
      </div>
      <div v-if="!goalsExist">
        <p class="text-center text-lg text-supplementary font-bold mb-2">
          You have not defined any goals for yourself yet!
        </p>
        <div class="ml-auto mr-auto action-btn w-28" @click="toggleGoalsModal">
          <font-awesome-icon :icon="['fa', 'pen']" />
          Add goal
        </div>
        <img
          src="images/goals.svg"
          alt="goals"
          class="absolute m-auto top-44 bottom-0 left-0 right-0 opacity-50 behind"
        />
      </div>
      <GoalsModal
        v-if="showGoalsModal"
        :existing-goals="goals"
        @dataUpdated="updateGoals"
      ></GoalsModal>
      <DeleteGoalModal
        v-if="showDeleteGoalModal"
        @dataUpdated="updateGoals"
      ></DeleteGoalModal>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import GoalsModal from '~/components/goals/GoalsModal'
import DeleteGoalModal from '~/components/goals/DeleteGoalModal'
export default {
  components: { GoalsModal, DeleteGoalModal },
  data() {
    return {
      goalLimit: 10,
      goals: [],
      loading: true,
    }
  },
  computed: {
    ...mapState(['showGoalsModal', 'showDeleteGoalModal']),
    goalLimitReached() {
      return this.goals.length > this.goalLimit
    },
    goalsExist() {
      return this.goals.length > 0
    },
  },
  async mounted() {
    await this.updateGoals()
  },
  methods: {
    ...mapMutations(['toggleGoalsModal', 'toggleDeleteGoalModal']),
    durationLabel(durationValue) {
      switch (durationValue) {
        case 7:
          return '1 week'
        case 14:
          return '2 weeks'
        case 30:
          return '1 month'
        case 90:
          return '3 months'
        case 180:
          return '6 months'
        default:
          return 'unknown'
      }
    },
    formatActual(goal) {
      if (goal.actual == null) {
        return '--'
      } else {
        const estimate = Number.isInteger(goal.actual)
          ? goal.actual
          : goal.actual <= 1
          ? `${(goal.actual * 100).toFixed(0)}%`
          : goal.actual.toFixed(1)
        return this.loggedAllNights(goal) ? estimate : `${estimate}?`
      }
    },
    toggleDeleteGoalModalWithId(id) {
      this.$store.commit('setGoalToDelete', id)
      this.toggleDeleteGoalModal()
    },
    greaterOrLess(metric) {
      return ['Sleep duration', 'Efficiency', 'Rating'].includes(metric)
        ? '>'
        : '<'
    },
    resolveMetric(metric, value) {
      switch (metric) {
        case 'Sleep duration':
          return `${value.toFixed(1)} hours`
        case 'Time to fall asleep':
          return `${value.toFixed(0)} mins`
        case 'Time awake at night':
          return `${value.toFixed(0)} mins`
        case 'Efficiency':
          return `${value.toFixed(2) * 100}%`
        case 'Rating':
          return `${value.toFixed(2) * 100}%`
      }
    },
    loggedAllNights(goal) {
      return goal.completed === goal.duration
    },
    actualBetterThanThreshold(goal) {
      if (goal.actual !== undefined) {
        return this.greaterOrLess(goal.metric) === '>'
          ? goal.threshold < goal.actual
          : goal.threshold > goal.actual
      } else {
        return false
      }
    },
    goalAchieved(goal) {
      return this.loggedAllNights(goal) && this.actualBetterThanThreshold(goal)
    },
    statusMarker(goal) {
      return this.goalAchieved(goal) ? 'check' : 'times'
    },
    async updateGoals() {
      try {
        this.loading = true
        const response = await this.$axios.get('v1/goal')
        this.goals = response.data.goals
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.goals-table {
  @apply ml-auto mr-auto text-xs text-left md:text-base lg:text-lg xl:text-xl;
  min-width: 300px;
  max-width: 1200px;
}

.goals-table th {
  @apply pt-2 pb-2 border-b-2 border-white;
}

.delete-goal {
  @apply text-supplementary cursor-pointer
  transition duration-150 hover:text-secondary;
}
.goal-creation {
  @apply text-right;
}
</style>
