import type { DegreesType } from "../../../src/api/types";

export const createDegree = (
  degree: Partial<DegreesType> = {},
): DegreesType => {
  return {
    id: 1,
    degree: "some text",
    ...degree,
  };
};
