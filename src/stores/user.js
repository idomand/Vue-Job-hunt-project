import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLoggedIn: false,
    };
  },
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
});

export default useUserStore;
