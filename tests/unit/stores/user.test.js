import { beforeEach, expect } from "vitest";
import useUserStore from "../../../src/stores/user.js";
import { createPinia, setActivePinia } from "pinia";

describe("userStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("userState", () => {
    test("it keeps track of if user is logged in", () => {
      const userStore = useUserStore();
      expect(userStore.isLoggedIn).toBe(false);
    });
    test("it stores organizations that the user filter by", () => {
      const userStore = useUserStore();
      expect(userStore.selectedOrganizations).toEqual([]);
    });
    test("it stores JOB_TYPES that the user filter by", () => {
      const userStore = useUserStore();
      expect(userStore.selectedJobTypes).toEqual([]);
    });
  });

  describe("user actions", () => {
    test("logs the user in", () => {
      const userStore = useUserStore();
      expect(userStore.isLoggedIn).toBe(false);
      userStore.LOGIN_USER();
      expect(userStore.isLoggedIn).toBe(true);
    });

    test("ADD_SELECTED_ORGANIZATION -- updates organizations the user chose", () => {
      const userStore = useUserStore();
      userStore.ADD_SELECTED_ORGANIZATION(["org1", "org2"]);
      expect(userStore.selectedOrganizations).toEqual(["org1", "org2"]);
    });

    test("ADD_SELECTED_JOB_TYPES -- updates Job Types the user chose", () => {
      const userStore = useUserStore();
      userStore.ADD_SELECTED_JOB_TYPES(["type1", "type2"]);
      expect(userStore.selectedJobTypes).toEqual(["type1", "type2"]);
    });
  });
});
