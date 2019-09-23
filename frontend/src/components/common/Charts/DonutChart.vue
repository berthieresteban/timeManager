<template>
  <v-card :dark="darkMode">
    <v-card-title>Yesterday</v-card-title>
    <donut-chart v-if="data.length" id="donut" :data="data" :colors="colors" resize="true" />
    <v-card-text v-else>
      Havn't worked yesterday !
    </v-card-text>
  </v-card>
</template>

<script>
import { DonutChart } from "vue-morris";

export default {
  components: {
    DonutChart
  },
  props:{
    data: Array
  },
  computed: {
    colors() {
      return this.$store.state.donutChart.colors;
    },
    darkMode() {
      return this.$store.state.darkMode;
    }
  }
};
</script>

<style scoped>
</style>
