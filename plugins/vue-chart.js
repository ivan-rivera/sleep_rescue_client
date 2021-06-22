import Vue from 'vue'
import { Bar, Line } from 'vue-chartjs'
// import chartjsPluginAnnotation from 'chartjs-plugin-annotation'
// NOTE: we can add annotations when vue-chartjs stats to support 3.0.0

const registerComponent = function (name, originalComponent) {
  Vue.component(name, {
    extends: originalComponent,
    props: ['data', 'options'],
    mounted() {
      // this.addPlugin([chartjsPluginAnnotation])
      this.renderChart(this.data, this.options)
    },
  })
}

registerComponent('BarChart', Bar)
registerComponent('LineChart', Line)
