<template>
  <div class="hello">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-progress-circular
            :color="getColor"
            :rotate="360"
            :size="300"
            :width="50"
            :value="value"
          >{{ getText }}</v-progress-circular>
        </v-col>
        <v-col cols="12" sm="12">
          <v-slider :dark="darkMode" v-model="hoursToDo" min="0" max="10" label="Number of hour to do today" />
          <v-btn @click="clock">{{ clockIn? "Clock'OUT": "Clock'IN" }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "ClockManager",
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    getColor() {
      return this.darkMode ? "white" : "dark";
    },
    getText() {
      return this.clockIn ? this.time : "Not clocked in!";
    }
  },
  data() {
    return {
      hoursToDo: 1,
      value: null,
      startDateTime: null,
      clockIn: false,
      time: null,
      interval: null
    };
  },
  mounted() {},
  methods: {
    setTime() {
      const now = Date.now();
      const diff = now - this.startDateTime;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff - hours * 3600000) / 60000);
      const seconds = parseInt(
        (diff - hours * 3600000 - minutes * 60000) / 1000
      );
      const time = `${hours}:${minutes}:${seconds}`;
      const timeInSeconds = diff / 1000;
      const timeToDoInSeconds = this.hoursToDo * 3600;
      this.value = (timeInSeconds / timeToDoInSeconds) * 100;
      this.time = time;
    },
    refresh() {},
    clock() {
      this.clockIn = !this.clockIn;
      if (this.clockIn) {
        this.startDateTime = Date.now();
        this.interval = setInterval(() => {
          this.setTime();
        }, 1000);
      } else {
        this.startDateTime = null;
        this.time = null;
        this.value = null;
        clearInterval(this.interval);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
