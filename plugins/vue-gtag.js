import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: process.env.GTAG },
  appName: 'SleepRescue',
  bootstrap: true,
  enabled: true,
  pageTrackerScreenviewEnabled: true,
})

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: process.env.GTAG },
      appName: 'SleepRescue',
      bootstrap: true,
      enabled: true,
      pageTrackerScreenviewEnabled: true,
    },
    app.router
  )
}
