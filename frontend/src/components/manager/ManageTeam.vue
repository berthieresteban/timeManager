<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" v-for="i in teams" :key="i.name">
        <v-card :dark="darkMode">
          <v-card-title>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="6">
                Team:
                <h3>{{ i.name }}</h3>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="6">Manager: {{i.manager}}</v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <h3>Employees:</h3>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="4" v-for="e in i.employee" :key="e.id">
                  {{e.username}} (n°{{e.id}})
                  <v-btn icon link :to="`/manager/${id}/editWorkingTimes/${e.id}`">
                    <v-icon color="grey lighten-1">fa-plus</v-icon>
                  </v-btn>
                  <v-btn icon link :to="`/manager/${id}/editWorkingTimes/${e.id}/1`">
                    <v-icon color="grey lighten-1">fa-list</v-icon>
                  </v-btn>
                  <v-btn icon link :to="`/manager/${id}/workingTimes/${e.id}/${e.username}`">
                    <v-icon color="grey lighten-1">fa-chart-bar</v-icon>
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
export default {
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    id() {
      return this.$store.state.user.id;
    }
  },
  mounted() {
    // TODO CALL API TO FETCH TEAMS
  },
  data() {
    return {
      teams: [
        {
          name: "JS",
          manager: "manager",
          employee: [
            {
              id: 1,
              username: "Claude"
            },
            {
              id: 12,
              username: "Gilles"
            },
            {
              id: 10,
              username: "Sophie"
            },
            {
              id: 4,
              username: "Jacques"
            }
          ]
        },
        {
          name: "C++",
          manager: "manager",
          employee: [
            {
              id: 2,
              username: "Jean-Mi"
            },
            {
              id: 7,
              username: "Damien"
            },
            {
              id: 3,
              username: "Caroline"
            },
            {
              id: 8,
              username: "Julie"
            }
          ]
        },
        {
          name: "PHPLOL",
          manager: "manager",
          employee: [
            {
              id: 5,
              username: "Yves"
            },
            {
              id: 6,
              username: "Jean"
            },
            {
              id: 9,
              username: "Yoann"
            },
            {
              id: 13,
              username: "Arnaud"
            },
            {
              id: 15,
              username: "Maxime"
            },
            {
              id: 14,
              username: "Antoine"
            },
            {
              id: 20,
              username: "Karim"
            },
            {
              id: 19,
              username: "Matthieu"
            }
          ]
        }
      ]
    };
  }
};
</script>
