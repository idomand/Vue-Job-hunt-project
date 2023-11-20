import { renderComponent, screen } from "../../../setup.ts";
import { createTestingPinia } from "@pinia/testing";
import useJobsStore from "../../../../src/stores/jobs.ts";
import { useRoute } from "vue-router";
vi.mock("vue-router");
import type { Mock } from "vitest";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  const useMockRoute = useRoute as Mock;

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
      useMockRoute.mockReturnValue({ name: "JobResults" });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      //@ts-ignore
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", async () => {
      useMockRoute.mockReturnValue({ name: "Home" });

      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      //@ts-ignore
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
