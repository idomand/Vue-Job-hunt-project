import JobFilterSidebarSkills from "../../../../../src/components/JobResults/JobFiltersSidebar/JobFilterSidebarSkills.vue";
import { renderComponent, screen } from "../../../../setup.ts";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import useUserStore from "../../../../../src/stores/user.ts";

import { useRoute } from "vue-router";
import { Mock } from "vitest";
vi.mock("vue-router");

describe("JobFilterSidebarSkills", () => {
  function renderJobFilterSidebarSkills() {
    const useMockRoute = useRoute as Mock;
    useMockRoute.mockReturnValue({ query: { role: "" } });

    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    renderComponent(JobFilterSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  }

  test("it populates search input from store", async () => {
    const { userStore } = renderJobFilterSidebarSkills();
    userStore.skillsSearchTerm = "vue";

    const skillsInputElement =
      await screen.findByRole<HTMLInputElement>("textbox");
    expect(skillsInputElement.value).toBe("vue");
  });
  test("it writes the search input to store", async () => {
    const { userStore } = renderJobFilterSidebarSkills();
    userStore.skillsSearchTerm = "";
    const skillsInputElement =
      await screen.findByRole<HTMLInputElement>("textbox");
    await userEvent.type(skillsInputElement, "V");
    await userEvent.click(document.body);
    expect(skillsInputElement.value).toBe("V");
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });

  test("it removes white space from user inputs", async () => {
    const { userStore } = renderJobFilterSidebarSkills();
    userStore.skillsSearchTerm = "";
    const skillsInputElement =
      await screen.findByRole<HTMLInputElement>("textbox");
    await userEvent.type(skillsInputElement, "       V       ");
    await userEvent.click(document.body);
    expect(skillsInputElement.value).toBe("V");
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });
});
