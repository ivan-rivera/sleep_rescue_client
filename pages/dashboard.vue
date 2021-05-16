<template>
  <div>
    <h1 class="heading-top text-center mb-10">My Progress</h1>
    <div v-if="!dataLoaded" class="text-xl text-center">Loading...</div>
    <div v-if="dataLoaded">
      <div v-if="!dataExists" class="relative">
        <div class="empty-card-text">
          Not sure where to start? Check out our
          <NuxtLink class="text-secondary font-bold underline" to="learn">
            Learning Center
          </NuxtLink>
        </div>
        <img class="first-night-card" src="images/metrics.svg" alt="metrics" />
      </div>
      <div v-if="dataExists">
        <div class="selector-controls">
          <div class="text-center ml-auto mr-auto sm:ml-0 sm:mr-0">
            <div class="action-btn w-32" @click="toggleNightFormModal">
              <font-awesome-icon :icon="['fa', 'pen']" />
              Add night
            </div>
          </div>
          <div class="flex flex-row ml-auto mr-auto sm:ml-0 sm:mr-0">
            <div class="dropdown-selector arrow-selector">
              <select v-model="periodSelection">
                <option value="0">Last 7 days</option>
                <option value="1">Last 14 days</option>
                <option value="2">Last month</option>
                <option value="3">Last 3 months</option>
                <option value="4">Last 6 months</option>
              </select>
            </div>
            <div class="dropdown-selector arrow-selector">
              <select v-model="chartSelection">
                <option value="0">Hours in Bed</option>
                <option value="1">Rating & Efficiency</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row justify-between">
          <div class="w-72 sm:w-full lg:w-4/5 ml-auto mr-auto sm:ml-0 sm:mr-0">
            <bar-chart
              v-if="chartSelection === '0'"
              :data="barChartData"
              :options="barChartOptions"
            />
            <line-chart
              v-if="chartSelection === '1'"
              :data="lineChartData"
              :options="lineChartOptions"
            />
          </div>
          <div class="text-center self-center">
            <h2 class="text-center mt-5 mb-2.5">
              {{ nDaySummary }} Day Summary
            </h2>
            <div class="stat-summary">
              <div class="stat-holder">
                <div class="statistic">{{ avgHoursSleptFmt }}</div>
                <div class="stat-title">Avg. Hours Slept</div>
              </div>
              <div class="stat-holder">
                <div class="statistic">{{ avgMinsAwakeFmt }}</div>
                <div class="stat-title">Avg. Mins Awake</div>
              </div>
              <div class="stat-holder">
                <div class="statistic">{{ avgEfficiencyFmt }}</div>
                <div class="stat-title">Avg. Efficiency</div>
              </div>
              <div class="stat-holder">
                <div class="statistic">{{ avgRatingFmt }}</div>
                <div class="stat-title">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NighFormModal v-if="showNightFormModal" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { DATE_FORMAT } from '~/assets/js/constants'
import NighFormModal from '~/components/dashboard/NightFormModal'
export default {
  components: { NighFormModal },
  asyncData({ $axios }) {
    const barChartData = {
      labels: [
        '2021/05/01',
        // '2021/05/02',
        '2021/05/03',
        // '2021/05/04',
        '2021/05/05',
        // '2021/05/06',
        '2021/05/07',
        '2021/05/08',
        '2021/05/09',
        '2021/05/10',
        '2021/05/11',
        '2021/05/12',
        '2021/05/13',
        '2021/05/14',
        '2021/05/15',
        '2021/05/16',
        '2021/05/17',
        '2021/05/18',
        '2021/05/19',
        '2021/05/20',
        '2021/05/21',
        '2021/05/22',
        '2021/05/23',
        '2021/05/24',
        '2021/05/25',
        '2021/05/26',
        '2021/05/27',
        '2021/05/28',
        '2021/05/29',
        '2021/05/30',
      ].map((d) => new Date(d)),
      datasets: [
        {
          backgroundColor: '#89B0AE',
          label: 'Hours Asleep',
          data: [
            5.68,
            // 5.6,
            6.38,
            // 6.38,
            6.14,
            // 7.02,
            7.2,
            6.86,
            7.3,
            6.62,
            6.34,
            6.56,
            5.8,
            5.66,
            6.72,
            6.16,
            5.96,
            6.56,
            7.4,
            6.82,
            7.36,
            5.76,
            7.38,
            5.6,
            6.64,
            7.06,
            6.82,
            6.98,
            5.78,
            6.34,
          ],
        },
        {
          backgroundColor: '#BEE3DB',
          label: 'Hours Awake',
          data: [
            1.335,
            // 0.735,
            0.435,
            // 0.93,
            0.39,
            // 0.165,
            0.045,
            1.41,
            1.02,
            0.81,
            0.09,
            0.645,
            1.35,
            0.615,
            1.065,
            0.33,
            0.09,
            1.2,
            0.96,
            0.015,
            0.075,
            1.23,
            1.02,
            1.11,
            0.795,
            1.485,
            0.075,
            0.615,
            0.63,
            1.215,
          ],
        },
      ],
    }
    const lineChartData = {
      labels: [
        '2021/05/01',
        // '2021/05/02',
        '2021/05/03',
        // '2021/05/04',
        '2021/05/05',
        // '2021/05/06',
        '2021/05/07',
        '2021/05/08',
        '2021/05/09',
        '2021/05/10',
        '2021/05/11',
        '2021/05/12',
        '2021/05/13',
        '2021/05/14',
        '2021/05/15',
        '2021/05/16',
        '2021/05/17',
        '2021/05/18',
        '2021/05/19',
        '2021/05/20',
        '2021/05/21',
        '2021/05/22',
        '2021/05/23',
        '2021/05/24',
        '2021/05/25',
        '2021/05/26',
        '2021/05/27',
        '2021/05/28',
        '2021/05/29',
        '2021/05/30',
      ].map((d) => new Date(d)),
      datasets: [
        {
          backgroundColor: '#89B0AE',
          borderColor: '#89B0AE',
          fill: false,
          label: 'Rating',
          data: [
            0.6,
            // 0.5,
            0.6,
            // 0.5,
            0.6,
            // 0.6,
            0.6,
            0.6,
            0.8,
            0.4,
            0.2,
            0.3,
            0.3,
            0.5,
            0.6,
            0.6,
            0.6,
            0.6,
            0.7,
            0.7,
            0.5,
            0.5,
            0.8,
            0.9,
            0.5,
            0.4,
            0.5,
            0.7,
            0.6,
            0.5,
          ],
        },
        {
          backgroundColor: '#BEE3DB',
          borderColor: '#BEE3DB',
          fill: false,
          label: 'Efficiency',
          data: [
            0.76,
            // 0.74,
            0.87,
            // 0.71,
            0.89,
            // 0.91,
            0.97,
            0.83,
            0.81,
            0.81,
            0.78,
            0.82,
            0.83,
            0.89,
            0.91,
            0.81,
            0.71,
            0.84,
            0.96,
            0.75,
            0.75,
            0.85,
            0.89,
            0.91,
            0.79,
            0.77,
            0.79,
            0.87,
            0.88,
            0.79,
          ],
        },
      ],
    }
    return { barChartData, lineChartData }
  },
  data() {
    return {
      dataExists: true,
      chartSelection: '0',
      periodSelection: '0',
      avgHoursSlept: 6.5,
      avgMinsAwake: 47,
      avgEfficiency: 0.79,
      avgRating: 0.71,
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        type: 'line',
        scales: {
          xAxes: [
            {
              type: 'time',
              offset: true,
              ticks: {
                fontSize: 12,
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
                max: 1,
                callback(value) {
                  return (value * 100).toFixed(0) + '%'
                },
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#FAF9F9',
            fontSize: 12,
          },
        },
        tooltips: {
          callbacks: {
            title(tooltipItem, data) {
              const rawDate = data.labels[tooltipItem[0].index]
              return rawDate.toLocaleDateString('en-GB', DATE_FORMAT)
            },
            label(tooltipItem, data) {
              const selection = data.datasets[tooltipItem.datasetIndex]
              const dataLabel = selection.label
              const value = selection.data[tooltipItem.index]
              return `${dataLabel}: ${Math.round(value * 100)}%`
            },
          },
        },
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              stacked: true,
              offset: true,
              ticks: {
                fontSize: 12,
                fontColor: '#FAF9F9',
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: 12,
                fontColor: '#FAF9F9',
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#FAF9F9',
            fontSize: 12,
          },
        },
        tooltips: {
          callbacks: {
            title(tooltipItem, data) {
              const rawDate = data.labels[tooltipItem[0].index]
              return rawDate.toLocaleDateString('en-GB', DATE_FORMAT)
            },
            label(tooltipItem, data) {
              const selection = data.datasets[tooltipItem.datasetIndex]
              const dataLabel = selection.label
              const rawHours = selection.data[tooltipItem.index]
              const roundHours = Math.floor(rawHours)
              const remainder = rawHours - roundHours
              const mins = Math.round(remainder * 60)
              const fmtHours = roundHours === 0 ? '' : `${roundHours} hrs `
              const fmtMins = mins === 0 ? '' : `${mins} mins`
              return `${dataLabel}: ${fmtHours}${fmtMins}`
            },
          },
        },
      },
    }
  },
  computed: {
    ...mapState(['showNightFormModal']),
    dataLoaded() {
      return this.barChartData !== undefined && this.lineChartData !== undefined
    },
    nDaySummary() {
      switch (this.periodSelection) {
        case '0':
          return 7
        case '1':
          return 14
        case '2':
          return 30
        case '3':
          return 90
        case '4':
          return 180
        default:
          return 0
      }
    },
    avgEfficiencyFmt() {
      return this.formatter(this.avgEfficiency * 100, '%')
    },
    avgRatingFmt() {
      return this.formatter(this.avgRating * 100, '%')
    },
    avgHoursSleptFmt() {
      return this.formatter(this.avgHoursSlept, ' hrs.')
    },
    avgMinsAwakeFmt() {
      return this.formatter(this.avgMinsAwake, ' mins.')
    },
  },
  methods: {
    ...mapMutations(['toggleNightFormModal']),
    formatter(input, suffix) {
      const value = `${input}${suffix}`
      return input ? value : '--'
    },
  },
}
// TODO:
//  - Backend: create a night schema, hook it up to questionnaire  (+tests/seeds)
//  - Test with missing days
//  - Force page refresh upon questionnaire submission
</script>

<style scoped>
.empty-card-text {
  @apply absolute top-0 m-auto pt-2 pl-10 pr-10
  text-sm
  text-center
  w-full
  z-10;
}
.first-night-card {
  @apply opacity-50 ml-auto mr-auto;
  z-index: -1;
}
.stat-summary {
  @apply grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2
  ml-auto mr-auto p-1
  border-white border-2 rounded-2xl;
}
.stat-holder {
  @apply flex flex-col
  text-center;
}
.statistic {
  @apply font-bold text-lg text-secondary;
}
.stat-title {
  @apply text-xs;
}

.selector-controls {
  @apply flex
  flex-col
  sm:flex-row
  justify-between;
  min-width: 310px;
}
</style>
