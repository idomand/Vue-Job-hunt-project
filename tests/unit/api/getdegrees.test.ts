import type { Mock } from "vitest";

import { getDegrees } from "../../../src/api/getDegrees";
import axios from "axios";

import { beforeEach, expect, vi } from "vitest";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("get degrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({ data: [{ id: 1, degree: "Master's" }] });
  });

  test("it fetches jobs", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/degrees");
  });

  test("extracts jobs from response", async () => {
    const degree = await getDegrees();
    expect(degree).toEqual([{ id: 1, degree: "Master's" }]);
  });
});
