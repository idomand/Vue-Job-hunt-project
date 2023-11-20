import { renderComponent, screen } from "../../../setup.ts";
import { createJob } from "../../utils/createJob.ts";
import { Job } from "../../../../src/api/types.ts";
import JobListing from "../../../../src/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  function renderJobListing(job: Job) {
    renderComponent(JobListing, {
      props: { job: { ...job } },
    });
  }

  test("render job title", () => {
    const newJob = createJob({ title: "1234" });
    renderJobListing(newJob);
    const title = screen.getByRole("heading", { name: "1234" });
    expect(title).toBeInTheDocument();
  });
  test("render job organization", () => {
    const newJob = createJob({ organization: "test123" });
    renderJobListing(newJob);
    const title = screen.getByText("test123");
    expect(title).toBeInTheDocument();
  });

  test("render job Locations", () => {
    const newJob = createJob({ locations: ["Berlin", "London"] });
    renderJobListing(newJob);
    const Berlin = screen.getByText("Berlin");
    const London = screen.getByText("London");
    expect(London).toBeInTheDocument();
    expect(Berlin).toBeInTheDocument();
  });

  test("render job Locations", () => {
    const newJob = createJob({
      minimumQualifications: ["Morph bricks-and-clicks relationships", "test"],
    });
    renderJobListing(newJob);
    expect(
      screen.getByText("Morph bricks-and-clicks relationships"),
    ).toBeInTheDocument();
  });
});
