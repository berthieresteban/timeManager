<template>
  <div>
    <CreateAccount
      @accountCreated="accountCreated"
      v-show="creatingAccount"
      :dialog="creatingAccount"
      @cancelCreation="cancelCreation"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <v-card>
              <v-card-title>Login</v-card-title>
              <v-card-text>
                <p class="error" v-if="error">{{ error }}</p>
                <v-text-field label="Username" v-model="username"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="createAccount">Create your account</v-btn>
                <v-spacer />
                <v-btn @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateAccount from "./CreateAccount";

export default {
  components: {
    CreateAccount
  },
  data() {
    return {
      username: "",
      creatingAccount: false,
      error: null
    };
  },
  methods: {
    accountCreated() {
      this.$store.commit("createSnackBarSuccess", {text: "Account successfully created!", announcer: this.$announcer})
      this.$router.push(`/workingTimes/${this.$store.state.user.id}`);
      this.creatingAccount = false;
    },
    cancelCreation() {
      this.creatingAccount = false;
    },
    async login() {
      const payload = {
        username: this.username
      };
      const resp = await this.$store.dispatch("getUser", payload);
      if (!resp.data.length) {
        this.error = "Wrong username.";
        return;
      } else {
        this.error = null;
      }
      await this.$store.commit("setUser", resp.data[0]);
      await this.$store.commit("setLogged");
      this.$store.commit("createSnackBarSuccess", {text: `Welcome back ${this.$store.state.user.username} !`, announcer: this.$announcer})
      this.$router.push(`/workingTimes/${this.$store.state.user.id}`);
    },
    createAccount() {
      this.creatingAccount = true;
    }
  }
};
</script>

<style scoped>
</style>
