<template>
  <v-card :dark="darkMode">
    <v-card-title>Last Month (Clock'In / Clock'Out)</v-card-title>
    <line-chart
      v-if="data.length"
      id="line"
      :data="data"
      xkey="date"
      :ykeys="[ 'start', 'end' ]"
      :labels="['Clock\'in', 'Clock\'out']"
      :line-colors="colors"
      grid="true"
      grid-text-weight="bold"
      resize="true"
    />
    <v-card-text v-else>Havn't worked last month !</v-card-text>
  </v-card>
</template>

<script>
import { LineChart } from "vue-morris";

export default {
  components: {
    LineChart
  },
  props: {
    data: Array
  },
  computed: {
    colors() {
      return this.$store.state.lineChart.colors;
    },
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
