import type { Mock } from "vitest";

import getJobs from "../../../src/api/getJobs";
import axios from "axios";

import { beforeEach, expect, vi } from "vitest";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("getJobs", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({ data: [{ id: 1, title: "job title" }] });
  });

  test("it fetches jobs", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  test("extracts jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([{ id: 1, title: "job title" }]);
  });
});
