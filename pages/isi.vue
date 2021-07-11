<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">Insomnia Severity Index</h1>
    <div v-if="loading" class="text-xl text-center">Loading...</div>
    <Error v-if="error" />
    <div v-if="!loading & !error">
      <p class="text-center text-xs sm:text-base">
        <a
          href="https://www.myhealth.va.gov/mhv-portal-web/insomnia-severity-index"
          class="text-secondary font-bold hover:underline"
        >
          Insomnia Severity Index (ISI)
        </a>
        is a short questionnaire that is used to assess and classify one's
        severity of insomnia. Consider completing this questionnaire once every
        few months to self-reflect and observe how your answers change.
      </p>
      <div v-if="results.length > 0">
        <table class="isi-table">
          <tr class="table-header">
            <th class="pl-5"></th>
            <th class="pr-12">Date</th>
            <th class="pr-5">Score</th>
            <th class="">Classification</th>
          </tr>
          <tr v-for="result in results" :key="result.id">
            <td
              class="pl-0 text-center delete-result pr-2"
              @click="toggleDeleteIsiModalWithId(result.id)"
            >
              <font-awesome-icon :icon="['fa', 'trash-alt']" />
            </td>
            <td class="pr-5">{{ result.date }}</td>
            <td class="pr-5">{{ result.score }}</td>
            <td class="">{{ result.classification }}</td>
          </tr>
        </table>
      </div>
      <img
        v-if="results.length === 0"
        src="images/isi.svg"
        alt="survey"
        class="opacity-50 behind mb-5 ml-auto mr-auto"
      />
      <div
        class="ml-auto mr-auto action-btn w-32 lg:text-lg lg:w-36 lg:!pb-8"
        @click="toggleIsiCreateModal"
      >
        <font-awesome-icon :icon="['fa', 'pen']" />
        Take survey
      </div>
    </div>
    <IsiCreateModal v-if="showIsiCreateModal" @dataUpdated="updateResults" />
    <IsiDeleteModal v-if="showIsiDeleteModal" @dataUpdated="updateResults" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import IsiCreateModal from '~/components/isi/IsiCreateModal'
import IsiDeleteModal from '~/components/isi/IsiDeleteModal'
import Error from '~/components/layout/Error'
export default {
  components: { Error, IsiCreateModal, IsiDeleteModal },
  data() {
    return {
      loading: true,
      error: false,
      results: [],
    }
  },
  head: {
    title: 'Insomnia Severity Index Survey',
    meta: [
      {
        hid: 'sleep-rescue-isi',
        name: 'Insomnia Severity Index Survey',
        content:
          'Insomnia severity index survey -- track your results over time',
      },
    ],
  },
  computed: {
    ...mapState(['showIsiCreateModal', 'showIsiDeleteModal']),
  },
  mounted() {
    this.updateResults()
  },
  methods: {
    ...mapMutations(['toggleIsiCreateModal', 'toggleIsiDeleteModal']),
    toggleDeleteIsiModalWithId(id) {
      this.$store.commit('setResultToDelete', id)
      this.toggleIsiDeleteModal()
    },
    async updateResults() {
      try {
        const rawResults = await this.$axios.get('v1/isi')
        this.results = rawResults.data.isis.map((r) => {
          const score = this.calculateScore(r)
          const classification = this.classifyResult(score)
          return { id: r.id, date: r.date, score, classification }
        })
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    calculateScore(result) {
      return (
        result.falling_asleep +
        result.staying_asleep +
        result.early_wake_up +
        result.sleep_pattern +
        result.noticeable +
        result.worried +
        result.interference
      )
    },
    classifyResult(score) {
      switch (true) {
        case score < 7:
          return 'Insignificant'
        case score > 7 && score < 15:
          return 'Sub-threshold'
        case score > 14 && score < 21:
          return 'Clinical'
        case score > 21:
          return 'Severe'
      }
    },
  },
}
</script>

<style scoped>
.isi-table {
  @apply ml-auto mr-auto mt-5 mb-5 text-xs sm:text-base;
}
.table-header {
  @apply border-b-2 border-white;
}
.delete-result {
  @apply text-supplementary cursor-pointer
  transition duration-150 hover:text-secondary;
}
</style>
