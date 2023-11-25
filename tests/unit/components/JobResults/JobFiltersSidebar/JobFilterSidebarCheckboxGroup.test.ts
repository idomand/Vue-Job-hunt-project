import { Mock } from "vitest";
import JobFilterSidebarCheckboxGroup from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFilterSidebarCheckboxGroup.vue";
import { renderComponent, screen } from "../../../../setup.ts";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
vi.mock("vue-router");
import useUserStore from "../../../../../src/stores/user.ts";
interface JobFilterSidebarCheckboxProps {
  uniqueValues: Set<string>;
  action: Mock;
}

describe("JobFilterSidebarCheckboxGroup", () => {
  const useMockRouter = useRouter as Mock;

  function createProps(
    props: Partial<JobFilterSidebarCheckboxProps> = {},
  ): JobFilterSidebarCheckboxProps {
    return {
      uniqueValues: new Set(["valueA", "valueB"]),
      action: vi.fn(),
      ...props,
    };
  }

  function renderJobFilterSidebarCheckboxGroup(
    props: JobFilterSidebarCheckboxProps,
  ) {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    renderComponent(JobFilterSidebarCheckboxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  }
  test("render UNIQUE list of Values", () => {
    const props = createProps({
      uniqueValues: new Set(["Intern", "Temporary"]),
    });
    const { userStore } = renderJobFilterSidebarCheckboxGroup(props);

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
        uniqueValues: new Set(["Intern", "Temporary"]),
        action: action,
      });

      renderJobFilterSidebarCheckboxGroup(props);
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
        uniqueValues: new Set(["Intern", "Temporary"]),
        action: action,
      });
      renderJobFilterSidebarCheckboxGroup(props);
      const InternCheckbox = screen.getByRole("checkbox", {
        name: "Intern",
      });
      await userEvent.click(InternCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
  describe("when user clear job filter", () => {
    test("it uncheck all checkboxes", async () => {
      useMockRouter.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();

      const props = createProps({
        uniqueValues: new Set(["Intern", "Temporary"]),
        action: action,
      });
      const { userStore } = renderJobFilterSidebarCheckboxGroup(props);
      const InternCheckbox = screen.getByRole<HTMLInputElement>("checkbox", {
        name: "Intern",
      });

      await userEvent.click(InternCheckbox);
      expect(InternCheckbox.checked).toBe(true);

      await userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(InternCheckbox.checked).toBe(false);
    });
  });
});
