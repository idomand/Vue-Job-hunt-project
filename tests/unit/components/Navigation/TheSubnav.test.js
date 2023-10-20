// import { render, screen } from "@testing-library/vue";
import { renderComponent, screen } from "../../../setup.js";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  function renderSubNav(routeName) {
    renderComponent(TheSubnav, {
      global: {
        mocks: { $route: { name: routeName } },
      },
    });
  }

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";

      renderSubNav(routeName);

      const jobCount = screen.getByText("1653");

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      const routeName = "Home";

      renderSubNav(routeName);

      const jobCount = screen.queryByText("1653");

      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
