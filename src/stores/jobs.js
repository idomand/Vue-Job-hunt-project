import { defineStore } from "pinia";
import getJobs from "../api/getJobs";

export const FETCH_JOBS = "FETCH_JOBS";

const useJobStore = defineStore("jobs", {
  state: () => {
    return {
      jobs: [],
    };
  },
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
    },
  },
});

export default useJobStore;
