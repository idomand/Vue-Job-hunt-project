import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import TextInput from "../../../../src/components/Shared/TextInput.vue";
import { expect } from "vitest";

describe("text-input", () => {
  test("test that user entered character", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Test");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["T"], ["Te"], ["Tes"], ["Test"]]);
  });
});
