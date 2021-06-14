<template>
  <div>
    <h1 class="heading-top text-center mb-10">My Progress</h1>
    <div v-if="!dataLoaded" class="text-xl text-center">Loading...</div>
    <div v-if="error">
      <p class="text-xl font-bold text-center text-secondary">
        Oops, it looks like our server might be down, please try again later
      </p>
      <img
        src="images/warning.svg"
        alt="error"
        class="absolute m-auto top-0 bottom-0 left-0 right-0 opacity-50 behind"
      />
    </div>
    <div v-if="dataLoaded && !error" class="chart-container">
      <div v-if="!dataExists" class="relative">
        <div class="empty-card-text">
          Not sure where to start? Check out our
          <NuxtLink class="text-secondary font-bold underline" to="learn">
            Learning Center
          </NuxtLink>
        </div>
        <img class="first-night-card" src="images/metrics.svg" alt="metrics" />
        <div class="text-center w-full">
          <div
            class="ml-auto mr-auto action-btn w-48"
            @click="toggleNightFormModal"
          >
            <font-awesome-icon :icon="['fa', 'pen']" />
            Add your first night
          </div>
        </div>
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

function avgArray(array) {
  return array.reduce((a, b) => a + b) / array.length
}

async function getSleepData(axios, period) {
  const nightsRaw = await axios.get(`v1/night/${period}`)
  const nightsData = nightsRaw.data.data
  const dataExists = Object.keys(nightsData).length > 0
  if (!dataExists) {
    const nullCollection = {
      hoursAsleep: null,
      hoursAwake: null,
      rating: null,
      efficiency: null,
    }
    return {
      dataExists,
      dates: null,
      chartData: nullCollection,
      summary: nullCollection,
    }
  } else {
    const extract = (value, scale = 1) =>
      Object.keys(nightsData).map((k) => nightsData[k][value] / scale)

    const hoursAsleep = extract('mins_slept', 60)
    const hoursAwake = extract('mins_awake', 60)
    const rating = extract('rating', 10)
    const efficiency = extract('efficiency')

    return {
      dataExists: Object.keys(nightsData).length > 0,
      dates: Object.keys(nightsData)
        .map((d) => new Date(d))
        .map((d) => d.toISOString().split('T')[0]),
      chartData: { hoursAsleep, hoursAwake, rating, efficiency },
      summary: {
        hoursAsleep: avgArray(hoursAsleep),
        hoursAwake: avgArray(hoursAwake),
        rating: avgArray(rating),
        efficiency: avgArray(efficiency),
      },
    }
  }
}

export default {
  components: { NighFormModal },
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
      return this.formatter(Math.round(this.summary.efficiency * 100), '%')
    },
    avgRatingFmt() {
      return this.formatter(Math.round(this.summary.rating * 100), '%')
    },
    avgHoursSleptFmt() {
      return this.formatter(this.summary.hoursAsleep.toFixed(1), ' hrs.')
    },
    avgMinsAwakeFmt() {
      const minsAwake = this.summary.hoursAwake * 60
      return this.formatter(minsAwake.toFixed(0), ' mins.')
    },
  },
  async mounted() {
    await this.updateSleepData()
  },
  methods: {
    ...mapMutations(['toggleNightFormModal']),
    formatter(input, suffix) {
      const value = `${input}${suffix}`
      return input ? value : '--'
    },
    async updateSleepData() {
      try {
        this.dataLoaded = false
        this.sleepData = await getSleepData(this.$axios, this.nDaySummary)
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
        console.log(e)
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
.chart-container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
