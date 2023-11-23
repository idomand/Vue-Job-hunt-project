import type { Degrees } from "./types";

import axios from "axios";

export const getDegrees = async () => {
  const baseURL = "http://localhost:3000/degrees";
  const response = await axios.get<Degrees[]>(baseURL);
  return response.data;
};
