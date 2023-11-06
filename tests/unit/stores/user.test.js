import { beforeEach, expect } from "vitest";
import useUserStore from "../../../src/stores/user.js";
import { createPinia, setActivePinia } from "pinia";

describe("userStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("userState", () => {
    test("it keeps track of if user is logged in", () => {
      const store = useUserStore();
      expect(store.isLoggedIn).toBe(false);
    });
    test("it stores organizations that the user filter by", () => {
      const store = useUserStore();
      expect(store.selectedOrganizations).toEqual([]);
    });
  });

  describe("user actions", () => {
    test("logs the user in", () => {
      const store = useUserStore();
      expect(store.isLoggedIn).toBe(false);
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });

    test("ADD_SELECTED_ORGANIZATION -- updates organizations the user chose", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATION(["org1", "org2"]);
      expect(store.selectedOrganizations).toEqual(["org1", "org2"]);
    });
  });
});
