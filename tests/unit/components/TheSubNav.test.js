import { render, screen } from "@testing-library/vue";

import TheSubNav from "../../../src/components/TheSubNav.vue";
import { expect } from "vitest";

describe("testing TheSubNav", () => {
  describe("when user is on jobs page", () => {
    test("should show job count", () => {
      render(TheSubNav, {
        global: {
          stubs: {
            fontAwesomeIcon: true,
          },
        },
        data() {
          return { onJobResultsPage: true };
        },
      });
      const jobCount = screen.getByText("1653");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is NOT on jobs page", () => {
    test("should NOT show job count", () => {
      render(TheSubNav, {
        global: {
          stubs: {
            fontAwesomeIcon: true,
          },
        },
        data() {
          return { onJobResultsPage: false };
        },
      });
      const jobCount = screen.queryByText("1653");
      expect(jobCount).not.toBeInTheDocument();
    });
  });

  test("should first", () => {
    expect(1).toBe(1);
  });
});
