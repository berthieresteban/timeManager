<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" v-for="i in teams" :key="i.name">
        <v-card :dark="darkMode" :color="i.color">
          <v-card-title>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="6">
                Team:
                <h3>{{ i.name }}</h3>
              </v-col>
              <!-- <v-col cols="12" sm="12" md="12" lg="6">Manager: {{i.manager}}</v-col> -->
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <h3>Employees:</h3>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="4" v-for="e in i.members" :key="e.id">
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
  async created() {
    try {
      let resp = null,
        resp2 = null,
        teamss = {};
      resp = await this.$store.dispatch("getManagerTeams", { id: this.id });
      for (let i of resp.data.data) {
        teamss[i.id] = { members: [] };
      }

      for (let i of Object.keys(teamss)) {
        resp = await this.$store.dispatch("getTeam", { id: i });
        teamss[i].color = resp.data.data.color;
        teamss[i].name = resp.data.data.name;
      }
      for (let i of Object.keys(teamss)) {
        resp = await this.$store.dispatch("getTeamMembers", { id: i });
        for (let j of resp.data.data) {
          resp2 = await this.$store.dispatch("getUserByID", j.employeeId);
          if (resp2.data.id !== this.id) {
            teamss[i].members.push(resp2.data);
          }
        }
      }
      this.teams = teamss;
    } catch (error) {
      this.$store.commit("createSnackBarError", {
        text: "An error occured while fetching teams.",
        announcer: this.$announcer
      });
    }
  },
  data() {
    return {
      teams: {}
    };
  }
};
</script>
