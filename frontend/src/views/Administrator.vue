<template>
  <div>
    <User @drawerCopy="drawerCopy" :clipped="clipped" :drawer="drawer" />
    <v-card>
      <v-app-bar fixed app :light="!darkMode" :dark="darkMode">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          @mouseover="setAnnouncer(`${drawer? 'close': 'open'} the sidebar`)"
        >
          <v-icon>{{ drawer? "fa-caret-left": "fa-bars"}}</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>Administrator TimeManager</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            @mouseover="setAnnouncer('Go to manage employees')"
            text
            link
            :to="`/administrator/${id}/manageAccounts`"
          >Manage Accounts</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </v-card>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import User from "../components/common/User";

export default {
  components: {
    User
  },
  computed: {
    getBackgroundColor() {
      return this.darkMode ? "#686767" : "#FFFFFF";
    },
    darkMode() {
      return this.$store.state.darkMode;
    },
    logged() {
      return this.$store.state.logged;
    },
    snackBar() {
      return this.$store.state.snackBar;
    },
    id() {
      return this.$store.state.user.id;
    },
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    setAnnouncer(text) {
      this.$announcer.set(text);
    },
    drawerCopy(value) {
      if (value === this.drawer) return;
      this.drawer = value;
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
