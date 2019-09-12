<template>
  <v-card :dark="darkMode">
    <area-chart
      id="area"
      :data="areaData"
      xkey="year"
      :ykeys="[ 'b' ]"
      :labels="[ 'Serie B' ]"
      :line-colors="colors"
      grid="true"
      grid-text-weight="bold"
      resize="true"
      hide-hover="always"
    />
  </v-card>
</template>

<script>
import { AreaChart } from "vue-morris";

export default {
  components: {
    AreaChart
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
    return {
      areaData: [
        { year: "2013", b: 5 },
        { year: "2014", b: 15 },
        { year: "2015", b: 25 },
        { year: "2016", b: 20 }
      ]
    };
  }
};
</script>

<style scoped>
</style>
