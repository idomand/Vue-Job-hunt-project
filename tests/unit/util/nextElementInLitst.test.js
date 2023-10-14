import nextElementInList from "../../../src/util/nextElementInList.js";

describe("nextElementInList", () => {
  test("it return next element in list", () => {
    const list = ["a", "b", "c", "d", "e"];
    const value = "e";
    const result = nextElementInList(list, value);
    expect(result).toBe("a");
  });
});
