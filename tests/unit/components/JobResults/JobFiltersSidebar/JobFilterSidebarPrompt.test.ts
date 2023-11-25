import JobFilterSidebarPrompt from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFilterSidebarPrompt.vue";
// import { Mock } from "vitest";
import { renderComponent, screen } from "../../../../setup.ts";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
// import { useRouter } from "vue-router";
// vi.mock("vue-router");
import useUserStore from "../../../../../src/stores/user.ts";

describe("JobFilterSidebarPrompt", () => {
  function renderJobFilterSidebarPrompt() {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    renderComponent(JobFilterSidebarPrompt, {
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  }

  test("when user click 'clear filters' button", async () => {
    const { userStore } = renderJobFilterSidebarPrompt();

    const clearFiltersButton = screen.getByRole("button", {
      name: /clear filters/i,
    });

    await userEvent.click(clearFiltersButton);
    expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled();
  });
});
