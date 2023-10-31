import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/vue";
import { afterEach } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";
import merge from "lodash/merge";

afterEach(() => {
  cleanup();
});
export * from "@testing-library/vue";

export function renderComponent(element, options = {}) {
  const defaultOptions = {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
        FontAwesomeIcon: true,
      },
    },
  };

  const mergedOptions = merge(defaultOptions, options);
  console.log("mergedOptions :>> ", mergedOptions);
  return { ...render(element, mergedOptions) };
}
