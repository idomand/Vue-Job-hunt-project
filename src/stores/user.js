import { defineStore } from "pinia";

export const LOGIN_USER = "LOGIN_USER";
export const ADD_SELECTED_ORGANIZATION = "ADD_SELECTED_ORGANIZATION";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLoggedIn: false,
      selectedOrganizations: [],
    };
  },
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATION](organizations) {
      this.selectedOrganizations = organizations;
    },
  },
});

export default useUserStore;
