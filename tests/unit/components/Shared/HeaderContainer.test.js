import { renderComponent, screen } from "../../../setup.ts";
import HeaderContainer from "../../../../src/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  test("allows parent component to provide title content ", () => {
    renderComponent(HeaderContainer, {
      slots: {
        title: "<h2>some title</h2>",
      },
    });
    expect(screen.getByText(/some title/i)).toBeInTheDocument();
  });
  test("allows parent component to provide subtitle content ", () => {
    renderComponent(HeaderContainer, {
      slots: {
        subtitle: "<h2>some subtitle</h2>",
      },
    });
    expect(screen.getByText(/some subtitle/i)).toBeInTheDocument();
  });
});
