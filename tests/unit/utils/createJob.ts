import type { Job } from "../../../src/api/types";

export const createJob = (job: Partial<Job> = {}): Job => {
  return {
    id: 1,
    title: "Angular Developer",
    organization: "Vue and Me",
    degree: "Master's",
    jobType: "Intern",
    locations: ["Lisbon"],
    minimumQualifications: ["synergize B2C initiatives"],
    preferredQualifications: [" and disintermediate intuitive niches"],
    description: ["Away someone forget effect wait land."],
    dateAdded: "2021-07-04",
    ...job,
  };
};
