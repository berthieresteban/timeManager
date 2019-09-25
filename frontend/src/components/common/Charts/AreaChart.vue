<template>
  <v-card :dark="darkMode">
    <v-card-title>Last Month (Worked Hours)</v-card-title>
    <area-chart
      v-if="data.length"
      id="area"
      :data="data"
      xkey="date"
      :ykeys="[ 'value' ]"
      :labels="[ 'Worked hours' ]"
      :line-colors="colors"
      grid="true"
      grid-text-weight="bold"
    />
    <v-card-text v-else>Havn't worked last month !</v-card-text>
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
