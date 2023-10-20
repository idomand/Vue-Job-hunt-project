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

  // if (options.global && options.global.mocks) {
  //   mergedOptions.global.mocks = options.global.mocks;
  // }

  // if (options.global && options.global.mocks) {
  //   mergedOptions.global.mocks = {
  //     ...mergedOptions.global.mocks,
  //     ...options.global.mocks,
  //   };
  // }
  // console.log("mergedOptions.global :>> ", mergedOptions.global);

  // if (options && options.props) {
  //   mergedOptions.props = options.props;
  // }

  return { ...render(element, mergedOptions) };
}
