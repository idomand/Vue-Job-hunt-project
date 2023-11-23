<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">what would you like to do</h3>
        <div class="flex items-center text-sm">
          <ActionButton
            text="Clear Filters"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
          />
        </div>
      </div>

      <JobFilterSidebarCheckboxGroup
        header="Job types"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
        :unique-values="UNIQUE_JOB_TYPES"
      />
      <JobFilterSidebarCheckboxGroup
        header="Organizations"
        :action="userStore.ADD_SELECTED_ORGANIZATION"
        :unique-values="UNIQUE_ORGANIZATIONS"
      />

      <JobFilterSidebarCheckboxGroup
        header="Degrees"
        :action="userStore.ADD_SELECTED_Degrees"
        :unique-values="UNIQUE_DEGREES"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import ActionButton from "../../Shared/ActionButton.vue";
import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";
import useUserStore from "../../../stores/user";
import useJobStore from "../../../stores/jobs";
import { useDegreesStore } from "../../../stores/degrees";

const userStore = useUserStore();
const jobStore = useJobStore();

const degreeStore = useDegreesStore();

const UNIQUE_ORGANIZATIONS = computed(() => jobStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);
const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);
</script>
