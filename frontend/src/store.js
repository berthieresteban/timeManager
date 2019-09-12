import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    areaChart: {
      size: 6,
      position: 1,
      type: 'areaChart',
      displayed: true,
      colors: ["#36A2EB"],
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
      state.areaChart =  {
        size: 6,
        position: 1,
        type: 'areaChart',
        displayed: true,
        colors: ["#36A2EB"],
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
      state.donutChart= {
        size: 6,
        position: 2,
        type: 'donutChart',
        displayed: true,
        colors: ["#36A2EB", "#FF6384"],
      };
    }
  },
  actions: {

  }
})
