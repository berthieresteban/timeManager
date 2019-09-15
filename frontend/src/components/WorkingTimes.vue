<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="chart in charts" :key="chart.position" :cols="getSize(chart)">
          <AreaChart :data="areaData" v-if="checkType(chart, 'areaChart')" />
          <DonutChart :data="donutData" v-if="checkType(chart, 'donutChart')" />
          <BarChart :data="barData" v-if="checkType(chart, 'barChart')" />
          <LineChart :data="lineData" v-if="checkType(chart, 'lineChart')" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AreaChart from "./Charts/AreaChart";
import DonutChart from "./Charts/DonutChart";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";

export default {
  name: "WorkingTimes",
  components: {
    DonutChart,
    LineChart,
    BarChart,
    AreaChart
  },
  computed: {
    id() {
      return this.$route.params.userID;
    },
    areaChart() {
      return this.$store.state.areaChart;
    },
    barChart() {
      return this.$store.state.barChart;
    },
    lineChart() {
      return this.$store.state.lineChart;
    },
    donutChart() {
      return this.$store.state.donutChart;
    },
    today() {
      const today = Date.now();
      return this.formateDate(today);
    },
    yesterday() {
      const today = new Date();
      const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      return this.formateDate(yesterday);
    },
    lastWeek() {
      const today = new Date();
      const lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );
      return this.formateDate(lastWeek);
    },
    lastMonth() {
      const today = new Date();
      const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
      return this.formateDate(lastMonth);
    },
    lastYear() {
      const today = new Date();
      const lastMonth = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
      return this.formateDate(lastMonth);
    },
    charts() {
      const charts = [];
      charts[this.areaChart.position] = this.areaChart;
      charts[this.barChart.position] = this.barChart;
      charts[this.donutChart.position] = this.donutChart;
      charts[this.lineChart.position] = this.lineChart;
      return charts;
    }
  },
  data() {
    return {
      workingTimes: [],
      areaData: [],
      barData: [],
      donutData: [],
      lineData: []
    };
  },
  async mounted() {
    const response = await this.$store.dispatch("getWorkingTimes", {
      id: this.id,
      start: this.today,
      end: this.lastWeek
    });
    this.workingTimes = response.data.data;
    this.setupDonutData();
    this.setupBarData();
    this.setupLineData();
    this.setupAreaData();
  },
  methods: {
    getWorkedHours(workingTime) {
      const startHours = workingTime.start.split("T")[1].split("Z")[0];
      const endHours = workingTime.end.split("T")[1].split("Z")[0];
      const startToint = this.timeToInt(startHours);
      const endToint = this.timeToInt(endHours);
      const diff = endToint - startToint;
      return diff / 3600;
    },
    timeToInt(time) {
      const hours = time.split(":")[0] * 3600;
      const minutes = time.split(":")[1] * 60;
      const seconds = parseInt(time.split(":")[2]);
      const total = hours + minutes + seconds;
      return total;
    },
    setupBarData() {
      const lastWeek = this.workingTimes.filter(
        d => d.start.split("T")[0] >= this.lastWeek.split(" ")[0]
      );
      if (!lastWeek.length) {
        this.barData = [];
        return;
      }
      lastWeek.sort((d1, d2) => {
        return new Date(d1.start) - new Date(d2.start);
      });
      this.barData = lastWeek.map(d => ({
        value: this.getWorkedHours(d),
        date: d.start.split("T")[0]
      }));
    },
    setupDonutData() {
      const workedYesterday = this.workingTimes.find(
        d => d.start.split("T")[0] === this.yesterday.split(" ")[0]
      );
      if (!workedYesterday) {
        this.donutData = [];
        return;
      }
      const hoursDone = this.getWorkedHours(workedYesterday);
      const hoursToDo = 9;
      const remainingHours = hoursToDo - hoursDone;
      this.donutData = [
        { label: "Hours done", value: hoursDone },
        { label: "Hours to do", value: remainingHours }
      ];
    },
    setupLineData() {
      const lastMonth = this.workingTimes.filter(
        d => d.start.split("T")[0] >= this.lastMonth.split(" ")[0]
      );
      if (!lastMonth.length) {
        this.lineData = [];
        return;
      }
      lastMonth.sort((d1, d2) => {
        return new Date(d1.start) - new Date(d2.start);
      });
      this.lineData = lastMonth.map(d => ({
        value: this.getWorkedHours(d),
        date: d.start.split("T")[0]
      }));
    },
    setupAreaData() {
      const lastMonth = this.workingTimes.filter(
        d => d.start.split("T")[0] >= this.lastYear.split(" ")[0]
      );
      if (!lastMonth.length) {
        this.areaData = [];
        return;
      }
      lastMonth.sort((d1, d2) => {
        return new Date(d1.start) - new Date(d2.start);
      });

      this.areaData = lastMonth.map(d => {
        const start =
          this.timeToInt(d.start.split("T")[1].split("Z")[0]) / 3600;
        const end = this.timeToInt(d.end.split("T")[1].split("Z")[0]) / 3600;
        console.log(start, end);
        return {
          start: start,
          end: end,
          date: d.start.split("T")[0]
        };
      });
    },
    sanitize(number) {
      return ("0" + number).slice(-2);
    },
    formateDate(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = this.sanitize(date.getMonth() + 1);
      const day = this.sanitize(date.getDate());
      const hours = this.sanitize(date.getHours());
      const secondes = this.sanitize(date.getSeconds());
      const minutes = this.sanitize(date.getMinutes());
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;
      return formattedDate;
    },
    checkType(chart, type) {
      return chart.type === type && chart.displayed;
    },
    getSize(chart) {
      return chart.displayed ? chart.size : 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
