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
      <CreateWorkingTime @createWorkingTime="createWorkingTime" />
    </div>
    <div v-else>
      <EditWorkingTime
        :workingTimes="workingTimes"
        @deleteWorkingTime="deleteWorkingTime"
        @updateWorkingTime="updateWorkingTime"
      />
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
      workingTimes: []
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
    userID() {
      return this.$route.params.userID;
    },
    editMode() {
      return this.$route.params.editMode;
    }
  },
  methods: {
    cancelledDelete() {
      this.openedDeleteDialog = false;
    },
    async confirmedDelete(id) {
      const response = await this.$store.dispatch("deleteWorkingTime", id);
      if (response.status === 204) {
        this.fetchWorkingTimes();
        this.$store.commit("createSnackBarSuccess", {
          text: "Working time successfully deleted!",
          announcer: this.$announcer
        });
      } else {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while deleting working time!",
          announcer: this.$announcer
        });
      }
      this.openedDeleteDialog = false;
    },
    cancelledUpdate() {
      this.openedUpdateDialog = false;
    },
    async confirmedUpdate(payload) {
      const response = await this.$store.dispatch("updateWorkingTime", payload);
      if (response.status === 200) {
        this.fetchWorkingTimes();
        this.$store.commit("createSnackBarSuccess", {
          text: "Working time successfully updated!",
          announcer: this.$announcer
        });
      } else {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while updating working time!",
          announcer: this.$announcer
        });
      }
      this.openedUpdateDialog = false;
    },
    async createWorkingTime(payload) {
      const response = await this.$store.dispatch("createWorkingTime", payload);
      if (response.status === 201) {
        this.$store.commit("createSnackBarSuccess", {
          text: "Working time successfully created!",
          announcer: this.$announcer
        });
      } else {
        this.$store.commit("createSnackBarError", {
          text: "An error occured while creating working time!",
          announcer: this.$announcer
        });
      }
    },
    updateWorkingTime(item) {
      this.currentItem = item;
      this.openedUpdateDialog = true;
    },
    deleteWorkingTime(item) {
      this.currentItem = item;
      this.openedDeleteDialog = true;
    },
    async fetchWorkingTimes() {
      this.workingTimes = [];
      const start = "2019-10-03 09:30:27";
      const end = "2019-08-03 09:30:27";
      const response = await this.$store.dispatch("getWorkingTimes", {
        id: this.$store.state.user.id,
        start: start,
        end: end
      });
      response.data.data.sort((d1, d2) => {
        return new Date(d1.start) - new Date(d2.start);
      });
      response.data.data.reverse();
      this.workingTimes = response.data.data.map(d => {
        return {
          user: this.$store.state.user.username,
          date: d.start.split("T")[0],
          in: d.start.split("T")[1].split("Z")[0],
          out: d.end.split("T")[1].split("Z")[0],
          id: d.id
        };
      });
    }
  },
  mounted() {
    if (!this.editMode || this.editMode === undefined) {
      this.creationMode = true;
    } else {
      this.creationMode = false;
    }
    this.fetchWorkingTimes();
  },
  watch: {
    $route(to, from) {
      if (!this.editMode || this.editMode === undefined) {
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
