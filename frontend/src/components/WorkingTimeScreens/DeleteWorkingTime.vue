<template>
  <v-dialog v-model="openedDeleteDialog" persistent max-width="290">
    <v-card :dark="darkMode">
      <v-card-title class="headline">Delete Working Time</v-card-title>
      <v-card-text>
        <h3>Deleting working time for user {{ item.user }}</h3>
        <p>{{item.date}}</p>
        <p>{{item.in}}</p>
        <p>{{item.out}}</p>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="handleCancel">Cancel</v-btn>
        <v-btn @click="handleConfirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteWorkingTime",
  props: {
    currentItem: Object,
    openedDeleteDialog: Boolean
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    }
  },
  data() {
    return {
      item: {}
    };
  },
  mounted() {
    this.item = this.currentItem;
  },
  methods: {
    handleConfirm() {
      this.$emit("confirmed", this.item.id);
    },
    handleCancel() {
      this.$emit("cancelled");
    }
  }
};
</script>
