<template>
  <v-card :dark="darkMode">
    <v-list shaped>
      <v-subheader>Working Times</v-subheader>
      <v-list-item v-for="(item, i) in workingTimes" :key="i">
        <v-list-item-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" @mouseover="setAnnouncer(`${item.date}`)">{{ item.date }}</v-col>
              <v-col cols="12" sm="4" @mouseover="setAnnouncer(`${item.in}`)">{{ item.in }}</v-col>
              <v-col cols="12" sm="4" @mouseover="setAnnouncer(`${item.out}`)">{{ item.out }}</v-col>
            </v-row>
          </v-container>
        </v-list-item-content>
        <v-list-item-action>
          <div>
            <v-btn
              icon
              @click="updateWorkingTime(item)"
              @mouseover="setAnnouncer(`modify the working time of ${item.date} start at ${item.in} and end at ${item.out}`)"
            >
              <v-icon color="grey lighten-1">fa-pen</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="deleteWorkingTime(item)"
              @mouseover="setAnnouncer(`delete the working time of ${item.date} start at ${item.in} and end at ${item.out}`)"
            >
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
  props: {
    workingTimes: Array
  },
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
      ]
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    setAnnouncer(text) {
      this.$announcer.set(text);
    },
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
