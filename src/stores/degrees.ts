import { defineStore } from "pinia";
import { DegreesType } from "../api/types";
import { getDegrees } from "../api/getDegrees";
import { ref, computed } from "vue";

export const useDegreesStore = defineStore("Degrees", () => {
  const degrees = ref<DegreesType[]>([]);

  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees();
    degrees.value = receivedDegrees;
  };
  const UNIQUE_DEGREES = computed(() => {
    return degrees.value.map((element) => {
      return element.degree;
    });
  });

  return {
    degrees,
    FETCH_DEGREES,
    UNIQUE_DEGREES,
  };
});
