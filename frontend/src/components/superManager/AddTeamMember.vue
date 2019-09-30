<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card :dark="darkMode">
        <v-card-title>
          <span class="headline">Add member</span>
        </v-card-title>
        <v-card-text>
          <v-select v-model="value" :items="employees" filled label="Select Member"></v-select>
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
    dialog: Boolean,
    currentEmployees: Array
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    cancel() {
      this.$emit("cancelAddMember");
    },
    confirm() {
      this.$emit("confirmAddMember", this.value);
    },
    alreadyInTeam(employee) {
      for (let i in this.currentEmployees) {
        if (employee.id === this.currentEmployees[i].id) {
          return true;
        }
      }
      return false;
    }
  },
  async mounted() {
    this.value = null;
    const resp = await this.$store.dispatch("getAllUsers");
    this.employees = resp.data
      .filter(em => {
        return em.roleid === 1 && !this.alreadyInTeam(em);
      })
      .map(em => ({ value: em, text: em.username }));
  },
  data() {
    return {
      value: null,
      employees: []
    };
  }
};
</script>
<style scoped>
</style>
