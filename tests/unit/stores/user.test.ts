import { beforeEach, expect } from "vitest";
import useUserStore from "../../../src/stores/user.ts";
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

    test("it stores DEGREES that the user filter by", () => {
      const userStore = useUserStore();
      expect(userStore.selectedDegrees).toEqual([]);
    });

    test("it stores user search term for skills", () => {
      const userStore = useUserStore();
      expect(userStore.skillsSearchTerm).toEqual("");
    });
  });

  describe("user actions", () => {
    test("UPDATE_SKILLS_SEARCH_TERM ", () => {
      const userStore = useUserStore();
      expect(userStore.skillsSearchTerm).toBe("");
      userStore.UPDATE_SKILLS_SEARCH_TERM("new text");
      expect(userStore.skillsSearchTerm).toBe("new text");
    });

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

    test("ADD_SELECTED_Degrees -- updates Degrees the user chose", () => {
      const userStore = useUserStore();
      userStore.ADD_SELECTED_Degrees(["type1", "type2"]);
      expect(userStore.selectedDegrees).toEqual(["type1", "type2"]);
    });

    test("clear all user job filter ", () => {
      const userStore = useUserStore();
      userStore.selectedDegrees = ["degree1", "degree2"];
      userStore.selectedJobTypes = ["type1", "type2"];
      userStore.selectedOrganizations = ["org1", "org2"];
      userStore.skillsSearchTerm = "test";

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
      expect(userStore.selectedDegrees).toEqual([]);
      expect(userStore.selectedJobTypes).toEqual([]);
      expect(userStore.selectedOrganizations).toEqual([]);
      expect(userStore.skillsSearchTerm).toBe("");
    });
  });
});
