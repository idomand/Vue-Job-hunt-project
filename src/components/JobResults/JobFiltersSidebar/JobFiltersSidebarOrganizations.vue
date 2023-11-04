<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li
            v-for="UNIQUE_ORGANIZATION in UNIQUE_ORGANIZATIONS"
            :key="UNIQUE_ORGANIZATION"
            class="h-8 w-1/2"
          >
            <input :id="UNIQUE_ORGANIZATION" type="checkbox" class="mr-3" />
            <label :for="UNIQUE_ORGANIZATION">{{ UNIQUE_ORGANIZATION }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>
<script>
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";
import { mapState } from "pinia";
import useJobStore, { UNIQUE_ORGANIZATIONS } from "../../../stores/jobs";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: {
    CollapsibleAccordion,
  },
  computed: {
    ...mapState(useJobStore, [UNIQUE_ORGANIZATIONS]),
  },
};
</script>
