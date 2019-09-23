import Vue from 'vue'
import Router from 'vue-router'
import store from "./store"

import WorkingTimes from './components/common/WorkingTimes'
import Clock from "./components/common/ClockManager"
import WorkingTime from './components/common/WorkingTime'
import ChartManager from './components/common/ChartManager'
import EditAccount from './components/common/EditAccount'
import Login from "./components/common/Login"

import Employee from "./views/Employee"

import Manager from "./views/Manager"
import ManageTeam from "./components/manager/ManageTeam"

import SuperManager from "./views/SuperManager"
import ManageAllTeams from "./components/superManager/ManageAllTeams"
import ManageAllEmployees from "./components/superManager/ManageAllEmployees"

import Administrator from "./views/Administrator"
import ManageAccounts from "./components/administrator/ManageAccounts"

import Unauthorized from "./views/Unauthorized"
import NotFound from "./views/NotFound"

Vue.use(Router);

const authGuard = (roleid, to) => {
  const user = store.state.user;
  let role = "";
  switch (roleid) {
    case 1:
      role = "employee";
      break;
    case 2:
      role = "manager";
      break;
    case 3:
      role = "superManager";
      break;
    case 4:
      role = "administrator";
      break;
  }
  // If user tried to access to another an interface of another role
  if (!to.fullPath.includes(role)) {
    console.log('error1');
    return false;
  }
  // If user not logged or user not haven't the good roleid
  if (!user.roleid || !user.id || user.roleid !== roleid) {
    console.log('error2', roleid, user.roleid);
    return false;
  }
  const employeeID = to.fullPath.split('/')[2];
  const currentID = user.id.toString();
  // If try to access to interface of another user
  if (employeeID !== currentID) {
    console.log('error3');
    return false;
  }
  return true;
}

const employeeGuard = (to, from, next) => {
  const user = store.state.user;
  const authorized = authGuard(1, to);
  if (!authorized) {
    next('/unauthorized');
  }
  const currentID = user.id.toString();
  // If try to access to workingTimes of another user
  if (to.fullPath.includes('workingTimes')) {
    const workingTimeID = to.fullPath.split('/')[4];
    const username = to.fullPath.split('/')[5];
    if (username !== user.username || workingTimeID !== currentID) {
      next('/unauthorized');
    }
  }
  next();
}

const managerGuard = (to, from, next) => {
  const user = store.state.user;
  const authorized = authGuard(2, to);
  if (!authorized) {
    next('/unauthorized');
  }
  const currentID = user.id.toString();
  // // If try to access to workingTimes of another
  // if (to.fullPath.includes('workingTimes')) {
  //   const workingTimeID = to.fullPath.split('/')[4];
  //   const username = to.fullPath.split('/')[5];
  //   // TODO ADD CHECK TO ACCESS DASHBOARDS OF HIS TEAM
  //   // CHECK IF workingTimeID and username are includes in his array of employee
  //   if (workingTimeID !== currentID || username !== user.username) {
  //     next('/unauthorized');
  //   }
  // }

  // If Manager try to edit his workingTimes
  if (to.fullPath.includes('editWorkingTimes')) {
    const userID = to.fullPath.split('/')[4];
    const currentID = user.id
    if (currentID !== userID) {
      next('/unauthorized');
    }
  }
  next();
}

const superManagerGuard = (to, from, next) => {
  const authorized = authGuard(3, to);
  if (!authorized) {
    next('/unauthorized');
  }
  next();
}

const administratorGuard = (to, from, next) => {
  const authorized = authGuard(4, to);
  if (!authorized) {
    next('/unauthorized');
  }
  next();
}


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/login" }, // Redirect entrypoint to login page
    { path: '*', component: NotFound }, // All pages not referenced here display NotFound page
    { path: '/login', component: Login }, // The login page
    { path: '/unauthorized', component: Unauthorized }, // The unauthorized page
    { // When logged as en employee you can access the following routes
      path: '/employee/:userId',
      component: Employee,
      children: [
        { // Auto redirected to his clock page
          path: '',
          redirect: 'clock'
        },
        { // Access to his clock'in clock'out page
          path: 'clock',
          component: Clock,
          beforeEnter: employeeGuard
        },
        { // Access to his dashboard
          path: 'workingTimes/:id/:username',
          component: WorkingTimes,
          beforeEnter: employeeGuard,
        },
        { // Access to his chart management
          path: 'chartManager',
          component: ChartManager,
          beforeEnter: employeeGuard,
        },
        {  // Edit his account
          path: 'editAccount',
          component: EditAccount,
          beforeEnter: employeeGuard,
        }
      ]
    },
    { // When logged as en manager you can access the following routes
      path: '/manager/:userId', component: Manager,
      children: [
        { // Auto redirected to his clock page
          path: '',
          redirect: 'clock',
        },
        { // Access to his clock'in clock'out page
          path: 'clock',
          component: Clock,
          beforeEnter: managerGuard,
        },
        { // Access to his dashboard
          path: 'workingTimes/:id/:username',
          component: WorkingTimes,
          beforeEnter: managerGuard,
        },
        {  // Edit his account
          path: 'editAccount',
          component: EditAccount,
          beforeEnter: managerGuard,
        },
        { // Access to his chart management
          beforeEnter: managerGuard,
          path: 'chartManager',
          component: ChartManager,
        },
        { // Edit his team of employee
          beforeEnter: managerGuard,
          path: 'manageTeam',
          component: ManageTeam,
        },
        { // Create the workingTime of an employee of his team
          beforeEnter: managerGuard,
          path: 'editWorkingTimes/:userID',
          component: WorkingTime,
        },
        { // Edit workingTimes of an employee of his team
          beforeEnter: managerGuard,
          path: 'editWorkingTimes/:userID/:editMode',
          component: WorkingTime,
        }
      ]
    },
    { // When logged as en SuperManager you can access the following routes
      path: '/superManager/:id', component: SuperManager,
      children: [
        { // Auto redirected to his clock page
          path: '',
          redirect: 'clock'
        },
        { // Access to his clock'in clock'out page
          path: 'clock',
          component: Clock,
          beforeEnter: superManagerGuard
        },
        { // Access to his dashboard
          path: 'workingTimes/:id/:username',
          component: WorkingTimes,
          beforeEnter: superManagerGuard
        },
        { // Edit his Account
          path: 'editAccount',
          component: EditAccount,
          beforeEnter: superManagerGuard
        },
        { // Edit his Charts
          path: 'chartManager',
          component: ChartManager,
          beforeEnter: superManagerGuard
        },
        { // Manage all teams
          path: 'manageAllTeams',
          component: ManageAllTeams,
          beforeEnter: superManagerGuard
        },
        { // List all employees and can upgrade or downgrade their role
          path: 'manageAllEmployees',
          component: ManageAllEmployees,
          beforeEnter: superManagerGuard
        }
      ]
    },
    { // When logged as en Administrator you can access the following routes
      path: '/administrator/:id', component: Administrator,
      children: [
        { // Create accounts
          path: '/manageAccounts',
          component: ManageAccounts,
          beforeEnter: administratorGuard
        },
      ]
    },
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
