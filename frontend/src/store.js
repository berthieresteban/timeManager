import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.use(VueAxios, axios);
Vue.use(Vuex)

process.env.NODE_ENV


const store = new Vuex.Store({
  state: {
    snackBar: {
      color: null,
      displayed: false,
      text: "",
    },
    host: process.env.NODE_ENV === 'development' ? 'localhost' : "15.188.8.203",
    port: "4000",
    apiRoute: "http://15.188.8.203:4000/api",
    logged: false,
    token: null,
    user: {
      username: null,
      id: null,
      email: null,
      roleid: null
    },
    darkMode: true,
    areaChart: {
      size: 6,
      position: 1,
      type: 'areaChart',
      displayed: true,
      colors: ["#36A2EB", "#FF6384"],
    },
    barChart: {
      size: 6,
      position: 0,
      type: 'barChart',
      displayed: true,
      colors: ["#36A2EB"],
    },
    lineChart: {
      size: 6,
      position: 3,
      type: 'lineChart',
      displayed: true,
      colors: ["#36A2EB"],
    },
    donutChart: {
      size: 6,
      position: 2,
      type: 'donutChart',
      displayed: true,
      colors: ["#36A2EB", "#FF6384"],
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      axios.defaults.headers.common['session_jwt'] = token;
    },
    createSnackBarSuccess(state, { text, announcer }) {
      announcer.set(text);
      state.snackBar = {
        color: "success",
        displayed: true,
        text: text
      }
    },
    createSnackBarError(state, { text, announcer }) {
      announcer.set(text);
      state.snackBar = {
        color: "error",
        displayed: true,
        text: text
      }
    },
    unsetLogged(state) {
      state.logged = false;
    },
    setLogged(state) {
      state.logged = true;
    },
    setUser(state, user) {
      Object.assign(state.user, user);
    },
    turnDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setChartPosition(state, { chart, position }) {
      state.areaChart.position = state.areaChart.type !== chart && state.areaChart.position === position ? state[chart].position : state.areaChart.position;
      state.barChart.position = state.barChart.type !== chart && state.barChart.position === position ? state[chart].position : state.barChart.position;
      state.lineChart.position = state.lineChart.type !== chart && state.lineChart.position === position ? state[chart].position : state.lineChart.position;
      state.donutChart.position = state.donutChart.type !== chart && state.donutChart.position === position ? state[chart].position : state.donutChart.position;
      state[chart].position = position;
    },
    setChartSize(state, { chart, size }) {
      state[chart].size = size;
    },
    setChartColors(state, { chart, colors }) {
      state[chart].colors = colors;
    },
    setChartDisplayed(state, { chart, displayed }) {
      state[chart].displayed = displayed;
    },
    loadChart(state, chart) {
      Object.assign(state[chart.type], chart)
    },
    reinitCharts(state) {
      state.areaChart = {
        size: 6,
        position: 1,
        type: 'areaChart',
        displayed: true,
        colors: ["#36A2EB", "#FF6384"],
      };
      state.barChart = {
        size: 6,
        position: 0,
        type: 'barChart',
        displayed: true,
        colors: ["#36A2EB"],
      };
      state.lineChart = {
        size: 6,
        position: 3,
        type: 'lineChart',
        displayed: true,
        colors: ["#36A2EB"],
      };
      state.donutChart = {
        size: 6,
        position: 2,
        type: 'donutChart',
        displayed: true,
        colors: ["#36A2EB", "#FF6384"],
      };
    }
  },
  actions: {
    deleteMemberFromTeam({ state }, payload) {
      return axios.delete(`http://${state.host}:${state.port}/api/managing/${payload.id}`).then(response => {
        return response;
      });
    },
    updateUserSuperManager({ state }, payload) {
      return axios.put(`http://${state.host}:${state.port}/api/users/${payload.id}`, payload.user).then(response => {
        return response;
      });
    },
    updateUser({ state }, payload) {
      return axios.put(`http://${state.host}:${state.port}/api/users/${state.user.id}`, payload).then(response => {
        return response;
      });
    },
    login({ state }, payload) {
      let route = `http://${state.host}:${state.port}/auth`;
      return axios.post(route, payload
      ).then(response => {
        return response.data;
      });
    },
    getUserByID({ state }, id) {
      let route = `http://${state.host}:${state.port}/api/users/${id}`;
      return axios.get(route
      ).then(response => {
        return response.data;
      });
    },
    getAllUsers({ state }) {
      let route = `http://${state.host}:${state.port}/api/users`;
      return axios.get(route
      ).then(response => {
        return response.data;
      });
    },
    getUser({ state }, payload) {
      let route = `http://${state.host}:${state.port}/api/users`;
      route += payload.username ? `?username=${payload.username}` : '?';
      route += payload.username && payload.email ? '&' : '';
      route += payload.email ? `email=${payload.email}` : '';
      return axios.get(route
      ).then(response => {
        return response.data;
      });
    },
    createUser({ state }, payload) {
      const response = axios.post(`http://${state.host}:${state.port}/api/users`, payload).then(response => {
        return response;
      });
      return response;
    },
    deleteUser({ state, commit }, id) {
      if (state.user && id === state.user.id) {
        commit("setUser", {});
        commit("unsetLogged");
      }
      return axios.delete(`http://${state.host}:${state.port}/api/users/${id}`).then(response => {
        return response;
      });
    },
    getWorkingTimes({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/workingtimes/${payload.id}`
      const response = axios.get(route, payload.data).then(response => {
        return response;
      });
      return response;
    },
    createWorkingTime({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/workingtimes/${payload.workingtime.user}`
      const response = axios.post(route, payload).then(response => {
        return response;
      });
      return response;
    },
    updateWorkingTime({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/workingtimes/${payload.id}`
      const response = axios.put(route, payload.data).then(response => {
        return response;
      });
      return response;
    },
    deleteWorkingTime({ state }, id) {
      const route = `http://${state.host}:${state.port}/api/workingtimes/${id}`
      const response = axios.delete(route).then(response => {
        return response;
      });
      return response;
    },
    getClocks({ state }, id) {
      const route = `http://${state.host}:${state.port}/api/clocks/${id}`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
    createClock({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/clocks/${payload.id}`
      const response = axios.post(route, payload.data).then(response => {
        return response;
      });
      return response;
    },
    getManagerTeams({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/managing/manager/${payload.id}`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
    getTeams({ state }) {
      const route = `http://${state.host}:${state.port}/api/teams`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
    getTeam({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/teams/${payload.id}`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
    getTeamMembers({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/managing/team/${payload.id}`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
    createManaging({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/managing`
      const response = axios.post(route, payload).then(response => {
        return response;
      });
      return response;
    },
    createTeam({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/teams`
      const response = axios.post(route, payload).then(response => {
        return response;
      });
      return response;
    },
    deleteTeam({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/teams/${payload.id}`
      const response = axios.delete(route).then(response => {
        return response;
      });
      return response;
    },
    getTeamUser({ state }, payload) {
      const route = `http://${state.host}:${state.port}/api/managing/user/${payload.id}`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
  }
})


export default store;
