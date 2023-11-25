<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-grey"
      placeholder="programming"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

console.log("route.query.role :>> ", route.query.role);

import useUserStore from "../../../stores/user";

const userStore = useUserStore();

const skillsSearchTerm = computed({
  get: () => {
    return userStore.skillsSearchTerm;
  },
  set: (value: string) => {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
});

onMounted(() => {
  if (route.query.role) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(route.query.role as string);
  }
});
</script>
