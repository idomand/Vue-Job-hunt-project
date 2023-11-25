<template>
  <JobFilterSidebarCheckboxGroup
    :action="userStore.ADD_SELECTED_JOB_TYPES"
    :unique-values="UNIQUE_JOB_TYPES"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import useJobStore from "../../../stores/jobs";
import useUserStore from "../../../stores/user";

import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";

const jobStore = useJobStore();
const userStore = useUserStore();
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);
</script>
