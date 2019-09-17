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
          <v-slider
            :dark="darkMode"
            v-model="hoursToDo"
            min="0"
            max="10"
            label="Number of hour to do today"
          />
          <v-btn @click="clock(Date.now(), true)">{{ clockIn? "Clock'OUT": "Clock'IN" }}</v-btn>
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
    },
    todayStart() {
      const today = Date.now();
      return this.formateDate(today, "start");
    },
    todayEnd() {
      const today = Date.now();
      return this.formateDate(today, "end");
    },
    now() {
      const today = Date.now();
      return this.formateDate(today, "now");
    },
    id() {
      return this.$store.state.user.id;
    }
  },
  data() {
    return {
      value: null,
      hoursToDo: 8,
      startDateTime: null,
      clockIn: false,
      time: null,
      interval: null
    };
  },
  mounted() {
    this.getLastClock();
  },
  methods: {
    sanitize(number) {
      return ("0" + number).slice(-2);
    },
    async getLastClock() {
      const response = await this.$store.dispatch("getClocks", this.id);
      if (response.status !== 200) {
        this.$store.commit(
          "createSnackBarError",
          "An error occured while searching last clock!"
        );
        return;
      }
      response.data.data.sort((d1, d2) => {
        return new Date(d2.time) - new Date(d1.time);
      });
      const todayClock = response.data.data.find(
        d =>
          d.time.split("T")[0] === this.todayStart.split(" ")[0] &&
          d.status === true
      );
      if (!todayClock || !todayClock.status) {
        return;
      }
      const date = new Date(todayClock.time);
      // Remove 2 hours because receive as gmt+2
      this.clock((date.valueOf() - (3600000*2)), false);
    },
    formateDate(time, mode) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = this.sanitize(date.getMonth() + 1);
      const day = this.sanitize(date.getDate());
      let formattedDate;
      if (mode === "start") {
        formattedDate = `${year}-${month}-${day} 00:00:01`;
      } else if (mode === "end") {
        formattedDate = `${year}-${month}-${day} 23:59:59`;
      } else {
        const hours = this.sanitize(date.getHours());
        const secondes = this.sanitize(date.getSeconds());
        const minutes = this.sanitize(date.getMinutes());
        formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;
      }
      return formattedDate;
    },

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
    async sendClock() {
      const payload = {
        id: this.id,
        data: {
          clock: {
            time: this.now,
            status: true,
            user: this.id
          }
        }
      };
      const response = await this.$store.dispatch("createClock", payload);
      if (response.status !== 201) {
        this.$store.commit(
          "createSnackBarError",
          "An error occured while creating clock!"
        );
        return;
      }
    },
    refresh() {},
    clock(date, send) {
      this.clockIn = !this.clockIn;
      if (send) {
        this.sendClock();
      }
      if (this.clockIn) {
        this.startDateTime = date;
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
