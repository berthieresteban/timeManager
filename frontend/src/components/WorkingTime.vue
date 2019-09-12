<template>
  <div>
    <UpdateWorkingTime
      v-if="openedUpdateDialog"
      :openedUpdateDialog="openedUpdateDialog"
      :currentItem="currentItem"
      @confirmed="confirmedUpdate"
      @cancelled="cancelledUpdate"
    />
    <DeleteWorkingTime
      v-if="openedDeleteDialog"
      :openedDeleteDialog="openedDeleteDialog"
      :currentItem="currentItem"
      @confirmed="confirmedDelete"
      @cancelled="cancelledDelete"
    />
    <div v-if="creationMode">
      <CreateWorkingTime @createWorkingTime="createWorkingTime"/>
    </div>
    <div v-else>
      <EditWorkingTime @deleteWorkingTime="deleteWorkingTime" @updateWorkingTime="updateWorkingTime" />
    </div>
  </div>
</template>

<script>
import DeleteWorkingTime from "./WorkingTimeScreens/DeleteWorkingTime";
import UpdateWorkingTime from "./WorkingTimeScreens/UpdateWorkingTime";
import CreateWorkingTime from "./WorkingTimeScreens/CreateWorkingTime";
import EditWorkingTime from "./WorkingTimeScreens/EditWorkingTime";

export default {
  name: "WorkingTime",
  components: {
    DeleteWorkingTime,
    UpdateWorkingTime,
    CreateWorkingTime,
    EditWorkingTime
  },
  data() {
    return {
      openedDeleteDialog: false,
      openedUpdateDialog: false,
      creationMode: true,
      currentItem: null,
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    userID() {
      return this.$route.params.userID;
    },
    workingtimeID() {
      return this.$route.params.workingtimeID;
    }
  },
  methods: {
    cancelledDelete() {
      this.openedDeleteDialog = false;
    },
    confirmedDelete() {
      this.openedDeleteDialog = false;
    },
    cancelledUpdate() {
      this.openedUpdateDialog = false;
    },
    confirmedUpdate() {
      this.openedUpdateDialog = false;
    },
    createWorkingTime() {
      alert('WorkingTime Created!')
    },
    updateWorkingTime(item) {
      this.currentItem = item;
      this.openedUpdateDialog = true;
    },
    deleteWorkingTime(item) {
      this.currentItem = item;
      this.openedDeleteDialog = true;
    }
  },
  mounted() {
    if (!this.workingtimeID || this.workingtimeID === undefined) {
      this.creationMode = true;
    } else {
      this.creationMode = false;
    }
  },
  watch: {
    $route(to, from) {
      if (!this.workingtimeID || this.workingtimeID === undefined) {
        this.creationMode = true;
      } else {
        this.creationMode = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
