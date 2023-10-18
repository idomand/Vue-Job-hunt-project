import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "../../../../src/components/JobResults/JobListing.vue";
import { expect } from "vitest";

describe("JobListing", () => {
  function createJobProps(jobProps = {}) {
    return { title: "foo", organization: "foobar", ...jobProps };
  }

  function renderJobListing(jobProps) {
    render(JobListing, {
      props: { job: { ...jobProps } },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  }

  test("render job title", () => {
    const jobProps = createJobProps({ title: "1234" });
    renderJobListing(jobProps);
    const title = screen.getByRole("heading", { name: "1234" });
    expect(title).toBeInTheDocument();
  });
  test("render job organization", () => {
    const jobProps = createJobProps({ organization: "test123" });
    renderJobListing(jobProps);
    const title = screen.getByText("test123");
    expect(title).toBeInTheDocument();
  });
});
