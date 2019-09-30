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
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  lg="6"
                  v-for="employee in employees"
                  :key="employee.username"
                >
                  {{ employee.username }} {{ employee.email }} {{ getRole(employee.roleid) }}
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
    confirmUpdateRole(value) {
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
  data() {
    return {
      employee: null,
      dialog: false,
      employees: [
        {
          username: "lol",
          roleid: 1,
          email: "lol@lol.com"
        },
        {
          username: "lul",
          roleid: 2,
          email: "lul@lul.com"
        },
        {
          username: "lal",
          roleid: 3,
          email: "lal@lal.com"
        },
        {
          username: "lil",
          roleid: 1,
          email: "lil@lil.com"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
