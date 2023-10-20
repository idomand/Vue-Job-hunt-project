import { renderComponent, screen } from "../../../setup.js";

import JobListing from "../../../../src/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  function createJobProps(jobProps = {}) {
    return {
      title: "foo",
      organization: "foobar",
      minimumQualifications: ["Morph bricks-and-clicks relationships", "test"],
      locations: ["Berlin", "London"],
      ...jobProps,
    };
  }

  function renderJobListing(jobProps) {
    renderComponent(JobListing, {
      props: { job: { ...jobProps } },
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

  test("render job Locations", () => {
    const jobProps = createJobProps({ locations: ["Berlin", "London"] });
    renderJobListing(jobProps);
    const Berlin = screen.getByText("Berlin");
    const London = screen.getByText("London");
    expect(London).toBeInTheDocument();
    expect(Berlin).toBeInTheDocument();
  });

  test("render job Locations", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Morph bricks-and-clicks relationships", "test"],
    });
    renderJobListing(jobProps);
    expect(
      screen.getByText("Morph bricks-and-clicks relationships"),
    ).toBeInTheDocument();
  });
});
