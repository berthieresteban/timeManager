<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          <area-chart
          id="area"
          :data="areaData"
          xkey="year"
          :ykeys="[ 'a', 'b' ]"
          :labels="[ 'Serie A', 'Serie B' ]"
          :line-colors="[ '#FF6384', '#36A2EB' ]"
          grid="true"
          grid-text-weight="bold"
          resize="true"
          hide-hover="always"
          />
        </v-col>
        <v-col cols="6">
          <donut-chart
          id="donut"
          :data="donutData"
          :colors="[ '#FF6384', '#36A2EB', '#FFCE56' ]"
          resize="true"
          />
        </v-col>

        <v-col cols="6">
          <bar-chart
            id="bar"
            :data="barData"
            :xkey="'year'"
            :ykeys="[ 'and', 'ios', 'win' ]"
            :bar-colors="[ '#FF6384', '#36A2EB', '#FFCE56' ]"
            grid="true"
            grid-text-weight="bold"
            resize="true"
          />
        </v-col>
        <v-col cols="6">
          <line-chart
            id="line"
            :data="lineData"
            xkey="year"
            :ykeys="[ 'a', 'b' ]"
            :line-colors="[ '#FF6384', '#36A2EB' ]"
            grid="true"
            grid-text-weight="bold"
            resize="true"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DonutChart, LineChart, BarChart, AreaChart } from "vue-morris";

export default {
  name: "WorkingTimes",
  components: {
    DonutChart,
    LineChart,
    BarChart,
    AreaChart
  },
  props: {
    msg: String
  },
  data() {
    return {
      areaData: [
        { year: "2013", a: 30, b: 5 },
        { year: "2014", a: 25, b: 15 },
        { year: "2015", a: 29, b: 25 },
        { year: "2016", a: 50, b: 20 }
      ],
      lineData: [
        { year: "2013", a: 10, b: 5 },
        { year: "2014", a: 40, b: 15 },
        { year: "2015", a: 20, b: 25 },
        { year: "2016", a: 30, b: 20 }
      ],
      donutData: [
        { label: "Red", value: 300 },
        { label: "Blue", value: 50 },
        { label: "Yellow", value: 100 }
      ],
      barData: [
        { year: "2013", and: 10, ios: 5, win: 2 },
        { year: "2014", and: 10, ios: 15, win: 3 },
        { year: "2015", and: 20, ios: 25, win: 2 },
        { year: "2016", and: 30, ios: 20, win: 1 }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
