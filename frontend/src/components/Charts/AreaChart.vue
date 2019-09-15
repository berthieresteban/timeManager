<template>
  <v-card :dark="darkMode">
    <v-card-title>Last Month (Clock'in Clock'out)</v-card-title>
    <area-chart
      v-if="data.length"
      id="area"
      :data="data"
      xkey="date"
      :ykeys="[ 'start', 'end' ]"
      :labels="[ 'start', 'end' ]"
      :line-colors="colors"
      grid="true"
      grid-text-weight="bold"
      resize="true"
    />
    <v-card-text v-else>Havn't worked last year !</v-card-text>
  </v-card>
</template>

<script>
import { AreaChart } from "vue-morris";

export default {
  components: {
    AreaChart
  },
  props: {
    data: Array
  },
  computed: {
    colors() {
      return this.$store.state.areaChart.colors;
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
