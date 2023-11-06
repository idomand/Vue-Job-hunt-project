import { beforeEach, expect, vi } from "vitest";
import useJobStore from "../../../src/stores/jobs.js";
import useUserStore from "../../../src/stores/user.js";

import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

describe("jobsStore", () => {
  vi.mock("axios");
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("jobsState", () => {
    test("stores jobs list", () => {
      const jobStore = useJobStore();
      expect(jobStore.jobs).toEqual([]);
    });
  });

  describe("Fetch Jobs", () => {
    test("make API requests and get jobs back", async () => {
      const jobStore = useJobStore();
      axios.get.mockResolvedValue({ data: ["job1,job2"] });
      await jobStore.FETCH_JOBS();
      expect(jobStore.jobs).toEqual(["job1,job2"]);
    });
  });

  describe("getters", () => {
    test("get UNIQUE_ORGANIZATIONS from list of jobs", () => {
      const jobStore = useJobStore();
      jobStore.jobs = [
        { organization: "google" },
        { organization: "google" },
        { organization: "amazon" },
      ];
      const result = jobStore.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["google", "amazon"]));
    });
    describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
      test(" -- identifies jobs by organizations", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();
        jobStore.jobs = [
          { organization: "google" },
          { organization: "amazon" },
          { organization: "microsoft" },
        ];
        userStore.selectedOrganizations = ["google", "microsoft"];

        const results = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS;
        expect(results).toEqual([
          { organization: "google" },
          { organization: "microsoft" },
        ]);
      });
      test("when the user did not select any organizations - it returns all jobs", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();
        jobStore.jobs = [
          { organization: "google" },
          { organization: "amazon" },
          { organization: "microsoft" },
        ];
        userStore.selectedOrganizations = [];
        const results = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS;
        expect(results).toEqual([
          { organization: "google" },
          { organization: "amazon" },
          { organization: "microsoft" },
        ]);
      });
    });
  });
});
