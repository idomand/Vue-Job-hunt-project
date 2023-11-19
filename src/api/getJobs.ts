import type { Job } from "./types";

import axios from "axios";

async function getJobs() {
  const baseURL = "http://localhost:3000/jobs";
  const response = await axios.get<Job[]>(baseURL);
  return response.data;
}

export default getJobs;
