<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card :darkMode="darkMode">
        <v-card-title>
          <span class="headline">Account Creation</span>
        </v-card-title>
        <v-card-text>
          <div v-if="errors.length">
            <p class="error" v-for="error in errors" :key="error">{{ error }}</p>
          </div>
          <v-text-field label="Username" required v-model="username"></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
          ></v-text-field>
          <v-text-field label="Email" required v-model="email"></v-text-field>
          <v-select required v-model="role" :items="roles" filled label="Select Role"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-spacer />
          <v-btn @click="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {
      username: "",
      errors: [],
      role: 1,
      password: "",
      showPassword: false,
      email: "",
      roles: [
        { value: 1, text: "Employee" },
        { value: 2, text: "Manager" },
        { value: 3, text: "Super Manager" },
        { value: 4, text: "Administrator" }
      ],
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },
  methods: {
    cancel() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.showPassword = false;
      this.$emit("cancelCreation");
    },
    async emailCheck() {
      const regexTest = this.emailRegex.test(this.email);

      if (!regexTest) {
        if (!this.errors.find(err => err === "Wrong email format.")) {
          this.errors.push("Wrong email format.");
        }
      } else {
        this.errors = this.errors.filter(err => err !== "Wrong email format.");
      }
      const resp = await this.$store.dispatch("getUser", {
        email: this.email
      });
      const userExists = resp.data.length;
      if (userExists) {
        if (!this.errors.find(err => err === "Email already exists.")) {
          this.errors.push("Email already exists.");
        }
      } else {
        this.errors = this.errors.filter(
          err => err !== "Email already exists."
        );
      }
    },
    async usernameCheck() {
      const resp = await this.$store.dispatch("getUser", {
        username: this.username
      });
      const userExists = resp.data.length;
      if (userExists) {
        if (!this.errors.find(err => err === "Username already exists.")) {
          this.errors.push("Username already exists.");
        }
      } else {
        this.errors = this.errors.filter(
          err => err !== "Username already exists."
        );
      }
    },
    createAccount() {
      const payload = {
        user: {
          username: this.username,
          email: this.email,
          password: this.password,
          roleid: this.role
        }
      };
      return this.$store.dispatch("createUser", payload);
    },
    async confirm() {
      this.errors = this.errors.filter(
        err =>
          err !== "An error occured while creating your account, please retry."
      );
      await this.emailCheck();
      await this.usernameCheck();
      if (this.errors.length) {
        return;
      }
      const response = await this.createAccount();
      if (response.status === 201) {
        this.errors = [];
        this.$emit("accountCreated");
      } else {
        this.errors.push(
          "An error occured while creating your account, please retry."
        );
      }
    }
  }
};
</script>
