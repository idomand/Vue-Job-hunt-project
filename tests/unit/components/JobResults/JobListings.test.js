import JobListings from "../../../../src/components/JobResults/JobListings.vue";
import { expect, vi } from "vitest";
import axios from "axios";
import { RouterLinkStub } from "@vue/test-utils";

import { renderComponent, screen } from "../../../setup.js";

describe("JobListings", () => {
  vi.mock("axios");

  test("it fetch jobs", () => {
    axios.get.mockResolvedValue({ data: [] });

    const $route = { query: { page: "1" } };

    renderComponent(JobListings, {
      global: {
        mocks: { $route: $route },
      },
    });

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs/");
  });
  test("it display Maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const $route = { query: { page: "1" } };

    renderComponent(JobListings, {
      global: {
        mocks: { $route: $route },
        stubs: {
          RouterLink: RouterLinkStub,
          FontAwesomeIcon: true,
        },
      },
    });
    const jobListing = await screen.findAllByRole("listitem");
    expect(jobListing).toHaveLength(10);
  });
});
