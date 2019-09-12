<template>
  <v-navigation-drawer
    :clipped="clipped"
    v-model="drawer"
    enable-resize-watcher
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
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>fa-trash</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Delete my account</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>fa-pen</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Update my informations</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "User",
  props: {
    drawer: Boolean,
    clipped: Boolean,
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {
      email: "test@test.com",
      username: "test",
      darkModeCopy: false
    };
  },
  watch: {
    darkModeCopy() {
      this.$store.commit('turnDarkMode')
    }
  },
  methods: {
    createUser() {},
    deleteUser() {},
    updateUser() {},
    getUser() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myList {
  margin: 25px;
}
</style>
