<template>
  <v-card :dark="darkMode">
    <v-list shaped>
      <v-subheader>Working Times</v-subheader>
      <v-list-item v-for="(item, i) in workingTimes" :key="i">
        <v-list-item-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">{{ item.date }}</v-col>
              <v-col cols="12" sm="4">{{ item.in }}</v-col>
              <v-col cols="12" sm="4">{{ item.out }}</v-col>
            </v-row>
          </v-container>
        </v-list-item-content>
        <v-list-item-action>
          <div>
            <v-btn icon @click="updateWorkingTime(item)">
              <v-icon color="grey lighten-1">fa-pen</v-icon>
            </v-btn>
            <v-btn icon @click="deleteWorkingTime(item)">
              <v-icon color="grey lighten-1">fa-trash</v-icon>
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      currentItem: null,
      item: null,
      headers: [
        {
          text: "Date",
          align: "left",
          sortable: true,
          value: "date"
        },
        { text: "Clock'in", value: "in" },
        { text: "Clock'out", value: "out" }
      ],
      workingTimes: [
        {
          user: "test",
          date: "2019-09-02",
          in: "09:32:37",
          out: "17:28:48"
        },
        {
          user: "test",
          date: "2019-09-03",
          in: "09:34:37",
          out: "17:36:48"
        },
        {
          user: "test",
          date: "2019-09-04",
          in: "09:31:37",
          out: "17:22:48"
        },
        {
          user: "test",
          date: "2019-09-05",
          in: "09:45:37",
          out: "17:52:48"
        },
        {
          user: "test",
          date: "2019-09-06",
          in: "09:12:37",
          out: "17:39:48"
        }
      ]
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    updateWorkingTime(item) {
      this.$emit("updateWorkingTime", item);
    },
    deleteWorkingTime(item) {
      this.$emit("deleteWorkingTime", item);
    }
  }
};
</script>

<style scoped>
</style>
