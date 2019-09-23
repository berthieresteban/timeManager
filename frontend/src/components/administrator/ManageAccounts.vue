<template>
  <v-container>
    <CreateAccount
      :dialog="dialog"
      @cancelCreation="cancelCreation"
      @accountCreated="accountCreated"
    />
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card :dark="darkMode">
          <v-card-title>
            <v-btn @click="dialog = !dialog">Create Account</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" :sm="sort[btn].size" v-for="btn in Object.keys(sort)" :key="btn">
                  <v-btn class="ma-2" text @click="sortBy(btn)">
                    {{ sort[btn].text }}
                    <v-icon dark right>fa-sort-amount-{{sort[btn].up? 'up': 'down'}}-alt</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="2">
                  <span class="username">DELETE</span>
                </v-col>
              </v-row>
              <v-row v-for="employee in employees" :key="employee.username">
                <v-col cols="12" sm="3">
                  <span class="username">{{ employee.username }}</span>
                </v-col>
                <v-col cols="12" sm="3">{{ employee.email }}</v-col>
                <v-col cols="12" sm="2">{{ getRole(employee.roleid) }}</v-col>
                <v-col cols="12" sm="2">{{ employee.id }}</v-col>
                <v-col cols="12" sm="2">
                  <v-btn icon @click="deleteAccount(employee)">
                    <v-icon color="grey lighten-1">fa-times-circle</v-icon>
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
import CreateAccount from "./CreateAccount";

export default {
  components: {
    CreateAccount
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    sortBy(prop) {
      if (prop === "username" || prop === "email") {
        this.employees = this.employees.sort((e1, e2) => {
          if (this.sort[prop].up) {
            return e1[prop].localeCompare(e2[prop]);
          } else {
            return e2[prop].localeCompare(e1[prop]);
          }
        });
      } else {
        this.employees = this.employees.sort((e1, e2) => {
          if (this.sort[prop].up) {
            return e1[prop] - e2[prop];
          } else {
            return e2[prop] - e1[prop];
          }
        });
      }
      this.sort[prop].up = !this.sort[prop].up;
    },
    cancelCreation() {
      this.dialog = false;
    },
    accountCreated() {
      this.$store.commit("createSnackBarSuccess", {
        text: `Account created successfully !`,
        announcer: this.$announcer
      });
      this.fetchUsers();
      this.dialog = false;
    },
    async deleteAccount(employee) {
      const response = await this.$store.dispatch("deleteUser", employee.id);
      if (response.status !== 204) {
        this.$store.commit("createSnackBarError", {
          text: `An error occured while deleting account !`,
          announcer: this.$announcer
        });
      } else {
        this.employees = this.employees.filter(e => e.id !== employee.id);
        this.$store.commit("createSnackBarSuccess", {
          text: `Account deleted successfully !`,
          announcer: this.$announcer
        });
      }
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
    },
    async fetchUsers() {
      const resp = await this.$store.dispatch("getAllUsers");
      this.employees = resp.data;
    }
  },
  mounted() {
    this.fetchUsers();
  },
  data() {
    return {
      sort: {
        username: {
          text: "Username",
          up: true,
          size: "3"
        },
        email: {
          text: "Email",
          up: true,
          size: "3"
        },
        roleid: {
          text: "Role",
          up: true,
          size: "2"
        },
        id: {
          text: "Identifiant",
          up: true,
          size: "2"
        }
      },
      dialog: false,
      employees: []
    };
  }
};
</script>

<style scoped>
.username {
  font-weight: bold;
}
</style>
