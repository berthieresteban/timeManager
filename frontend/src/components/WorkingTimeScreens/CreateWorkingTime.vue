<template>
  <v-container :dark="darkMode" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-menu
          v-model="dateMenu"
          :dark="darkMode"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :dark="darkMode"
              v-model="datePicker"
              label="Select the date of the working time"
              prepend-icon="fa-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker :dark="darkMode" v-model="datePicker" @input="dateMenu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="6">
        <v-menu
          ref="startMenu"
          :dark="darkMode"
          v-model="startMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="startTime"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startTime"
              :dark="darkMode"
              label="Select the start hour of working time"
              prepend-icon="far fa-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="startMenu"
            :dark="darkMode"
            v-model="startTime"
            @click:minute="$refs.startMenu.save(startTime)"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="6">
        <v-menu
          ref="endMenu"
          :dark="darkMode"
          v-model="endMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="endTime"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endTime"
              :dark="darkMode"
              label="Select the end hour of working time"
              prepend-icon="fas fa-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="endMenu"
            :dark="darkMode"
            v-model="endTime"
            @click:minute="$refs.endMenu.save(endTime)"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-btn :dark="darkMode" @click="handleCreateWorkingTime">Create working time</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      datePicker: null,
      startPicker: null,
      endPicker: null,
      dateMenu: false,
      startMenu: false,
      endMenu: false,
      startTime: null,
      endTime: null
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    handleCreateWorkingTime() {
      this.$emit("createWorkingTime");
    }
  }
};
</script>

<style scoped>
</style>
