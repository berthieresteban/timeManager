<template>
  <v-container>
    <ChangeRole
      v-if="dialog"
      :dialog="dialog"
      :employee="employee"
      @cancelUpdateRole="cancelUpdateRole"
      @confirmUpdateRole="confirmUpdateRole"
    />
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card :dark="darkMode">
          <v-card-text>
            <v-container>
              <v-row v-for="employee in employees" :key="employee.username">
                <v-col cols="12" sm="6" md="3" lg="3">{{ employee.username }}</v-col>
                <v-col cols="12" sm="6" md="3" lg="3">{{ employee.email }}</v-col>
                <v-col cols="12" sm="6" md="3" lg="3">{{ getRole(employee.roleid) }}</v-col>
                <v-col cols="12" sm="6" md="3" lg="3">
                  <v-btn icon @click="changeRoleId(employee)">
                    <v-icon color="grey lighten-1">fa-sort</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChangeRole from "./ChangeRole";

export default {
  components: {
    ChangeRole
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    changeRoleId(employee) {
      this.employee = employee;
      this.dialog = true;
    },
    cancelUpdateRole() {
      this.employee = null;
      this.dialog = false;
    },
    async confirmUpdateRole(value) {
      const payload = {
        id: this.employee.id,
        user: {
          user: {
            roleid: value
          }
        }
      };
      const resp = await this.$store.dispatch("updateUserSuperManager", payload);
      this.employee = null;
      this.dialog = false;
    },
    getRole(roleid) {
      switch (roleid) {
        case 1:
          return "Employee";
        case 2:
          return "Manager";
        case 3:
          return "Super Manager";
        case 4:
          return "Administrator";
      }
    }
  },
  async created() {
    try {
      const resp = await this.$store.dispatch("getAllUsers");
      this.employees = resp.data;
    } catch (error) {
      this.$store.commit("createSnackBarError", {
        text: "An error occured while deleting team.",
        announcer: this.$announcer
      });
    }
  },
  data() {
    return {
      employee: null,
      dialog: false,
      employees: []
    };
  }
};
</script>

<style scoped>
</style>
