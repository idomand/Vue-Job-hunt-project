import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent,
    );
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user Logs in", () => {
    test("show profile picture", async () => {
      render(MainNav);
      let profileImageElement = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      const signInButtonElement = screen.queryByRole("button", {
        name: /Sign In/i,
      });
      expect(profileImageElement).not.toBeInTheDocument();
      await userEvent.click(signInButtonElement);
      profileImageElement = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImageElement).toBeInTheDocument();
    });
  });
});
