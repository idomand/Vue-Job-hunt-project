import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/vue";
import { afterEach } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";

afterEach(() => {
  cleanup();
});
export * from "@testing-library/vue";

const basicOptions = {
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
      FontAwesomeIcon: true,
    },
  },
};

export function renderComponent(element, options = basicOptions) {
  return { ...render(element, options) };
}
