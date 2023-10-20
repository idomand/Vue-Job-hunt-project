import userEvent from "@testing-library/user-event";
import { renderComponent, screen } from "../../../setup.js";

import TheJobSearchForm from "../../../../src/components/JobSearch/TheJobSearchForm.vue";

describe("TheJobSearchForm", () => {
  describe("when user Submit form", () => {
    test("it should move user to job results page with user search prams", async () => {
      const push = vi.fn();

      const $router = { push };

      renderComponent(TheJobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
          mocks: { $router: $router },
        },
      });

      const roleTextInput = screen.getByRole("textbox", { name: /role/i });
      const locationTextInput = screen.getByRole("textbox", {
        name: /Where?/i,
      });
      const formSubmitButton = screen.getByRole("button", {
        name: /search/i,
      });

      await userEvent.type(roleTextInput, "Vue developer");
      await userEvent.type(locationTextInput, "Berlin");
      await userEvent.click(formSubmitButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue developer", location: "Berlin" },
      });
    });
  });
});
