import { defineStore } from "pinia";
import getJobs from "../api/getJobs";
import axios from "axios";

const useJobStore = defineStore("jobs", {
  state: () => {
    return {
      jobsList: [],
    };
  },
  actions: {
    async getJobsFunc() {
      //   this.jobsList = getJobs();

      const baseURL = "http://localhost:3000/jobs";
      const response = await axios.get(baseURL);
      const data = await response.data;
      //   return data;
      console.log("data", data);
      this.jobsList = data;
    },
  },
});

export default useJobStore;
