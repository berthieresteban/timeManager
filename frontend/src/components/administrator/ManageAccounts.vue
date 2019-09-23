<template>
  <v-container>
    <CreateAccount :dialog="Dialog" />
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="6">
        <v-card :dark="darkMode">
          <v-card-title>
            <v-btn @click="dialog = !dialog">Create Account</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="6" v-for="employee in employees" :key="employee.username">
                  {{ employee }} {{ employee.email }} {{ getRole(employee.roleid) }}
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
  methods: {
    deleteAccount(employee) {
      console.log(employee);
    },
    getRole() {
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
