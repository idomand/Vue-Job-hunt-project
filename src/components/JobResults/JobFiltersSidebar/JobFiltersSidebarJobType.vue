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
            <input
              :id="UNIQUE_JOB_TYPE"
              v-model="selectedJobTypes"
              :value="UNIQUE_JOB_TYPE"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            />
            <label :for="UNIQUE_JOB_TYPE">{{ UNIQUE_JOB_TYPE }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>
<script>
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import useJobStore, { UNIQUE_JOB_TYPES } from "../../../stores/jobs";
import useUserStore, { ADD_SELECTED_JOB_TYPES } from "../../../stores/user";

export default {
  name: "JobFiltersSidebarJobType",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapState(useJobStore, [UNIQUE_JOB_TYPES]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
    selectJobType() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
