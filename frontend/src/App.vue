<template>
  <div id="app" >
    <v-app :light="!darkMode" :dark="darkMode" :style="{ backgroundColor: getBackgroundColor}">
      <User :clipped="clipped" :drawer="drawer" />
      <v-card>
        <v-app-bar fixed app :light="!darkMode" :dark="darkMode">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <v-icon>{{ drawer? "fa-caret-left": "fa-bars"}}</v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title>Dashboard</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text link to="/workingTimes/1">Working Times</v-btn>
            <v-btn text link to="/workingTime/1">Create Working Time</v-btn>
            <v-btn text link to="/workingTime/2/3">Edit Working Time</v-btn>
            <v-btn text link to="/clock/username">Clock Manager</v-btn>
            <v-btn text link to="/chartManager/1">Chart Manager</v-btn>
          </v-toolbar-items>
        </v-app-bar>
      </v-card>
        <v-content>
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import User from "./components/User";
export default {
  components: {
    User
  },
  computed: {
    getBackgroundColor() {
      return this.darkMode? "#686767": "#FFFFFF";
    },
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {
      drawer: false,
      clipped: false
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
