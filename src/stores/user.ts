import { defineStore } from "pinia";

export const LOGIN_USER = "LOGIN_USER";
export const ADD_SELECTED_ORGANIZATION = "ADD_SELECTED_ORGANIZATION";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_Degrees = "ADD_SELECTED_Degrees";
export interface UserState {
  isLoggedIn: boolean;
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}

const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      isLoggedIn: false,
      selectedOrganizations: [],
      selectedJobTypes: [],
      selectedDegrees: [],
    };
  },
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATION](organizations: string[]) {
      this.selectedOrganizations = organizations;
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes;
    },
    [ADD_SELECTED_Degrees](Degrees: string[]) {
      this.selectedDegrees = Degrees;
    },
  },
});

export default useUserStore;
