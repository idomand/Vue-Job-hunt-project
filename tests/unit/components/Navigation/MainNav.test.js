import userEvent from "@testing-library/user-event";
import MainNav from "@/components/Navigation/MainNav.vue";
import { renderComponent, screen } from "../../../setup.js";
import { createTestingPinia } from "@pinia/testing";
import useUserStore from "../../../../src/stores/user.js";
describe("MainNav", () => {
  const pinia = createTestingPinia({ stubActions: true });
  console.log("pinia :>> ", pinia);
  const renderMainNav = () => {
    const $route = { name: "Home" };
    renderComponent(MainNav, {
      global: {
        mocks: { $route: $route },
        Plugin: [pinia],
      },
    });
  };

  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Home");

    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
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

  it("when the user logs in --displays user profile picture", async () => {
    renderMainNav();
    const userStore = useUserStore();

    let profileImage = screen.queryByRole("img", {
      name: /user profile image/i,
    });
    expect(profileImage).not.toBeInTheDocument();

    const loginButton = screen.getByRole("button", {
      name: /sign in/i,
    });
    userStore.isLoggedIn = true;
    await userEvent.click(loginButton);

    profileImage = screen.getByRole("img", {
      name: /user profile image/i,
    });
    expect(profileImage).toBeInTheDocument();
  });
});
