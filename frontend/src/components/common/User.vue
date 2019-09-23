<template>
  <div>
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
          <v-switch
            v-model="darkModeCopy"
            @mouseover="setAnnouncer(`Switch dark mode ${!darkModeCopy}`)"
          ></v-switch>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="signOut" @mouseover="setAnnouncer('Sign Out')">
          <v-list-item-icon>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div>
        <v-btn text link :to="`/${role}/${id}/clock`">Clock Manager</v-btn>
        <v-btn text link :to="`/${role}/${id}/workingTimes/${id}/${username}`">Working Times</v-btn>
        <v-btn text link :to="`/${role}/${id}/chartManager`">Chart Manager</v-btn>
        <v-btn text link :to="`/${role}/${id}/editAccount`">Edit Account</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    drawer: Boolean,
    clipped: Boolean
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
    },
    role() {
      let role = "";
      switch (this.$store.state.user.roleid) {
        case 1:
          role = "employee";
          break;
        case 2:
          role = "manager";
          break;
        case 3:
          role = "superManager";
          break;
        case 4:
          role = "administrator";
          break;
      }
      return role;
    }
  },
  created() {
    this.drawerCopy = this.drawer;
  },
  data() {
    return {
      drawerCopy: null,
      darkModeCopy: false
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
    setAnnouncer(text) {
      this.$announcer.set(text);
    },
    createUser() {},
    async deleteUser() {
      const response = await this.$store.dispatch("deleteUser", this.id);
      if (response.status === 204) {
        this.$store.commit("createSnackBarSuccess", {
          text: `Accound successfully deleted!`,
          announcer: this.$announcer
        });
        this.$router.push("/login");
      } else {
        this.$store.commit("createSnackBarSuccess", {
          text: `An error occured while deleting you're account!`,
          announcer: this.$announcer
        });
      }
    },
    signOut() {
      this.$store.commit("unsetLogged");
      this.$store.commit("setUser", {});
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
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
