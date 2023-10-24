import axios from "axios";
async function getJobs() {
  const baseURL = "http://localhost:3000/jobs";
  const response = await axios.get(baseURL);
  const data = await response.data;
  return data;
}

export default getJobs;
