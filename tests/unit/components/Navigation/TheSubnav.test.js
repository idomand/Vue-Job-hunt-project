// import { render, screen } from "@testing-library/vue";
import { renderComponent, screen } from "../../../setup.js";
import { createTestingPinia } from "@pinia/testing";
import useJobsStore from "../../../../src/stores/jobs.ts";
// import { useRoute } from "vue-router";
// vi.mock("vue-router");
import { useRoute } from "vue-router";
vi.mock("vue-router");

import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  function renderSubNav() {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    renderComponent(TheSubnav, {
      global: {
        plugins: [pinia],
      },
    });
    return { jobsStore };
  }

  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      useRoute.mockReturnValue({ name: "JobResults" });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", async () => {
      useRoute.mockReturnValue({ name: "Home" });

      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
