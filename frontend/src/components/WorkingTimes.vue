<template>
  <div>
    <v-container>
      <v-row >
        <v-col v-for="chart in charts" :key="chart.position" :cols="getSize(chart)">
          <AreaChart v-if="checkType(chart, 'areaChart')" />
          <DonutChart v-if="checkType(chart, 'donutChart')" />
          <BarChart v-if="checkType(chart, 'barChart')" />
          <LineChart v-if="checkType(chart, 'lineChart')" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AreaChart from "./Charts/AreaChart";
import DonutChart from "./Charts/DonutChart";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";

export default {
  name: "WorkingTimes",
  components: {
    DonutChart,
    LineChart,
    BarChart,
    AreaChart
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
    },
    charts() {
      const charts = [];
      charts[this.areaChart.position] = this.areaChart;
      charts[this.barChart.position] = this.barChart;
      charts[this.donutChart.position] = this.donutChart;
      charts[this.lineChart.position] = this.lineChart;
      return charts;
    }
  },
  data() {
    return {};
  },
  methods: {
    checkType(chart, type) {
      return chart.type === type && chart.displayed;
    },
    getSize(chart) {
      return chart.displayed ? chart.size : 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
