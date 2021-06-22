<template>
  <div>
    <h1 class="heading-top text-center mb-10">Insomnia Severity Index</h1>
    <div v-if="loading" class="text-xl text-center">Loading...</div>
    <Error v-if="error" />
    <div v-if="!loading & !error">
      <p class="text-center text-xs">
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
      <div v-if="results.length > 0 && results.length <= 10">
        <table class="isi-table">
          <tr class="table-header">
            <th class="pr-5">Date</th>
            <th class="pr-5">Score</th>
            <th class="">Classification</th>
          </tr>
          <tr v-for="result in results" :key="result.id">
            <td class="pr-5">{{ result.date }}</td>
            <td class="pr-5">{{ result.score }}</td>
            <td class="">{{ result.classification }}</td>
          </tr>
        </table>
      </div>
      <div v-if="results.length > 10">
        <h3 class="text-center font-bold text-xl mt-10">Your ISI Results</h3>
        <line-chart
          :data="lineChartData"
          :options="lineChartOptions"
          class="w-72 sm:w-full lg:w-4/5 ml-auto mr-auto sm:ml-0 sm:mr-0 mt-5 mb-5"
        />
      </div>
      <img
        v-if="results.length == 0"
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
  </div>
</template>

<script>
// TODO: colour classification (table)
// TODO: chart -> add header
// TODO: chart -> add y-axis title
import { mapMutations, mapState } from 'vuex'
import IsiCreateModal from '~/components/isi/IsiCreateModal'
import Error from '~/components/layout/Error'
export default {
  components: { Error, IsiCreateModal },
  data() {
    return {
      loading: true,
      error: false,
      results: [],
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        type: 'line',
        scales: {
          xAxes: [
            {
              type: 'time',
              offset: true,
              time: {
                unit: 'day',
              },
              ticks: {
                fontSize: 10,
                fontColor: '#FAF9F9',
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 12,
                fontColor: '#FAF9F9',
                beginAtZero: true,
                max: 28,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    }
  },
  computed: {
    ...mapState(['showIsiCreateModal']),
  },
  mounted() {
    this.updateResults()
  },
  methods: {
    ...mapMutations(['toggleIsiCreateModal']),
    updateLineChartData() {
      this.lineChartData = {
        labels: this.results.map((v) => v.date),
        datasets: [
          {
            backgroundColor: '#BEE3DB',
            borderColor: '#89B0AE',
            fill: false,
            label: 'Score',
            data: this.results.map((v) => v.score),
          },
        ],
      }
    },
    updateResults() {
      try {
        // await this.results = this.$axios.get('v1/isi') // parse dates
        this.results = [
          { id: 1, date: '2020-11-01', score: 16, classification: 'Moderate' },
          { id: 2, date: '2020-12-21', score: 17, classification: 'Moderate' },
          { id: 3, date: '2021-01-01', score: 18, classification: 'Moderate' },
          { id: 4, date: '2021-02-01', score: 19, classification: 'Severe' },
          { id: 5, date: '2021-04-01', score: 25, classification: 'Severe' },
          { id: 6, date: '2021-04-15', score: 21, classification: 'Severe' },
          { id: 7, date: '2021-04-25', score: 20, classification: 'Severe' },
          { id: 8, date: '2021-05-15', score: 17, classification: 'Moderate' },
          { id: 9, date: '2021-06-01', score: 15, classification: 'Moderate' },
          { id: 10, date: '2021-07-01', score: 12, classification: 'Mild' },
          { id: 11, date: '2021-07-07', score: 13, classification: 'Mild' },
        ]
        this.updateLineChartData()
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
.isi-table {
  @apply ml-auto mr-auto mt-5 mb-5;
}
.table-header {
  @apply border-b-2 border-white;
}
</style>
