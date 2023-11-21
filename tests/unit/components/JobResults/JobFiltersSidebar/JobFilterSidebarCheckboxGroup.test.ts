import { Mock } from "vitest";
import JobFilterSidebarCheckboxGroup from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckboxGroup.vue";
import { renderComponent, screen } from "../../../../setup.ts";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
vi.mock("vue-router");

interface JobFilterSidebarCheckboxProps {
  header: string;
  uniqueValues: Set<string>;
  action: Mock;
}

describe("JobFilterSidebarCheckboxGroup", () => {
  const useMockRouter = useRouter as Mock;

  function createProps(
    props: Partial<JobFilterSidebarCheckboxProps> = {},
  ): JobFilterSidebarCheckboxProps {
    return {
      header: "some header",
      uniqueValues: new Set(["valueA", "valueB"]),
      action: vi.fn(),
      ...props,
    };
  }

  function renderJobFilterSidebarCheckboxGroup(
    props: JobFilterSidebarCheckboxProps,
  ) {
    const pinia = createTestingPinia();
    renderComponent(JobFilterSidebarCheckboxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia],
      },
    });
  }
  test("render UNIQUE list of Values", async () => {
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Intern", "Temporary"]),
    });
    renderJobFilterSidebarCheckboxGroup(props);

    const CollapsibleAccordionHeader = screen.getByRole("button", {
      name: /Job Types/i,
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
      useMockRouter.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Intern", "Temporary"]),
        action: action,
      });

      renderJobFilterSidebarCheckboxGroup(props);
      const CollapsibleAccordionHeader = screen.getByRole("button", {
        name: /Job types/i,
      });
      await userEvent.click(CollapsibleAccordionHeader);
      const temporaryCheckbox = screen.getByRole("checkbox", {
        name: "Temporary",
      });
      await userEvent.click(temporaryCheckbox);
      expect(action).toHaveBeenCalledWith(["Temporary"]);
    });
    test("it navigate user to JobResults page", async () => {
      const push = vi.fn();
      useMockRouter.mockReturnValue({ push });
      const action = vi.fn();
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Intern", "Temporary"]),
        action: action,
      });
      renderJobFilterSidebarCheckboxGroup(props);
      const CollapsibleAccordionHeader = screen.getByRole("button", {
        name: /Job types/i,
      });
      await userEvent.click(CollapsibleAccordionHeader);
      const InternCheckbox = screen.getByRole("checkbox", {
        name: "Intern",
      });
      await userEvent.click(InternCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});