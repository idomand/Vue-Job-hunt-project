import JobFiltersSidebarJobType from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobType.vue";
import { renderComponent, screen } from "../../../../setup.js";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import useJobStore from "../../../../../src/stores/jobs.js";
import useUserStore from "../../../../../src/stores/user.js";

describe("JobFiltersSidebarJobType", () => {
  function renderJobFiltersSidebarJobType() {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    renderComponent(JobFiltersSidebarJobType, {
      global: {
        plugins: [pinia],
        mocks: { $router },
      },
    });
    return { jobStore, userStore, $router };
  }
  test("render UNIQUE_JOB_TYPES list from jobs", async () => {
    const { jobStore } = renderJobFiltersSidebarJobType();

    jobStore.UNIQUE_JOB_TYPES = new Set(["Intern", "Temporary"]);
    const CollapsibleAccordionHeader = screen.getByRole("button", {
      name: /Job types/i,
    });

    await userEvent.click(CollapsibleAccordionHeader);
    const jobTypesListItems = screen.getAllByRole("listitem");

    const jobTypes = jobTypesListItems.map((element) => {
      return element.textContent;
    });
    expect(jobTypes).toEqual(["Intern", "Temporary"]);
  });

  describe("when user click checkbox", () => {
    test("show that the user clicked on a checkbox", async () => {
      const { jobStore, userStore } = renderJobFiltersSidebarJobType();
      jobStore.UNIQUE_JOB_TYPES = new Set(["Intern", "Temporary"]);
      const CollapsibleAccordionHeader = screen.getByRole("button", {
        name: /Job types/i,
      });
      await userEvent.click(CollapsibleAccordionHeader);
      const temporaryCheckbox = screen.getByRole("checkbox", {
        name: "Temporary",
      });
      await userEvent.click(temporaryCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Temporary",
      ]);
    });
    test("it navigate user to JobResults page", async () => {
      const { jobStore, $router } = renderJobFiltersSidebarJobType();
      jobStore.UNIQUE_JOB_TYPES = new Set(["Intern"]);
      const CollapsibleAccordionHeader = screen.getByRole("button", {
        name: /Job types/i,
      });
      await userEvent.click(CollapsibleAccordionHeader);
      const InternCheckbox = screen.getByRole("checkbox", {
        name: "Intern",
      });
      await userEvent.click(InternCheckbox);
      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});