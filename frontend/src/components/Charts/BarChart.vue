<template>
  <v-card :dark="darkMode">
    <v-card-title>Last Week</v-card-title>
    <bar-chart
      v-if="data.length"
      id="bar"
      :data="data"
      :xkey="'date'"
      :ykeys="[ 'value' ]"
      :bar-colors="colors"
      grid="true"
      grid-text-weight="bold"
      resize="true"
    />
    <v-card-text v-else>Havn't worked last week !</v-card-text>
  </v-card>
</template>

<script>
import { BarChart } from "vue-morris";

export default {
  components: {
    BarChart
  },
  props: {
    data: Array
  },
  computed: {
    colors() {
      return this.$store.state.barChart.colors;
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
