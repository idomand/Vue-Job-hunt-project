import { defineStore } from "pinia";
import getJobs from "../api/getJobs";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";

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
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const organizationsSet = new Set();
      state.jobs.forEach((job) => {
        organizationsSet.add(job.organization);
      });
      return organizationsSet;
    },
    [UNIQUE_JOB_TYPES](state) {
      const jobTypesSet = new Set();
      state.jobs.forEach((job) => {
        jobTypesSet.add(job.jobType);
      });
      return jobTypesSet;
    },
  },
});

export default useJobStore;
