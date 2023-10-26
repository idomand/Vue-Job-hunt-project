import JobListings from "../../../../src/components/JobResults/JobListings.vue";
import { expect, vi } from "vitest";
// import axios from "axios";
import useJobStore from "../../../../src/stores/jobs.js";
import { renderComponent } from "../../../setup.js";
import { screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
describe("JobListings", () => {
  vi.mock("axios");

  function renderJobListings(queryParams = {}) {
    const pinia = createTestingPinia();
    renderComponent(JobListings, {
      global: {
        plugins: [pinia],
        mocks: { $route: createRoute(queryParams) },
      },
    });
  }

  function createRoute(queryParams = {}) {
    return { query: { page: "1", ...queryParams } };
  }

  test("it fetch jobs", () => {
    renderJobListings();
    const jobStore = useJobStore();
    expect(jobStore.FETCH_JOBS).toHaveBeenCalled();
  });

  test("it display Maximum of 10 jobs", async () => {
    renderJobListings();
    const jobStore = useJobStore();
    jobStore.jobs = Array(15).fill({});
    const jobListing = await screen.findAllByRole("listitem");
    expect(jobListing).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    test(" display page number 1", () => {
      const queryParams = { page: undefined };
      renderJobListings(queryParams);
      expect(screen.getByText(/page 1/i)).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    test(" display page number 3", () => {
      const queryParams = { page: 3 };
      renderJobListings(queryParams);
      expect(screen.getByText(/page 3/i)).toBeInTheDocument();
    });
  });
  describe("when user in on the first page", () => {
    test(" does not show link to previous page", async () => {
      const queryParams = { page: "1" };
      renderJobListings(queryParams);
      const jobStore = useJobStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /Previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });
    test(" is showing link to next page", async () => {
      const queryParams = { page: "1" };
      renderJobListings(queryParams);
      const jobStore = useJobStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /Next/i });

      expect(nextLink).toBeInTheDocument();
    });
  });
  describe("when user in on the last page", () => {
    test(" does not show link to next page", async () => {
      const queryParams = { page: "2" };

      renderJobListings(queryParams);
      const jobStore = useJobStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const NextLink = screen.queryByRole("link", { name: /next/i });
      expect(NextLink).not.toBeInTheDocument();
    });
    test(" is showing link to previous page", async () => {
      const queryParams = { page: "2" };

      renderJobListings(queryParams);
      const jobStore = useJobStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
