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
    describe("ORGANIZATIONS", () => {
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

      describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
        describe("when the user has not selected any organizations", () => {
          test("it includes job", () => {
            const userStore = useUserStore();
            userStore.selectedOrganizations = [];
            const jobStore = useJobStore();
            const job = { organization: "google" };
            const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
            expect(result).toBe(true);
          });
        });
        test("it identifies if job is associated with givin organization", () => {
          const userStore = useUserStore();
          userStore.selectedOrganizations = ["google", "microsoft"];
          const jobStore = useJobStore();
          const job = { organization: "google" };
          const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
          expect(result).toBe(true);
        });
      });
    });
    describe("JOB_TYPES", () => {
      test("get JOB_TYPES from list of jobs", () => {
        const jobStore = useJobStore();
        jobStore.jobs = [
          { jobType: "Intern" },
          { jobType: "Intern" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
          { jobType: "Full-time" },
        ];
        const result = jobStore.UNIQUE_JOB_TYPES;
        expect(result).toEqual(
          new Set(["Intern", "Temporary", "Part-time", "Full-time"]),
        );
      });

      describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
        test(" -- identifies jobs by jobType", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();
          jobStore.jobs = [
            { jobType: "Intern" },
            { jobType: "Intern" },
            { jobType: "Temporary" },
            { jobType: "Part-time" },
            { jobType: "Full-time" },
          ];
          userStore.selectedJobTypes = ["Intern", "Temporary"];

          const results = jobStore.FILTERED_JOBS_BY_JOB_TYPES;
          expect(results).toEqual([
            { jobType: "Intern" },
            { jobType: "Intern" },
            { jobType: "Temporary" },
          ]);
        });
        test("when the user did not select any organizations - it returns all jobs", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();
          jobStore.jobs = [
            { jobType: "Intern" },
            { jobType: "Intern" },
            { jobType: "Temporary" },
            { jobType: "Part-time" },
            { jobType: "Full-time" },
          ];
          userStore.selectedJobTypes = [];
          const results = jobStore.FILTERED_JOBS_BY_JOB_TYPES;
          expect(results).toEqual([
            { jobType: "Intern" },
            { jobType: "Intern" },
            { jobType: "Temporary" },
            { jobType: "Part-time" },
            { jobType: "Full-time" },
          ]);
        });
      });
      describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
        describe("when the user has not selected any job type", () => {
          test("it includes job", () => {
            const userStore = useUserStore();
            userStore.selectedJobTypes = [];
            const jobStore = useJobStore();
            const job = { jobType: "Part-time" };
            const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
            expect(result).toBe(true);
          });
        });
        test("it identifies if job is associated with givin organization", () => {
          const userStore = useUserStore();
          userStore.selectedJobTypes = ["Part-time", "Full-time"];
          const jobStore = useJobStore();
          const job = { jobType: "Part-time" };
          const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
          expect(result).toBe(true);
        });
      });
    });
  });
});
