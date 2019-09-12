<template>
  <v-card>
    <donut-chart id="donut" :data="donutData" :colors="colors" resize="true" />
  </v-card>
</template>

<script>
import { DonutChart } from "vue-morris";

export default {
  components: {
    DonutChart
  },
  computed: {
    colors() {
      return this.$store.state.donutChart.colors;
    }
  },
  data() {
    return {
      donutData: [{ label: "Red", value: 300 }, { label: "Blue", value: 50 }]
    };
  }
};
</script>

<style scoped>
</style>
