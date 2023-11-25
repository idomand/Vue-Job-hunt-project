<template>
  <JobFilterSidebarCheckboxGroup
    :action="userStore.ADD_SELECTED_ORGANIZATION"
    :unique-values="UNIQUE_ORGANIZATIONS"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import useJobStore from "../../../stores/jobs";
import useUserStore from "../../../stores/user";

import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";

const jobStore = useJobStore();
const userStore = useUserStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobStore.UNIQUE_ORGANIZATIONS);
</script>
