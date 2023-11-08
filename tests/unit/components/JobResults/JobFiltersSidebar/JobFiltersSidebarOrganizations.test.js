import JobFiltersSidebarOrganizations from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { renderComponent, screen } from "../../../../setup.js";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import useJobStore from "../../../../../src/stores/jobs.js";
import useUserStore from "../../../../../src/stores/user.js";

describe("JobFiltersSidebarOrganizations", () => {
  function renderJobFiltersSidebarOrganizations() {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    const userStore = useUserStore();

    const $router = { push: vi.fn() };

    renderComponent(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        mocks: { $router },
      },
    });
    return { jobStore, userStore, $router };
  }
  test("render UNIQUE ORGANIZATIONS list from jobs", async () => {
    const { jobStore } = renderJobFiltersSidebarOrganizations();

    jobStore.UNIQUE_ORGANIZATIONS = new Set(["google", "amazon"]);
    const CollapsibleAccordionHeader = screen.getByRole("button", {
      name: /organizations/i,
    });

    await userEvent.click(CollapsibleAccordionHeader);
    const organizationsListItems = screen.getAllByRole("listitem");
    const organizations = organizationsListItems.map((element) => {
      return element.textContent;
    });
    expect(organizations).toEqual(["google", "amazon"]);
  });

  describe("when user click checkbox", () => {
    test("show that the user clicked on a checkbox", async () => {
      const { jobStore, userStore } = renderJobFiltersSidebarOrganizations();
      jobStore.UNIQUE_ORGANIZATIONS = new Set(["google", "amazon"]);

      const CollapsibleAccordionHeader = screen.getByRole("button", {
        name: /organizations/i,
      });
      await userEvent.click(CollapsibleAccordionHeader);
      const googleCheckbox = screen.getByRole("checkbox", { name: "google" });
      await userEvent.click(googleCheckbox);
      expect(userStore.ADD_SELECTED_ORGANIZATION).toHaveBeenCalledWith([
        "google",
      ]);
    });
    test("it navigate user to JobResults page", async () => {
      const { jobStore, $router } = renderJobFiltersSidebarOrganizations();
      jobStore.UNIQUE_ORGANIZATIONS = new Set(["google"]);
      const CollapsibleAccordionHeader = screen.getByRole("button", {
        name: /organizations/i,
      });
      await userEvent.click(CollapsibleAccordionHeader);
      const googleCheckbox = screen.getByRole("checkbox", {
        name: "google",
      });
      await userEvent.click(googleCheckbox);
      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
