import { createPinia, setActivePinia } from "pinia";
import { beforeEach, expect, vi } from "vitest";
import useJobStore from "../../../src/stores/jobs.js";
import useUserStore from "../../../src/stores/user.js";
import type { Mock } from "vitest";

import axios from "axios";
const axiosGetMock = axios.get as Mock;

import { createJob } from "../utils/createJob.ts";

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
      axiosGetMock.mockResolvedValue({ data: ["job1,job2"] });
      await jobStore.FETCH_JOBS();
      expect(jobStore.jobs).toEqual(["job1,job2"]);
    });
  });

  describe("getters", () => {
    describe("ORGANIZATIONS", () => {
      test("get UNIQUE_ORGANIZATIONS from list of jobs", () => {
        const jobStore = useJobStore();
        jobStore.jobs = [
          createJob({ organization: "google" }),
          createJob({ organization: "google" }),
          createJob({ organization: "amazon" }),
        ];
        const result = jobStore.UNIQUE_ORGANIZATIONS;
        expect(result).toEqual(new Set(["google", "amazon"]));
      });

      describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
        describe("when the user has not selected any organizations", () => {
          test("it includes job", () => {
            const userStore = useUserStore();
            userStore.selectedOrganizations = [];
            const jobStore = useJobStore();
            const job = createJob({ organization: "google" });

            const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
            expect(result).toBe(true);
          });
        });
        test("it identifies if job is associated with givin organization", () => {
          const userStore = useUserStore();
          userStore.selectedOrganizations = ["google", "microsoft"];
          const jobStore = useJobStore();
          const job = createJob({ organization: "google" });
          const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
          expect(result).toBe(true);
        });
      });
    });
    describe("JOB_TYPES", () => {
      test("get JOB_TYPES from list of jobs", () => {
        const jobStore = useJobStore();
        jobStore.jobs = [
          createJob({ jobType: "Intern" }),
          createJob({ jobType: "Intern" }),
          createJob({ jobType: "Temporary" }),
          createJob({ jobType: "Part-time" }),
          createJob({ jobType: "Full-time" }),
        ];
        const result = jobStore.UNIQUE_JOB_TYPES;
        expect(result).toEqual(
          new Set(["Intern", "Temporary", "Part-time", "Full-time"]),
        );
      });

      describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
        describe("when the user has not selected any job type", () => {
          test("it includes job", () => {
            const userStore = useUserStore();
            userStore.selectedJobTypes = [];
            const jobStore = useJobStore();

            const job = createJob({ jobType: "Part-time" });
            const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
            expect(result).toBe(true);
          });
        });
        test("it identifies if job is associated with givin organization", () => {
          const userStore = useUserStore();
          userStore.selectedJobTypes = ["Part-time", "Full-time"];
          const jobStore = useJobStore();
          const job = createJob({ jobType: "Part-time" });
          const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
          expect(result).toBe(true);
        });
      });
    });

    describe("DEGREES", () => {
      describe("INCLUDE_JOB_BY_DEGREES", () => {
        describe("when the user has not selected any DEGREES", () => {
          test("it includes job", () => {
            const userStore = useUserStore();
            userStore.selectedDegrees = [];
            const jobStore = useJobStore();
            const job = createJob({ degree: "Associate" });
            const result = jobStore.INCLUDE_JOB_BY_Degree(job);
            expect(result).toBe(true);
          });
        });
        test("it identifies if job is associated with givin organization", () => {
          const userStore = useUserStore();
          userStore.selectedDegrees = ["Associate", "Bachelor"];
          const jobStore = useJobStore();
          const job = createJob({ degree: "Associate" });
          const result = jobStore.INCLUDE_JOB_BY_Degree(job);
          expect(result).toBe(true);
        });
      });
    });

    describe("INCLUDE_JOB_BY_SKILLS", () => {
      test("identifies if job matches user's skill", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();
        userStore.skillsSearchTerm = "Vue";
        const newJob = createJob({ title: "Vue developer" });
        const results = jobStore.INCLUDE_JOB_BY_SKILLS(newJob);
        expect(results).toBe(true);
      });
      test("it handle inconsistences in casing", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();
        userStore.skillsSearchTerm = "vue";
        const newJob = createJob({ title: "Vue developer" });
        const results = jobStore.INCLUDE_JOB_BY_SKILLS(newJob);
        expect(results).toBe(true);
      });
      test("if the skillsSearchTerm is empty ", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();
        userStore.skillsSearchTerm = "";
        const newJob = createJob({ title: "Vue developer" });
        const results = jobStore.INCLUDE_JOB_BY_SKILLS(newJob);
        expect(results).toBe(true);
      });
    });
  });
});
