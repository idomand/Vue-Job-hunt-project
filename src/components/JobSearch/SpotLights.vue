<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <!-- <slot :spotlight="spotlight"></slot> -->
      <slot
        name="spotlightName"
        :description="spotlight.description"
        :title="spotlight.title"
        :img="spotlight.img"
      ></slot>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { SpotlightsType } from "../../api/types";
import getSpotlights from "../../api/getSpotlights";

const spotlights = ref<SpotlightsType[]>([]);

onMounted(async () => {
  spotlights.value = await getSpotlights();
});
</script>

<!-- <script>
import getSpotlights from "../../api/getSpotlights";
export default {
  name: "SpotLights",
  data() {
    return {
      spotlights: [],
    };
  },
  async mounted() {
    this.spotlights = await getSpotlights();
  },
};
</script> -->
