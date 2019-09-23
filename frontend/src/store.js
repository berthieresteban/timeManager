import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAnnouncer from 'vue-announcer'

axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.use(VueAxios, axios);
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    snackBar: {
      color: null,
      displayed: false,
      text: "",
    },
    // host:"192.168.43.195",
    host:"localhost",
    port: "4000",
    // apiRoute: "http://192.168.43.195:4000/api",
    apiRoute: "http://localhost:4000/api",
    logged: false,
    token: null,
    user: {
      username: null,
      id: null,
      email: null,
      roleid: null
    },
    darkMode: false,
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
    createSnackBarSuccess(state, {text, announcer}) {
      announcer.set(text);
      state.snackBar = {
        color: "success",
        displayed: true,
        text: text
      }
    },
    createSnackBarError(state, {text, announcer}) {
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
    updateUser({ state }, payload) {
      return axios.put(`${state.apiRoute}/users/${state.user.id}`, payload).then(response => {
        return response;
      });
    },
    login({state}, payload) {
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
      return axios.delete(`${state.apiRoute}/users/${id}`).then(response => {
        return response;
      });
    },
    getWorkingTimes({ state }, payload) {
      const route = `${state.apiRoute}/workingtimes/${payload.id}?start=${payload.start}&end=${payload.end}`
      const response = axios.get(route, payload.data).then(response => {
        return response;
      });
      return response;
    },
    createWorkingTime({ state }, payload) {
      const route = `${state.apiRoute}/workingtimes/${payload.workingtime.user}`
      const response = axios.post(route, payload).then(response => {
        return response;
      });
      return response;
    },
    updateWorkingTime({ state }, payload) {
      const route = `${state.apiRoute}/workingtimes/${payload.id}`
      const response = axios.put(route, payload.data).then(response => {
        return response;
      });
      return response;
    },
    deleteWorkingTime({ state }, id) {
      const route = `${state.apiRoute}/workingtimes/${id}`
      const response = axios.delete(route).then(response => {
        return response;
      });
      return response;
    },
    getClocks({ state }, id) {
      const route = `${state.apiRoute}/clocks/${id}`
      const response = axios.get(route).then(response => {
        return response;
      });
      return response;
    },
    createClock({ state }, payload) {
      const route = `${state.apiRoute}/clocks/${payload.id}`
      const response = axios.post(route, payload.data).then(response => {
        return response;
      });
      return response;
    }
  }
})


export default store;
