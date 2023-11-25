import { defineStore } from "pinia";
import getJobs from "../api/getJobs";
import useUserStore from "./user";

import type { Job } from "../api/types";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";

import { ref, computed } from "vue";

const useJobStore = defineStore("jobs", () => {
  const jobs = ref<Job[]>([]);
  const FETCH_JOBS = async () => {
    jobs.value = await getJobs();
  };

  const UNIQUE_ORGANIZATIONS = computed(() => {
    const organizationsSet = new Set<string>();
    jobs.value.forEach((job) => {
      organizationsSet.add(job.organization);
    });
    return organizationsSet;
  });
  const UNIQUE_JOB_TYPES = computed(() => {
    const jobTypesSet = new Set<string>();
    jobs.value.forEach((job) => {
      jobTypesSet.add(job.jobType);
    });
    return jobTypesSet;
  });
  const INCLUDE_JOB_BY_ORGANIZATION = computed(() => {
    return (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedOrganizations.length == 0) {
        return true;
      }
      return userStore.selectedOrganizations.includes(job.organization);
    };
  });
  const INCLUDE_JOB_BY_JOB_TYPE = computed(() => {
    return (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length == 0) {
        return true;
      }
      return userStore.selectedJobTypes.includes(job.jobType);
    };
  });
  const INCLUDE_JOB_BY_Degree = computed(() => {
    return (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedDegrees.length == 0) {
        return true;
      }
      return userStore.selectedDegrees.includes(job.degree);
    };
  });

  const INCLUDE_JOB_BY_SKILLS = computed(() => {
    return (job: Job) => {
      const userStore = useUserStore();
      return job.title
        .toLocaleLowerCase()
        .includes(userStore.skillsSearchTerm.toLocaleLowerCase());
    };
  });

  const FILTERED_JOBS = computed(() => {
    return jobs.value
      .filter((job) => INCLUDE_JOB_BY_SKILLS.value(job))
      .filter((job) => INCLUDE_JOB_BY_ORGANIZATION.value(job))
      .filter((job) => INCLUDE_JOB_BY_Degree.value(job))
      .filter((job) => INCLUDE_JOB_BY_JOB_TYPE.value(job));
  });

  return {
    jobs,
    FETCH_JOBS,
    UNIQUE_ORGANIZATIONS,
    UNIQUE_JOB_TYPES,
    INCLUDE_JOB_BY_ORGANIZATION,
    INCLUDE_JOB_BY_JOB_TYPE,
    INCLUDE_JOB_BY_Degree,
    FILTERED_JOBS,
    INCLUDE_JOB_BY_SKILLS,
  };
});

export default useJobStore;

// export interface JobState {
//   jobs: Job[];
// }

// const useJobStore2 = defineStore("jobs", {
//   state: (): JobState => {
//     return {
//       jobs: [],
//     };
//   },
//   actions: {
//     async [FETCH_JOBS]() {
//       this.jobs = await getJobs();
//     },
//   },
//   getters: {
//     [UNIQUE_ORGANIZATIONS](state) {
//       const organizationsSet = new Set<string>();
//       state.jobs.forEach((job) => {
//         organizationsSet.add(job.organization);
//       });
//       return organizationsSet;
//     },

//     [UNIQUE_JOB_TYPES](state) {
//       const jobTypesSet = new Set<string>();
//       state.jobs.forEach((job) => {
//         jobTypesSet.add(job.jobType);
//       });
//       return jobTypesSet;
//     },

//     [INCLUDE_JOB_BY_ORGANIZATION]() {
//       return (job: Job) => {
//         const userStore = useUserStore();
//         if (userStore.selectedOrganizations.length == 0) {
//           return true;
//         }
//         return userStore.selectedOrganizations.includes(job.organization);
//       };
//     },

//     [INCLUDE_JOB_BY_JOB_TYPE]() {
//       return (job: Job) => {
//         const userStore = useUserStore();
//         if (userStore.selectedJobTypes.length == 0) {
//           return true;
//         }
//         return userStore.selectedJobTypes.includes(job.jobType);
//       };
//     },
//     INCLUDE_JOB_BY_Degree() {
//       return (job: Job) => {
//         const userStore = useUserStore();
//         if (userStore.selectedDegrees.length == 0) {
//           return true;
//         }
//         return userStore.selectedDegrees.includes(job.degree);
//       };
//     },

//     [FILTERED_JOBS](state): Job[] {
//       return state.jobs
//         .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
//         .filter((job) => this.INCLUDE_JOB_BY_Degree(job))
//         .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job));
//     },
//   },
// });
