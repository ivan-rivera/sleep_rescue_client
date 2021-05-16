import Vue from 'vue'
import { Bar, Line } from 'vue-chartjs'
// Vue.component('Bar', Bar)
// Vue.component('Line', Line)

const registerComponent = function (name, originalComponent) {
  Vue.component(name, {
    extends: originalComponent,
    props: ['data', 'options'],
    mounted() {
      this.renderChart(this.data, this.options)
    },
  })
}

registerComponent('BarChart', Bar)
registerComponent('LineChart', Line)
