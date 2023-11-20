// import { render, screen } from "@testing-library/vue";
import { renderComponent, screen } from "../../../setup.ts";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    renderComponent(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("applies one of several styles to button", () => {
    renderComponent(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toHaveClass("primary");
  });
});
