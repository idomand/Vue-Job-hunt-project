import userEvent from "@testing-library/user-event";
import { renderComponent, screen } from "../../../setup.ts";
import { useRouter } from "vue-router";

import TheJobSearchForm from "../../../../src/components/JobSearch/TheJobSearchForm.vue";

import { Mock } from "vitest";

vi.mock("vue-router");

describe("TheJobSearchForm", () => {
  const useMockRouter = useRouter as Mock;

  describe("when user Submit form", () => {
    test("it should move user to job results page with user search prams", async () => {
      const push = vi.fn();
      useMockRouter.mockReturnValue({ push });
      renderComponent(TheJobSearchForm, {
        global: {},
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
