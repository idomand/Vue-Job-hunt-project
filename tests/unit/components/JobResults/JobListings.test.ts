import JobListings from "../../../../src/components/JobResults/JobListings.vue";
import { expect, vi, Mock } from "vitest";
// import axios from "axios";
import useJobStore from "../../../../src/stores/jobs.ts";
import { renderComponent } from "../../../setup.ts";
import { screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("JobListings", () => {
  const useMockRoute = useRoute as Mock;

  function renderJobListings() {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    //@ts-expect-error
    jobStore.FILTERED_JOBS = Array(15).fill({});

    renderComponent(JobListings, {
      global: {
        plugins: [pinia],
      },
    });
    return { jobStore };
  }

  test("it fetch jobs", () => {
    useMockRoute.mockReturnValue({ query: { page: "1" } });
    const { jobStore } = renderJobListings();
    expect(jobStore.FETCH_JOBS).toHaveBeenCalled();
  });

  test("it display Maximum of 10 jobs", async () => {
    useMockRoute.mockReturnValue({ query: { page: "1" } });
    renderJobListings();
    const jobListing = await screen.findAllByRole("listitem");
    expect(jobListing).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    test(" display page number 1", () => {
      useMockRoute.mockReturnValue({ query: { page: "1" } });
      renderJobListings();
      expect(screen.getByText(/page 1/i)).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    test(" display page number 3", () => {
      useMockRoute.mockReturnValue({ query: { page: "3" } });
      renderJobListings();
      expect(screen.getByText(/page 3/i)).toBeInTheDocument();
    });
  });
  describe("when user in on the first page", () => {
    test(" does not show link to previous page", async () => {
      useMockRoute.mockReturnValue({ query: { page: "1" } });
      renderJobListings();
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /Previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });
    test(" is showing link to next page", async () => {
      useMockRoute.mockReturnValue({ query: { page: "1" } });
      renderJobListings();
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /Next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
  describe("when user in on the last page", () => {
    test(" does not show link to next page", async () => {
      useMockRoute.mockReturnValue({ query: { page: "2" } });
      renderJobListings();
      await screen.findAllByRole("listitem");
      const NextLink = screen.queryByRole("link", { name: /next/i });
      expect(NextLink).not.toBeInTheDocument();
    });
    test(" is showing link to previous page", async () => {
      useMockRoute.mockReturnValue({ query: { page: "2" } });
      renderJobListings();
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
