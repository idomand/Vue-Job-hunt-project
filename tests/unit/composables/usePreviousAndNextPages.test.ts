import { ref } from "vue";
import usePreviousAndNextPages from "../../../src/composables/usePreviousAndNextPages.js";

describe("usePreviousAndNextPages", () => {
  test("it calculates page before current one", () => {
    const currantPage = ref(8);
    const maxPage = ref(10);

    const { previousPage } = usePreviousAndNextPages(currantPage, maxPage);
    expect(previousPage.value).toBe(7);
  });
  test("when current page is the first page -- it should not show previous page", () => {
    const currantPage = ref(1);
    const maxPage = ref(10);

    const { previousPage } = usePreviousAndNextPages(currantPage, maxPage);
    expect(previousPage.value).toBeUndefined();
  });
  test("it calculates page AFTER current one", () => {
    const currantPage = ref(8);
    const maxPage = ref(10);

    const { nextPage } = usePreviousAndNextPages(currantPage, maxPage);
    expect(nextPage.value).toBe(9);
  });
  test("when current page is the last page -- it should NOT show NEXT page", () => {
    const currantPage = ref(10);
    const maxPage = ref(10);

    const { nextPage } = usePreviousAndNextPages(currantPage, maxPage);
    expect(nextPage.value).toBeUndefined();
  });
});
