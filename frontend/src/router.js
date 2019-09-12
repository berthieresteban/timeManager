import Vue from 'vue'
import Router from 'vue-router'
import WorkingTimes from './components/WorkingTimes'
import Clock from "./components/ClockManager"
import WorkingTime from './components/WorkingTime'
import ChartManager from './components/ChartManager'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/workingTimes/1"
    },
    { path: '/workingTimes/:userID', component: WorkingTimes },
    { path: '/workingTime/:userID', component: WorkingTime },
    { path: '/workingTime/:userID/:workingtimeID', component: WorkingTime },
    { path: '/clock/:username', component: Clock },
    { path: '/chartManager/:userID', component: ChartManager },
  ]
})
