<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot :spotlight="spotlight"></slot>
    </li>
  </ul>
</template>
<script>
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
</script>
