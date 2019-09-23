<template>
  <div id="app">
    <vue-announcer />
    <v-app :light="!darkMode" :dark="darkMode" :style="{ backgroundColor: getBackgroundColor}">
      <v-snackbar
        v-model="snackBar.displayed"
        :timeout="2000"
        :color="snackBar.color"
      >{{ snackBar.text }}</v-snackbar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  computed: {
    getBackgroundColor() {
      return this.darkMode ? "#686767" : "#FFFFFF";
    },
    darkMode() {
      return this.$store.state.darkMode;
    },
    snackBar() {
      return this.$store.state.snackBar;
    },
  },
  beforeCreate() {
    const areaChart = JSON.parse(localStorage.getItem("areaChart"));
    const barChart = JSON.parse(localStorage.getItem("barChart"));
    const lineChart = JSON.parse(localStorage.getItem("lineChart"));
    const donutChart = JSON.parse(localStorage.getItem("donutChart"));

    if (areaChart) {
      this.$store.commit("loadChart", areaChart);
    }
    if (barChart) {
      this.$store.commit("loadChart", barChart);
    }
    if (lineChart) {
      this.$store.commit("loadChart", lineChart);
    }
    if (donutChart) {
      this.$store.commit("loadChart", donutChart);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
