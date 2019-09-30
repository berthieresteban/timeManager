<template>
  <v-row justify="center">
    <v-card large :dark="darkMode">
      <v-card-title>Update Account Informations</v-card-title>
      <v-card-text>
        <div v-if="errors.length">
          <p class="error" v-for="error in errors" :key="error">{{ error }}</p>
        </div>
        <v-text-field label="Username" required v-model="username"></v-text-field>
        <v-text-field label="Email" required v-model="email"></v-text-field>
        <v-switch label="Update password" v-model="updatePassword"></v-switch>
        <v-text-field
          :append-icon="showPassword1 ? 'fa-eye' : 'fa-eye-slash'"
          @click:append="showPassword1 = !showPassword1"
          :type="showPassword1 ? 'text' : 'password'"
          v-if="updatePassword"
          label="Password"
          required
          v-model="password1"
        ></v-text-field>
        <v-text-field
          :append-icon="showPassword2 ? 'fa-eye' : 'fa-eye-slash'"
          @click:append="showPassword2 = !showPassword2"
          :type="showPassword2 ? 'text' : 'password'"
          v-if="updatePassword"
          label="Confirm password"
          required
          v-model="password2"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    currentUsername() {
      return this.$store.state.user.username;
    },
    currentEmail() {
      return this.$store.state.user.email;
    }
  },
  data() {
    return {
      username: "",
      updatePassword: false,
      email: "",
      password1: "",
      showPassword1: false,
      showPassword2: false,
      password2: "",
      errors: [],
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },
  mounted() {
    this.username = this.currentUsername;
    this.email = this.currentEmail;
  },
  methods: {
    async emailCheck() {
      const regexTest = this.emailRegex.test(this.email);

      if (!regexTest) {
        if (!this.errors.find(err => err === "Wrong email format.")) {
          this.errors.push("Wrong email format.");
        }
      } else {
        this.errors = this.errors.filter(err => err !== "Wrong email format.");
      }
      try {
        const resp = await this.$store.dispatch("getUser", {
          email: this.email
        });

        let userExists = resp.data.length;
        if (resp.data[0].email === this.currentEmail) {
          userExists = false;
        }
        if (userExists) {
          if (!this.errors.find(err => err === "Email already exists.")) {
            this.errors.push("Email already exists.");
          }
        } else {
          this.errors = this.errors.filter(
            err => err !== "Email already exists."
          );
        }
      } catch (error) {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while verifying email.",
          announcer: this.$announcer
        });
      }
    },
    async usernameCheck() {
      try {
        const resp = await this.$store.dispatch("getUser", {
          username: this.username
        });
        let userExists = resp.data.length;
        if (resp.data[0].username === this.currentUsername) {
          userExists = false;
        }
        if (userExists) {
          if (!this.errors.find(err => err === "Username already exists.")) {
            this.errors.push("Username already exists.");
          }
        } else {
          this.errors = this.errors.filter(
            err => err !== "Username already exists."
          );
        }
      } catch (error) {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while verifying username.",
          announcer: this.$announcer
        });
      }
    },
    passwordCheck() {
      if (this.updatePassword) {
        if (this.password1 === this.password2) {
          this.errors = this.errors.filter(
            err => err !== "Passwords are differents."
          );
        } else {
          this.errors.push("Passwords are differents.");
          return;
        }
      } else {
        this.errors = this.errors.filter(
          err => err !== "Passwords are differents."
        );
      }
    },
    async confirm() {
      let payload = {};
      if (
        this.currentUsername === this.username &&
        this.currentEmail === this.email &&
        !this.updatePassword
      ) {
        this.$store.commit("createSnackBarError", {
          text: "Nothing to update!",
          announcer: this.$announcer
        });
        return;
      }
      await this.passwordCheck();
      await this.emailCheck();
      await this.usernameCheck();
      if (this.errors.length) {
        return;
      }
      payload = {
        user: {
          username: this.username,
          email: this.email
        }
      };
      if (this.updatePassword) {
        payload.user.password = this.password1;
      }
      try {
        const response = await this.$store.dispatch("updateUser", payload);
        this.$store.commit("setUser", {
          username: this.username,
          email: this.email,
          roleid: this.$store.state.user.roleid,
          id: this.$store.state.user.id
        });
        this.$store.commit("createSnackBarSuccess", {
          text: `Account successfully updated!`,
          announcer: this.$announcer
        });
      } catch (error) {
        this.$store.commit("createSnackBarError", {
          text: `An error occured while updating you're account!`,
          announcer: this.$announcer
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
