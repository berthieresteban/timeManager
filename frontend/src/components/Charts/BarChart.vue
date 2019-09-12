<template>
  <v-card>
    <bar-chart
      id="bar"
      :data="barData"
      :xkey="'year'"
      :ykeys="[ 'win' ]"
      :bar-colors="colors"
      grid="true"
      grid-text-weight="bold"
      resize="true"
    />
  </v-card>
</template>

<script>
import { BarChart } from "vue-morris";

export default {
  components: {
    BarChart
  },
  computed: {
    colors() {
      return this.$store.state.barChart.colors;
    }
  },
  data() {
    return {
      barData: [
        { year: "2013", win: 2 },
        { year: "2014", win: 3 },
        { year: "2015", win: 2 },
        { year: "2016", win: 1 }
      ]
    };
  }
};
</script>

<style scoped>
</style>
