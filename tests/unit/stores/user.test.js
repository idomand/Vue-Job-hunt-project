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
  });

  describe("user actions", () => {
    test("logs the user in", () => {
      const store = useUserStore();
      expect(store.isLoggedIn).toBe(false);
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });
});
