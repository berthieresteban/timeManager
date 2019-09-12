import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false
  },
  mutations: {
    turnDarkMode(state) {
      state.darkMode = !state.darkMode;
    }
  },
  actions: {

  }
})
