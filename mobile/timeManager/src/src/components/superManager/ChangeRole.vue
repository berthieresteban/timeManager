<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Change role of {{employee.username}}</span>
        </v-card-title>
        <v-card-text>
          <v-select v-model="value" :items="roles" filled label="Select Role"></v-select>
          <v-card-actions>
            <v-btn @click="cancel">Cancel</v-btn>
            <v-spacer />
            <v-btn @click="confirm">Confirm</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    employee: Object
  },
  methods: {
    cancel() {
      this.$emit('cancelUpdateRole');
    },
    confirm() {
      this.$emit('confirmUpdateRole', this.value)
    }
  },
  mounted() {
    this.value = this.employee.roleid;
  },
  data() {
    return {
      value: null,
      roles: [
        { value: 1, text: "Employee" },
        { value: 2, text: "Manager" },
        { value: 3, text: "Super Manager" },
        { value: 4, text: "Administrator" }
      ]
    };
  }
};
</script>
<style scoped>
</style>
