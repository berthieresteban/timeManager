<template>
  <div>
    <UpdateInformations :dialog="openUpdateUser" @cancelUpdate="cancelUpdate" @endUpdate="endUpdate"/>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawerCopy"
      app
      :light="!darkMode"
      :dark="darkMode"
    >
      <v-list class="myList">
        <v-list-item-title>User Informations</v-list-item-title>
        <v-list-item link two-line>
          <v-list-item-content>
            <v-list-item-title class="title">{{ username }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item>
          <v-switch v-model="darkModeCopy"></v-switch>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="deleteUser">
          <v-list-item-icon>
            <v-icon>fa-trash</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Delete my account</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="updateUser">
          <v-list-item-icon>
            <v-icon>fa-pen</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Update my informations</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="signOut">
          <v-list-item-icon>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="hidden-md-and-up">
        <v-btn text link to="/workingTimes/1">Working Times</v-btn>
        <v-btn text link to="/workingTime/1">Create Working Time</v-btn>
        <v-btn text link to="/workingTime/2/3">Edit Working Time</v-btn>
        <v-btn text link to="/clock/username">Clock Manager</v-btn>
        <v-btn text link to="/chartManager/1">Chart Manager</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UpdateInformations from "./UpdateInformations";

export default {
  name: "User",
  props: {
    drawer: Boolean,
    clipped: Boolean
  },
  components: {
    UpdateInformations
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    username() {
      return this.$store.state.user.username;
    },
    email() {
      return this.$store.state.user.email;
    },
    id() {
      return this.$store.state.user.id;
    }
  },
  created() {
    this.drawerCopy = this.drawer;
  },
  data() {
    return {
      drawerCopy: null,
      darkModeCopy: false,
      openUpdateUser: false
    };
  },
  watch: {
    darkModeCopy() {
      this.$store.commit("turnDarkMode");
    },
    drawer(value) {
      if (value === this.drawerCopy) return;
      this.drawerCopy = this.drawer;
    },
    drawerCopy(value) {
      this.$emit("drawerCopy", value);
    }
  },
  methods: {
    endUpdate() {
      this.openUpdateUser = false;
    },
    createUser() {},
    async deleteUser() {
      const response = await this.$store.dispatch("deleteUser", this.id);
      if (response.status === 204) {
        this.$store.commit(
          "createSnackBarSuccess",
          `Accound successfully deleted!`
        );
        this.$router.push("/login");
      } else {
        this.$store.commit(
          "createSnackBarSuccess",
          `An error occured while deleting you're account!`
        );
      }
    },
    updateUser() {
      this.openUpdateUser = true;
    },
    cancelUpdate() {
      this.openUpdateUser = false;
    },
    getUser() {},
    signOut() {
      this.$store.commit("unsetLogged");
      this.$store.commit("setUser", {});
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myList {
  margin: 25px;
}
</style>
