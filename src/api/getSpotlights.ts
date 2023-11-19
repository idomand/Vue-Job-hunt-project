import type { Spotlights } from "./types";
import axios from "axios";

async function getSpotlights() {
  const baseURL = "http://localhost:3000/spotlights";
  const response = await axios.get<Spotlights[]>(baseURL);
  const data = await response.data;
  return data;
}

export default getSpotlights;
