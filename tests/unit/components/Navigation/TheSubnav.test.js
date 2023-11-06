// import { render, screen } from "@testing-library/vue";
import { renderComponent, screen } from "../../../setup.js";
import { createTestingPinia } from "@pinia/testing";
import useJobStore from "../../../../src/stores/jobs.js";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  function renderSubNav(routeName) {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    renderComponent(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: { $route: { name: routeName } },
      },
    });
    return { jobStore };
  }

  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      const routeName = "JobResults";
      const { jobStore } = renderSubNav(routeName);
      const numberOfJobs = 16;
      jobStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({});

      screen.debug();
      const jobCount = await screen.findByText(numberOfJobs);

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", async () => {
      const routeName = "Home";
      const { jobStore } = renderSubNav(routeName);
      const numberOfJobs = 16;
      jobStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({});
      const jobCount = await screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
