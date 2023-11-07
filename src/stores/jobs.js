import { defineStore } from "pinia";
import getJobs from "../api/getJobs";
import useUserStore from "./user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS_BY_JOB_TYPES = "FILTERED_JOBS_BY_JOB_TYPES";

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

    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      const userStore = useUserStore();
      if (userStore.selectedOrganizations.length === 0) {
        return state.jobs;
      } else {
        return state.jobs.filter((job) =>
          userStore.selectedOrganizations.includes(job.organization),
        );
      }
    },
    [UNIQUE_JOB_TYPES](state) {
      const jobTypesSet = new Set();
      state.jobs.forEach((job) => {
        jobTypesSet.add(job.jobType);
      });
      return jobTypesSet;
    },
    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) {
        return state.jobs;
      } else {
        return state.jobs.filter((job) =>
          userStore.selectedJobTypes.includes(job.jobType),
        );
      }
    },
  },
});

export default useJobStore;
