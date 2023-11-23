import { createPinia, setActivePinia } from "pinia";
import { useDegreesStore } from "../../../src/stores/degrees.js";
import axios from "axios";
import type { Mock } from "vitest";
import { createDegree } from "../utils/createDegree.ts";
describe("Degrees Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  vi.mock("axios");
  const axiosGetMock = axios.get as Mock;

  describe("State", () => {
    test("it stores all degrees that jobs may require", () => {
      const degreesStore = useDegreesStore();
      expect(degreesStore.degrees).toEqual([]);
    });
  });

  describe("actions", () => {
    describe("fetch degrees", () => {
      test("make API requests ", async () => {
        const degreesStore = useDegreesStore();
        axiosGetMock.mockResolvedValue({
          data: [
            {
              id: 1,
              degree: "Associate",
            },
          ],
        });

        await degreesStore.FETCH_DEGREES();
        expect(degreesStore.degrees).toEqual([
          {
            id: 1,
            degree: "Associate",
          },
        ]);
      });
    });
  });
  describe("Getters", () => {
    describe("get unique degrees", () => {
      test("get unique degrees", () => {
        const degreesStore = useDegreesStore();
        degreesStore.degrees = [
          createDegree({ degree: "Associate" }),
          createDegree({ degree: "Ph.D." }),
        ];
        const results = degreesStore.UNIQUE_DEGREES;

        expect(results).toEqual(["Associate", "Ph.D."]);
      });
    });
  });
});
