<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">My Diary</h1>
    <div v-if="!dataLoaded" class="text-xl text-center">Loading...</div>
    <Error v-if="error" />
    <div v-if="dataLoaded && !error" class="chart-container">
      <div>
        <div class="selector-controls">
          <div class="text-center ml-auto mr-auto sm:ml-0 sm:mr-0">
            <div class="action-btn w-32" @click="toggleNightFormModal">
              <font-awesome-icon :icon="['fa', 'pen']" />
              Add night
            </div>
          </div>
          <div class="flex flex-row ml-auto mr-auto sm:ml-0 sm:mr-0">
            <div class="dropdown-selector arrow-selector">
              <select v-model="periodSelection" @change="updateSleepData">
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
          <div
            class="w-72 sm:w-full lg:w-4/5 ml-auto mr-auto sm:ml-0 sm:mr-0 relative"
          >
            <img
              v-if="!dataExists"
              class="no-records-card"
              src="images/metrics.svg"
              alt="metrics"
            />
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
      <p class="italic text-sm text-center mt-5">
        Be sure to check out our
        <NuxtLink
          class="text-secondary hover:underline"
          :to="learningCenterPath"
          >Learning Center</NuxtLink
        >, especially the section on Sleep Restriction which provides
        instructions on how to schedule your sleep.
      </p>
      <NighFormModal
        v-if="showNightFormModal"
        @closingNightModal="updateSleepData"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import NighFormModal from '~/components/dashboard/NightFormModal'
import Error from '~/components/layout/Error'
export default {
  components: { NighFormModal, Error },
  data() {
    return {
      dataLoaded: false,
      dataExists: false,
      error: false,
      chartSelection: '0',
      periodSelection: '0',
      summary: {
        hoursAsleep: 0,
        hoursAwake: 0,
        efficiency: 0,
        rating: 0,
      },
      nullCollection: {
        hoursAsleep: null,
        hoursAwake: null,
        rating: null,
        efficiency: null,
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
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
              time: {
                unit: 'day',
              },
              stacked: true,
              offset: true,
              ticks: {
                fontSize: 12,
                fontColor: '#FAF9F9',
                autoSkip: false,
              },
              gridLines: {
                display: true,
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
                display: true,
                zeroLineColor: '#FAF9F9',
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
  head: {
    title: 'Progress',
    meta: [
      {
        hid: 'sleep-rescue-progress',
        name: 'Track Your Sleep Improvements',
        content: 'Sleep diary and a dashboard with your sleep improvements',
      },
    ],
  },
  computed: {
    ...mapState(['showNightFormModal']),
    learningCenterPath() {
      const fallback = '/learning/foreword'
      try {
        return localStorage.getItem('learningCenterPath') ?? fallback
      } catch {
        return fallback
      }
    },
    nDaySummary() {
      switch (this.periodSelection) {
        case '0':
          return '7'
        case '1':
          return '14'
        case '2':
          return '30'
        case '3':
          return '90'
        case '4':
          return '180'
        default:
          return '7'
      }
    },
    avgEfficiencyFmt() {
      return isNaN(this.summary.efficiency) || this.summary.efficiency == null
        ? '--'
        : this.formatter(Math.round(this.summary.efficiency * 100), '%')
    },
    avgRatingFmt() {
      return isNaN(this.summary.rating) || this.summary.rating == null
        ? '--'
        : this.formatter(Math.round(this.summary.rating * 100), '%')
    },
    avgHoursSleptFmt() {
      return isNaN(this.summary.hoursAsleep) || this.summary.hoursAsleep == null
        ? '--'
        : this.formatter(this.summary.hoursAsleep.toFixed(1), ' hrs.')
    },
    avgMinsAwakeFmt() {
      const minsAwake = this.summary.hoursAwake * 60
      return isNaN(this.summary.hoursAwake) || this.summary.hoursAwake == null
        ? '--'
        : this.formatter(minsAwake.toFixed(0), ' mins.')
    },
  },
  async mounted() {
    await this.updateSleepData()
  },
  methods: {
    ...mapMutations(['toggleNightFormModal']),
    avgArray(array) {
      return array.length === 0
        ? null
        : array.reduce((a, b) => a + b) / array.length
    },
    getDateRange(n, anchor = new Date()) {
      const dates = []
      for (let i = 0; i < n; i++) {
        anchor.setDate(anchor.getDate() - 1)
        const currentDate = new Date(anchor)
        dates.push(currentDate.toISOString().split('T')[0])
      }
      return dates
    },
    fillFrame(data, n, anchor = new Date()) {
      const frame = {}
      const dateRange = this.getDateRange(n, anchor)
      dateRange.forEach((d) => (frame[d] = data[d] ?? this.nullCollection))
      return frame
    },
    formatter(input, suffix) {
      const value = `${input}${suffix}`
      return input ? value : '--'
    },
    async getSleepData(axios, period) {
      const nightsRaw = await axios.get(`v1/night/${period}`)
      console.log(nightsRaw)
      const nightsData = nightsRaw.data.data
      const dataExists = Object.keys(nightsData).length > 0
      const filledFrame = this.fillFrame(nightsData, period)
      const extract = (value, scale = 1) =>
        Object.keys(filledFrame).map((k) => filledFrame[k][value] / scale)
      const hoursAsleep = extract('mins_slept', 60)
      const hoursAwake = extract('mins_awake', 60)
      const rating = extract('rating', 10)
      const efficiency = extract('efficiency')
      return {
        dataExists,
        dates: Object.keys(filledFrame)
          .map((d) => new Date(d))
          .map((d) => d.toISOString().split('T')[0]),
        chartData: { hoursAsleep, hoursAwake, rating, efficiency },
        summary: {
          hoursAsleep: this.avgArray(hoursAsleep.filter((k) => !!k)),
          hoursAwake: this.avgArray(hoursAwake.filter((k) => !!k)),
          rating: this.avgArray(rating.filter((k) => !!k)),
          efficiency: this.avgArray(efficiency.filter((k) => !!k)),
        },
      }
    },
    async updateSleepData() {
      try {
        this.dataLoaded = false
        this.sleepData = await this.getSleepData(this.$axios, this.nDaySummary)
        this.summary = this.sleepData.summary
        this.dataExists = this.sleepData.dataExists
        this.barChartData = {
          labels: this.sleepData.dates,
          datasets: [
            {
              backgroundColor: '#89B0AE',
              label: 'Hours Asleep',
              data: this.sleepData.chartData.hoursAsleep,
            },
            {
              backgroundColor: '#BEE3DB',
              label: 'Hours Awake',
              data: this.sleepData.chartData.hoursAwake,
            },
          ],
        }
        this.lineChartData = {
          labels: this.sleepData.dates,
          datasets: [
            {
              backgroundColor: '#89B0AE',
              borderColor: '#89B0AE',
              fill: false,
              label: 'Rating',
              data: this.sleepData.chartData.rating,
            },
            {
              backgroundColor: '#BEE3DB',
              borderColor: '#BEE3DB',
              fill: false,
              label: 'Efficiency',
              data: this.sleepData.chartData.efficiency,
            },
          ],
        }
      } catch (e) {
        this.error = true
      } finally {
        this.dataLoaded = true
      }
    },
  },
}
</script>

<style scoped>
.empty-card-text {
  @apply absolute top-0 m-auto pt-2 pl-10 pr-10
  text-sm
  text-center
  w-full
  z-10;
}
.no-records-card {
  @apply opacity-50 ml-auto mr-auto absolute left-0 right-0 top-12;
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
.chart-container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
