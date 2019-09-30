<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card :dark="darkMode">
        <v-card-title>
          <span class="headline">Create New Team</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-color-picker label="Color" hide-inputs :dark="darkMode" v-model="color"></v-color-picker>
          <v-card-actions>
            <v-btn @click="cancel">Cancel</v-btn>
            <v-spacer/>
            <v-btn @click="confirm">Confirm</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    cancel() {
      this.$emit("cancelCreateTeam");
    },
    confirm() {
      this.$emit("confirmCreateTeam", {name: this.name, color: this.color});
    }
  },
  data() {
    return {
      name: "",
      color: ""
    };
  }
};
</script>
<style scoped>
</style>
