import { beforeEach, expect, vi } from "vitest";
import useJobStore from "../../../src/stores/jobs.js";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

describe("jobsStore", () => {
  vi.mock("axios");
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("jobsState", () => {
    test("stores jobs list", () => {
      const store = useJobStore();
      expect(store.jobs).toEqual([]);
    });
  });

  describe("Fetch Jobs", () => {
    test("make API requests and get jobs back", async () => {
      const store = useJobStore();
      axios.get.mockResolvedValue({ data: ["job1,job2"] });
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["job1,job2"]);
    });
  });
});
