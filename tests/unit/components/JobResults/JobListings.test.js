import JobListings from "../../../../src/components/JobResults/JobListings.vue";
import { expect, vi } from "vitest";
import axios from "axios";

import { renderComponent, screen } from "../../../setup.js";

describe("JobListings", () => {
  vi.mock("axios");

  test("it fetch jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    renderComponent(JobListings);

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs/");
  });
  test("it create a job listing for every job", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });

    renderComponent(JobListings);
    const jobListing = await screen.findAllByRole("listitem");
    expect(jobListing).toHaveLength(15);
  });
});
