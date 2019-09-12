<template>
  <v-card>
    <line-chart
      id="line"
      :data="lineData"
      xkey="year"
      :ykeys="[ 'b' ]"
      :line-colors="colors"
      grid="true"
      grid-text-weight="bold"
      resize="true"
    />
  </v-card>
</template>

<script>
import { LineChart } from "vue-morris";

export default {
  components: {
    LineChart
  },
  computed: {
    colors() {
      return this.$store.state.lineChart.colors;
    }
  },
  data() {
    return {
      lineData: [
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
