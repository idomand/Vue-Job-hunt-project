<template>
  <JobFilterSidebarCheckboxGroup
    :action="userStore.ADD_SELECTED_Degrees"
    :unique-values="UNIQUE_DEGREES"
  />
</template>

<script setup lang="ts">
import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";
import useUserStore from "../../../stores/user";
import { computed } from "vue";
import { useDegreesStore } from "@/stores/degrees";
const userStore = useUserStore();
const degreeStore = useDegreesStore();

const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);
</script>
