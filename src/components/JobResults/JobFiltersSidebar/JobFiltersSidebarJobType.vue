<template>
  <CollapsibleAccordion header="Job types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li
            v-for="UNIQUE_JOB_TYPE in UNIQUE_JOB_TYPES"
            :key="UNIQUE_JOB_TYPE"
            class="h-8 w-1/2"
          >
            <input :id="UNIQUE_JOB_TYPE" type="checkbox" class="mr-3" />
            <label :for="UNIQUE_JOB_TYPE">{{ UNIQUE_JOB_TYPE }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>
<script>
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";
import { mapState } from "pinia";
import useJobStore, { UNIQUE_JOB_TYPES } from "../../../stores/jobs";

export default {
  name: "JobFiltersSidebarJobType",
  components: { CollapsibleAccordion },
  computed: {
    ...mapState(useJobStore, [UNIQUE_JOB_TYPES]),
  },
};
</script>
