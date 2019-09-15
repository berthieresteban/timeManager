<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Update Account Informations</span>
        </v-card-title>
        <v-card-text>
          <div v-if="errors.length">
            <p class="error" v-for="error in errors" :key="error">{{ error }}</p>
          </div>
          <v-text-field label="Username" required v-model="username"></v-text-field>
          <v-text-field label="Email" required v-model="email"></v-text-field>
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
    },
    currentUsername() {
      return this.$store.state.user.username;
    },
    currentEmail() {
      return this.$store.state.user.email;
    },
    id() {
      return this.$store.state.user.id;
    }
  },
  data() {
    return {
      username: "",
      email: "",
      errors: []
    };
  },
  mounted() {
    this.username = this.currentUsername;
    this.email = this.currentEmail;
  },
  methods: {
    cancel() {
      this.$emit("cancelUpdate");
    },
    async confirm() {
      const response = await this.$store.dispatch("updateUser", {
        user: {
          username: this.username,
          email: this.email
        }
      });
      if (response.status === 200) {
        this.$store.commit("setUser", {
          username: this.username,
          email: this.email,
          id: this.$store.state.user.id
        });
        this.$store.commit(
          "createSnackBarSuccess",
          `Account successfully updated!`
        );
      } else {
        this.$store.commit(
          "createSnackBarError",
          `An error occured while updating you're account!`
        );
      }
      this.$emit("endUpdate");
    }
  }
};
</script>

<style scoped>
</style>
