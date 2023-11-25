import { defineStore } from "pinia";

export const LOGIN_USER = "LOGIN_USER";
export const ADD_SELECTED_ORGANIZATION = "ADD_SELECTED_ORGANIZATION";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_Degrees = "ADD_SELECTED_Degrees";

import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref<boolean>(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);
  const skillsSearchTerm = ref("");

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };
  const ADD_SELECTED_ORGANIZATION = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };
  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };
  const ADD_SELECTED_Degrees = (Degrees: string[]) => {
    selectedDegrees.value = Degrees;
  };
  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
    skillsSearchTerm.value = "";
  };

  const UPDATE_SKILLS_SEARCH_TERM = (newSearchTerm: string) => {
    skillsSearchTerm.value = newSearchTerm;
  };

  return {
    UPDATE_SKILLS_SEARCH_TERM,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
    ADD_SELECTED_Degrees,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_ORGANIZATION,
    LOGIN_USER,
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    skillsSearchTerm,
  };
});

// export interface UserState {
//   isLoggedIn: boolean;
//   selectedOrganizations: string[];
//   selectedJobTypes: string[];
//   selectedDegrees: string[];
// }

// const useUserStore = defineStore("user", {
//   state: (): UserState => {
//     return {
//       isLoggedIn: false,
// selectedOrganizations: [],
// selectedJobTypes: [],
// selectedDegrees: [],
//     };
//   },
//   actions: {
//     [LOGIN_USER]() {
//       this.isLoggedIn = true;
//     },
//     [ADD_SELECTED_ORGANIZATION](organizations: string[]) {
//       this.selectedOrganizations = organizations;
//     },
//     [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
//       this.selectedJobTypes = jobTypes;
//     },
//     [ADD_SELECTED_Degrees](Degrees: string[]) {
//       this.selectedDegrees = Degrees;
//     },
//     CLEAR_USER_JOB_FILTER_SELECTIONS() {
//       this.selectedDegrees = [];
//       this.selectedJobTypes = [];
//       this.selectedOrganizations = [];
//     },
//   },
// });

export default useUserStore;
