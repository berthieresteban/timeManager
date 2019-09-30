<template>
  <v-container>
    <AddTeamMember
      v-if="openAddMember"
      :currentEmployees="currentEmployees"
      :dialog="openAddMember"
      @confirmAddMember="confirmAddMember"
      @cancelAddMember="cancelAddMember"
    />
    <CreateTeam
      v-if="openCreateTeam"
      :dialog="openCreateTeam"
      @confirmCreateTeam="confirmCreateTeam"
      @cancelCreateTeam="cancelCreateTeam"
    />
    <v-row :dark="darkMode">
      <v-col cols="12" sm="12" md="12" lg="6">
        <v-btn @click="createTeam">Create New Team</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" v-for="i of Object.keys(teams)" :key="teams[i].id">
        <v-card :dark="darkMode" :color="teams[i].color">
          <v-card-title>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="6">
                Team:
                <h3>{{ teams[i].name }}</h3>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="6"
              >Manager: {{teams[i].manager?teams[i].manager.username: ''}}</v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <h3>Employees:</h3>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="4" v-for="e in teams[i].members" :key="e.id">
                  {{e.username}} (n°{{e.id}})
                  <v-btn icon link :to="`/superManager/${id}/editWorkingTimes/${e.id}`">
                    <v-icon color="grey lighten-1">fa-plus</v-icon>
                  </v-btn>
                  <v-btn icon link :to="`/superManager/${id}/editWorkingTimes/${e.id}/1`">
                    <v-icon color="grey lighten-1">fa-list</v-icon>
                  </v-btn>
                  <v-btn icon link :to="`/superManager/${id}/workingTimes/${e.id}/${e.username}`">
                    <v-icon color="grey lighten-1">fa-chart-bar</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteMemberFromTeam(i, e)">
                    <v-icon color="grey lighten-1">fa-times-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addMember(i)">Add new member</v-btn>
            <v-btn @click="deleteTeam(i)">Delete Team</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AddTeamMember from "./AddTeamMember";
import CreateTeam from "./CreateTeam";

export default {
  components: {
    AddTeamMember,
    CreateTeam
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    id() {
      return this.$store.state.user.id;
    }
  },
  methods: {
    async confirmCreateTeam(team) {
      const payload = {
        team: team
      };
      const resp = await this.$store.dispatch("createTeam", payload);
      this.teams[resp.data.data.id] = resp.data.data;
      this.teams[resp.data.data.id].members = [];
      this.openCreateTeam = false;
    },
    cancelCreateTeam() {
      this.openCreateTeam = false;
    },
    createTeam() {
      this.openCreateTeam = true;
    },
    cancelAddMember() {
      this.openAddMember = false;
      this.addMemberToTeam = null;
      this.currentEmployees = null;
    },
    async confirmAddMember(employee) {
      this.openAddMember = false;
      const payload = {
        managing: {
          teamId: this.addMemberToTeam,
          employeeId: employee.id,
          isManager: false
        }
      };
      const resp = await this.$store.dispatch("createManaging", payload);
      this.teams[this.addMemberToTeam].members.push(employee);
      this.addMemberToTeam = null;
      this.currentEmployees = null;
    },
    async deleteMemberFromTeam(i, e) {
      let managingId, resp;
      try {
        resp = await this.$store.dispatch("getTeamUser", { id: e.id });
        for (let j of resp.data.data) {
          if (j.teamId.toString() === i) {
            managingId = j.id;
          }
        }
        resp = await this.$store.dispatch("deleteMemberFromTeam", {
          id: managingId
        });

        this.teams[i].members = this.teams[i].members.filter(
          em => em.id != e.id
        );
      } catch (error) {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while deleting user from team.",
          announcer: this.$announcer
        });
      }
    },
    async addMember(i) {
      this.openAddMember = true;
      this.addMemberToTeam = i;
      this.currentEmployees = this.teams[i].members;
    },
    async deleteTeam(i) {
      try {
        const resp = await this.$store.dispatch("deleteTeam", { id: i });
        const teamss = Object.assign({}, this.teams);
        delete teamss[i];
        this.teams = teamss;
      } catch (error) {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while deleting team.",
          announcer: this.$announcer
        });
      }
    }
  },
  async beforeCreate() {
    let resp = null,
      resp2 = null;
    let teamss = {};
    try {
      resp = await this.$store.dispatch("getTeams");
      for (let i of resp.data.data) {
        teamss[i.id] = i;
        teamss[i.id].members = [];
      }
      for (let i of Object.keys(teamss)) {
        resp = await this.$store.dispatch("getTeamMembers", { id: i });
        for (let j of resp.data.data) {
          resp2 = await this.$store.dispatch("getUserByID", j.employeeId);
          if (j.isManager) {
            teamss[i].manager = resp2.data;
          } else {
            teamss[i].members.push(resp2.data);
          }
        }
      }
      this.teams = teamss;
    } catch (error) {
      this.$store.commit("createSnackBarError", {
        text: `An error occured while fetching teams.`,
        announcer: this.$announcer
      });
    }
  },
  data() {
    return {
      teams: {},
      openAddMember: false,
      openCreateTeam: false,
      currentEmployees: []
    };
  }
};
</script>
