<template>
  <div>
    <h1 class="heading-top text-center mb-10">Thought Tracker</h1>
    <div v-if="loading" class="text-xl text-center">Loading...</div>
    <Error v-if="error" />
    <div v-if="!loading & !error">
      <p
        class="mb-5 text-xs text-center sm:text-base sm:mb-10 md:text-xl max-w-5xl ml-auto mr-auto"
      >
        Record your negative thoughts and their rational counter-thoughts here.
      </p>
      <img
        v-if="!thoughtsExist"
        src="images/thoughts.svg"
        alt="thoughts"
        class="opacity-50 behind mb-5 ml-auto mr-auto"
      />
      <div v-if="thoughtsExist">
        <table class="thought-table">
          <tr>
            <th class="pr-2.5"></th>
            <th class="thought-table-header pr-2">Negative Thought</th>
            <th class="thought-table-header pl-2">Counter Thought</th>
          </tr>
          <tr v-for="record in records" :key="record.id">
            <td class="pr-2.5 delete-goal" @click="deleteThought(record.id)">
              <font-awesome-icon :icon="['fa', 'trash-alt']" />
            </td>
            <td class="thought-table-row text-secondary pr-2">
              {{ record.negative_thought }}
            </td>
            <td class="thought-table-row text-supplementary pl-2">
              {{ record.counter_thought }}
            </td>
          </tr>
        </table>
      </div>
      <div>
        <div
          v-if="thoughtLimitReached"
          class="text-center text-secondary italic"
        >
          Thought limit reached!
        </div>
        <div
          v-if="!thoughtLimitReached"
          class="ml-auto mr-auto !pb-8 action-btn w-40 lg:text-lg"
          @click="toggleCreateThoughtModal"
        >
          <font-awesome-icon :icon="['fa', 'pen']" />
          Add a thought
        </div>
      </div>
    </div>
    <DeleteThoughtModal
      v-if="showDeleteThoughtModal"
      @dataUpdated="updateThoughts"
    />
    <CreateThoughtModal
      v-if="showCreateThoughtModal"
      @dataUpdated="updateThoughts"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Error from '~/components/layout/Error'
import DeleteThoughtModal from '~/components/thoughts/DeleteThoughtModal'
import CreateThoughtModal from '~/components/thoughts/CreateThoughtModal'
export default {
  components: { Error, DeleteThoughtModal, CreateThoughtModal },
  data() {
    return {
      thoughtLimit: 10,
      error: false,
      loading: true,
      records: null,
    }
  },
  head: {
    title: 'Thought Tracker',
    meta: [
      {
        hid: 'sleep-rescue-thought-tracker',
        name: 'Negative Thought Tracker',
        content:
          'Record your negative thoughts and counter them with rational argumentation',
      },
    ],
  },
  computed: {
    ...mapState(['showDeleteThoughtModal', 'showCreateThoughtModal']),
    thoughtsExist() {
      return this.records.length > 0
    },
    thoughtLimitReached() {
      return this.records.length >= this.thoughtLimit
    },
  },
  mounted() {
    this.updateThoughts()
  },
  methods: {
    ...mapMutations(['toggleDeleteThoughtModal', 'toggleCreateThoughtModal']),
    deleteThought(id) {
      this.$store.commit('setThoughtToDelete', id)
      this.toggleDeleteThoughtModal()
    },
    async updateThoughts() {
      this.loading = true
      try {
        const result = await this.$axios.get('v1/thought')
        console.log(result.data.thoughts)
        this.records = result.data.thoughts
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.thought-table {
  @apply text-center text-xs sm:text-base md:text-lg ml-auto mr-auto mt-2 mb-10;
}
.thought-table-header {
  @apply font-bold border-b-2 border-white mb-1;
}
.thought-table-row {
  @apply align-top pb-2.5 border-b border-white;
}
.delete-goal {
  @apply text-supplementary cursor-pointer
  transition duration-150 hover:text-secondary;
}
</style>
