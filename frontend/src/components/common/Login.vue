<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <v-card :dark="darkMode">
              <v-card-title>Login</v-card-title>
              <v-card-text>
                <p class="error" v-if="error">{{ error }}</p>
                <v-text-field label="Username" v-model="username"></v-text-field>
                <v-text-field
                  :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  v-model="password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
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
export default {
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      error: null
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userID");
    if (!id || id === "undefined" || !token || token === "undefined") {
      return;
    }
    try {
      await this.$store.commit("setToken", token);
      const resp2 = await this.$store.dispatch("getUserByID", id);
      await this.$store.commit("setUser", resp2.data);
      await this.$store.commit("setLogged");
      this.$store.commit("createSnackBarSuccess", {
        text: `Welcome back ${this.$store.state.user.username} !`,
        announcer: this.$announcer
      });
      let role = this.getRole(resp2.data.roleid);
      this.$router.push(`/${role}/${this.$store.state.user.id}`).catch(e => {});
    } catch (error) {
      this.$store.commit("createSnackBarError", {
        text: `An error occured while using old token.`,
        announcer: this.$announcer
      });
    }
  },
  methods: {
    getRole(roleid) {
      let role;
      switch (roleid) {
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
    },
    async hack() {
      const payload = {
        auth: {
          username: "admin",
          password: "admin"
        }
      };
      try {
        const resp = await this.$store.dispatch("login", payload);
        if (!resp.status) {
          this.error = "Wrong username or password.";
          return;
        } else {
          this.error = null;
        }
        await this.$store.commit("setToken", resp.token);
        localStorage.setItem("token", resp.token);
      } catch (e) {}
    },
    async login() {
      const payload = {
        auth: {
          username: this.username,
          password: this.password
        }
      };
      try {
        const resp = await this.$store.dispatch("login", payload);
        if (!resp.status) {
          this.error = "Wrong username or password.";
          return;
        } else {
          this.error = null;
        }
        await this.$store.commit("setToken", resp.token);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("userID", resp.user);
        const resp2 = await this.$store.dispatch("getUserByID", resp.user);
        await this.$store.commit("setUser", resp2.data);
        await this.$store.commit("setLogged");
        this.$store.commit("createSnackBarSuccess", {
          text: `Welcome back ${this.$store.state.user.username} !`,
          announcer: this.$announcer
        });
        let role = this.getRole(resp2.data.roleid);
        // await this.hack();
        this.$router.push(`/${role}/${this.$store.state.user.id}`);
      } catch (error) {
        this.$store.commit("createSnackBarError", {
          text: `An error occured while signing in.`,
          announcer: this.$announcer
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
