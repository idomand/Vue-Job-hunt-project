import { renderComponent, screen } from "../../../setup.ts";
import { vi } from "vitest";
import SpotLights from "../../../../src/components/JobSearch/SpotLights.vue";
import axios from "axios";
vi.mock("axios");

function renderSpotLights(option) {
  axios.get.mockResolvedValue({
    data: [
      {
        img: "some image",
        title: "some title",
        id: 1,
        description: "some description",
      },
    ],
  });
  renderComponent(SpotLights, {
    slots: {
      spotlightName: `<template #spotlightName="slotProps">
              <h1>{{slotProps.${option}}}</h1>
          </template>`,
    },
  });
}
describe("SpotLights", () => {
  test("it provide image too parent component", async () => {
    renderSpotLights("img");
    const text = await screen.findByText("some image");
    expect(text).toBeInTheDocument();
  });
  test("it provide Title too parent component", async () => {
    renderSpotLights("title");
    const text = await screen.findByText("some title");
    expect(text).toBeInTheDocument();
  });
  test("it provide description too parent component", async () => {
    renderSpotLights("description");
    const text = await screen.findByText("some description");
    expect(text).toBeInTheDocument();
  });
});
