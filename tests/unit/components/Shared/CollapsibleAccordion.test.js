import { renderComponent, screen } from "../../../setup.js";
import CollapsibleAccordion from "../../../../src/components/Shared/CollapsibleAccordion.vue";
import userEvent from "@testing-library/user-event";

describe("Collapsible-Accordion", () => {
  test("it render child content", async () => {
    const V1 = renderComponent(CollapsibleAccordion, {
      global: {},
      props: { header: "test header" },
      slots: {
        default: "<h3>My nested child</h3>",
      },
    });

    console.log("V1 :>> ", V1.html());
    const button = screen.getByRole("button", { name: "test header" });

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.queryByText("My nested child")).toBeInTheDocument();
  });
});
