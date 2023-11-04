import JobFiltersSidebarOrganizations from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { renderComponent, screen } from "../../../../setup.js";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import useJobStore from "../../../../../src/stores/jobs.js";

describe("JobFiltersSidebarOrganizations", () => {
  //   function renderJobFiltersSidebarOrganizations() {
  //     const pinia = createTestingPinia();
  //     renderComponent(JobFiltersSidebarOrganizations, {
  //       global: {
  //         plugins: [pinia],
  //       },
  //     });
  //   }
  test("render UNIQUE ORGANIZATIONS list from jobs", async () => {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    jobStore.UNIQUE_ORGANIZATIONS = new Set(["google", "amazon"]);
    renderComponent(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
      },
    });
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
});
