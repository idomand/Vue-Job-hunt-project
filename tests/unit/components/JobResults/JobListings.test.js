import JobListings from "../../../../src/components/JobResults/JobListings.vue";
import { expect, vi } from "vitest";
import axios from "axios";

import { renderComponent } from "../../../setup.js";
import { screen } from "@testing-library/vue";

describe("JobListings", () => {
  vi.mock("axios");

  function createRoute(queryParams = {}) {
    return { query: { page: "1", ...queryParams } };
  }

  test("it fetch jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    renderComponent(JobListings, {
      global: {
        mocks: { $route: createRoute() },
      },
    });

    // expect(axios.get).toHaveBeenCalledWith(import.meta.env.VITE_APP_API_URL);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs/");
  });

  test("it display Maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });

    renderComponent(JobListings, {
      global: {
        mocks: { $route: createRoute() },
      },
    });
    const jobListing = await screen.findAllByRole("listitem");
    expect(jobListing).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    test(" display page number 1", () => {
      const queryParams = { page: undefined };
      renderComponent(JobListings, {
        global: {
          mocks: { $route: createRoute(queryParams) },
        },
      });

      expect(screen.getByText(/page 1/i)).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    test(" display page number 3", () => {
      const queryParams = { page: 3 };
      renderComponent(JobListings, {
        global: {
          mocks: { $route: createRoute(queryParams) },
        },
      });

      expect(screen.getByText(/page 3/i)).toBeInTheDocument();
    });
  });
  describe("when user in on the first page", () => {
    test(" does not show link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "1" };
      renderComponent(JobListings, {
        global: {
          mocks: { $route: createRoute(queryParams) },
        },
      });
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /Previous/i });

      expect(previousLink).not.toBeInTheDocument();
    });
    test(" is showing link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(25).fill({}) });

      const queryParams = { page: "1" };
      renderComponent(JobListings, {
        global: {
          mocks: { $route: createRoute(queryParams) },
        },
      });
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /Next/i });

      expect(nextLink).toBeInTheDocument();
    });
  });
  describe("when user in on the last page", () => {
    test(" does not show link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      renderComponent(JobListings, {
        global: {
          mocks: { $route: createRoute(queryParams) },
        },
      });
      await screen.findAllByRole("listitem");
      const NextLink = screen.queryByRole("link", { name: /next/i });

      expect(NextLink).not.toBeInTheDocument();
    });
    test(" is showing link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(25).fill({}) });

      const queryParams = { page: "2" };
      renderComponent(JobListings, {
        global: {
          mocks: { $route: createRoute(queryParams) },
        },
      });
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });

      expect(previousLink).toBeInTheDocument();
    });
  });
});
