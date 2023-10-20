import JobListings from "../../../../src/components/JobResults/JobListings.vue";
import { expect, vi } from "vitest";
import axios from "axios";

import { renderComponent, screen } from "../../../setup.js";

describe("JobListings", () => {
  vi.mock("axios");

  function createRoute(queryParams = {}) {
    return { query: { page: "1", ...queryParams } };
  }
  test("it fetch jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    renderComponent(JobListings, {
      global: {
        mocks: { $route: { query: { page: "1" } } },
      },
    });

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
});
