<template>
  <div>
    <h1 class="heading-top text-center mb-10">My Goals</h1>
    <p
      class="mb-5 text-xs text-center md:text-base md:mb-10 lg:text-xl max-w-5xl ml-auto mr-auto"
    >
      This is the space to set and track sleep goals. Make sure that you set
      realistic goals as, for example, your expected sleep duration will change
      with age.
    </p>
    <div v-if="goalsExist">
      <table class="goals-table">
        <tr>
          <th class="pl-0"></th>
          <th class="pl-2.5">My average</th>
          <th class="pl-1 lg:pl-10">Over last</th>
          <th class="pl-1 lg:pl-10">Should be</th>
          <th class="pl-2.5 lg:pl-12"></th>
          <th class="pl-5 pr-5 hidden sm:table-cell">Actual</th>
        </tr>
        <tr v-for="goal in goals" :key="goal.id">
          <td
            class="pl-0 text-center delete-goal"
            @click="toggleDeleteGoalModalWithId(goal.id)"
          >
            <font-awesome-icon :icon="['fa', 'trash-alt']" />
          </td>
          <td class="pl-2.5">{{ goal.metric }}</td>
          <td class="pl-1 lg:pl-10">{{ goal.duration }}</td>
          <td class="pl-1 lg:pl-10">
            {{ greaterOrLess(goal.metric) }}
            {{ resolveMetric(goal.metric, goal.threshold) }}
          </td>
          <td class="pl-2.5 lg:pl-12 text-center">
            <font-awesome-icon
              :icon="[
                'fa',
                statusMarker(goal.metric, goal.threshold, goal.actual),
              ]"
              :class="
                goalAchieved(goal.metric, goal.threshold, goal.actual)
                  ? 'text-supplementary'
                  : 'text-secondary'
              "
            />
          </td>
          <td
            class="pl-5 hidden sm:table-cell"
            :class="
              goalAchieved(goal.metric, goal.threshold, goal.actual)
                ? 'text-supplementary'
                : 'text-secondary'
            "
          >
            {{ formatActual(goal.actual) }}
          </td>
        </tr>
      </table>
      <div class="button-or-message mt-10">
        <div v-if="goals.length <= goalLimit" class="goal-creation">
          <div
            class="ml-auto mr-auto action-btn w-28 lg:text-lg lg:w-32 lg:!pb-8"
            @click="toggleGoalsModal"
          >
            <font-awesome-icon :icon="['fa', 'pen']" />
            Add goal
          </div>
        </div>
        <div
          v-if="goals.length > goalLimit"
          class="text-xs italic text-center text-secondary pb-5 pt-5 w-full"
        >
          Goal limit reached!
        </div>
      </div>
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
    <GoalsModal v-if="showGoalsModal" :existing-goals="goals"></GoalsModal>
    <DeleteGoalModal v-if="showDeleteGoalModal"></DeleteGoalModal>
  </div>
</template>

<script>
// TODO: create API endpoints
// TODO: create 3 seed goals for all new users
// TODO: test the page flow: delete all goals, create new goal, reach limit, try dups
// TODO: Fix the goddamn modals!
import { mapMutations, mapState } from 'vuex'
import GoalsModal from '~/components/goals/GoalsModal'
import DeleteGoalModal from '~/components/goals/DeleteGoalModal'
export default {
  components: { GoalsModal, DeleteGoalModal },
  data() {
    return {
      goalLimit: 10,
      goals: [
        // temporary
        {
          id: 1,
          metric: 'Sleep duration',
          duration: '2 weeks',
          threshold: 6,
          actual: 5.834435332,
        },
        {
          id: 2,
          metric: 'Time to fall asleep',
          duration: '1 month',
          threshold: 30,
          actual: 38,
        },
        {
          id: 3,
          metric: 'Efficiency',
          duration: '3 months',
          threshold: 0.8,
          actual: 0.833332212,
        },
        {
          id: 4,
          metric: 'Rating',
          duration: '6 months',
          threshold: 0.8,
          actual: 0.8112311,
        },
        {
          id: 5,
          metric: 'Time awake at night',
          duration: '3 months',
          threshold: 60,
          actual: 70,
        },
      ],
    }
  },
  computed: {
    ...mapState(['showGoalsModal', 'showDeleteGoalModal']),
    goalsExist() {
      return this.goals.length > 0
    },
  },
  methods: {
    ...mapMutations(['toggleGoalsModal', 'toggleDeleteGoalModal']),
    formatActual(value) {
      return Number.isInteger(value)
        ? value
        : value <= 1
        ? `${value.toFixed(2) * 100}%`
        : value.toFixed(1)
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
    goalAchieved(metric, threshold, actual) {
      return this.greaterOrLess(metric) === '>'
        ? threshold < actual
        : threshold > actual
    },
    statusMarker(metric, threshold, actual) {
      return this.goalAchieved(metric, threshold, actual) ? 'check' : 'times'
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
