<template>
  <v-dialog v-model="openedUpdateDialog" persistent max-width="600">
    <v-card :dark="darkMode">
      <v-card-title class="headline">Updating Working Time</v-card-title>
      <v-card-text>
        <h3>Updating working time for user {{ currentItem.user }}</h3>
        <v-row>
          <v-col cols="12" sm="6" md="4"
            @mouseover="setAnnouncer(`set new date, currently ${date}`)"
          >
            <v-text-field v-model="date" label="Date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4"
            @mouseover="setAnnouncer(`set new start hour, currently ${start}`)"
          >
            <v-text-field v-model="start" label="Clock'in"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4"
            @mouseover="setAnnouncer(`set new end hour, currently ${end}`)"
          >
            <v-text-field v-model="end" label="Clock'out"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="handleCancel" @mouseover="setAnnouncer('cancel')">Cancel</v-btn>
        <v-btn @click="handleConfirm" @mouseover="setAnnouncer('confirm modification')">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UpdateWorkingTime",
  props: {
    currentItem: Object,
    openedUpdateDialog: Boolean
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {
      date: null,
      start: null,
      end: null
    };
  },
  mounted() {
    this.date = this.currentItem.date;
    this.start = this.currentItem.in;
    this.end = this.currentItem.out;
  },
  methods: {
    setAnnouncer(text) {
      this.$announcer.set(text);
    },
    handleConfirm() {
      const payload = {
        id: this.currentItem.id,
        data: {
          workingtime: {
            start: `${this.date} ${this.start}`,
            end: `${this.date} ${this.end}`
          }
        }
      };
      this.$emit("confirmed", payload);
    },
    handleCancel() {
      this.$emit("cancelled");
    }
  }
};
</script>
