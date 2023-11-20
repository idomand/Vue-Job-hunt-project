import { renderComponent, screen } from "../../../setup.ts";
import CollapsibleAccordion from "../../../../src/components/Shared/CollapsibleAccordion.vue";
import userEvent from "@testing-library/user-event";

describe("Collapsible-Accordion", () => {
  test("it render child content", async () => {
    renderComponent(CollapsibleAccordion, {
      props: { header: "test header" },
      slots: {
        default: "<h3>My nested child</h3>",
      },
    });

    const button = screen.getByRole("button", { name: "test header" });

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.queryByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent not provide custom child", () => {
    test("it render default content", async () => {
      renderComponent(CollapsibleAccordion, {
        props: { header: "test header" },
      });
      const button = screen.getByRole("button", { name: "test header" });
      await userEvent.click(button);
      expect(screen.queryByText("default-content")).toBeInTheDocument();
    });
  });
});
