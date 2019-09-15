import Vue from 'vue'
import Router from 'vue-router'
import WorkingTimes from './components/WorkingTimes'
import Clock from "./components/ClockManager"
import WorkingTime from './components/WorkingTime'
import ChartManager from './components/ChartManager'
import Login from "./components/Login"
import store from "./store"

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    { path: '/login/', component: Login },
    { path: '/workingTimes/:userID', component: WorkingTimes },
    { path: '/workingTime/:userID', component: WorkingTime },
    { path: '/workingTime/:userID/:workingtimeID', component: WorkingTime },
    { path: '/clock/:username', component: Clock },
    { path: '/chartManager/:userID', component: ChartManager },
  ]
})



router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.logged) {
    next('/login');
  } else {
    next();
  }
})

export default router;
