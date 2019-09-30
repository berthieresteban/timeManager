<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" lg="6" @mouseover="setAnnouncer(`Save changes`)">
        <v-btn @click="handleSave">Save</v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" @mouseover="setAnnouncer(`Default settings`)">
        <v-btn @click="handleReinit">Default Settings</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="6">
        <ChartManagement
          :title="'Area Chart'"
          :chart="areaChart.type"
          @handleDisplayedChange="handleDisplayedChange"
          @handleSizeChange="handleSizeChange"
          @handlePositionChange="handlePositionChange"
          @handleColorsChange="handleColorsChange"
        />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6">
        <ChartManagement
          :title="'Bar Chart'"
          :chart="barChart.type"
          @handleDisplayedChange="handleDisplayedChange"
          @handleSizeChange="handleSizeChange"
          @handlePositionChange="handlePositionChange"
          @handleColorsChange="handleColorsChange"
        />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6">
        <ChartManagement
          :title="'Donut Chart'"
          :chart="donutChart.type"
          @handleDisplayedChange="handleDisplayedChange"
          @handleSizeChange="handleSizeChange"
          @handlePositionChange="handlePositionChange"
          @handleColorsChange="handleColorsChange"
        />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6">
        <ChartManagement
          :title="'Line Chart'"
          :chart="lineChart.type"
          @handleDisplayedChange="handleDisplayedChange"
          @handleSizeChange="handleSizeChange"
          @handlePositionChange="handlePositionChange"
          @handleColorsChange="handleColorsChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChartManagement from "./Charts/ChartManagement";

export default {
  name: "ChartManager",
  components: {
    ChartManagement
  },
  computed: {
    areaChart() {
      return this.$store.state.areaChart;
    },
    barChart() {
      return this.$store.state.barChart;
    },
    lineChart() {
      return this.$store.state.lineChart;
    },
    donutChart() {
      return this.$store.state.donutChart;
    }
  },
  methods: {
    setAnnouncer(text) {
      this.$announcer.set(text);
    },
    handleReinit() {
      this.$store.commit('reinitCharts');
    },
    handleSave() {
      localStorage.setItem("areaChart", JSON.stringify(this.areaChart));
      localStorage.setItem("barChart", JSON.stringify(this.barChart));
      localStorage.setItem("lineChart", JSON.stringify(this.lineChart));
      localStorage.setItem("donutChart", JSON.stringify(this.donutChart));
    },
    handleColorsChange(params) {
      this.$store.commit("setChartColors", params);
    },
    handleSizeChange(params) {
      this.$store.commit("setChartSize", params);
    },
    handleDisplayedChange(params) {
      this.$store.commit("setChartDisplayed", params);
    },
    handlePositionChange(params) {
      this.$store.commit("setChartPosition", params);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
