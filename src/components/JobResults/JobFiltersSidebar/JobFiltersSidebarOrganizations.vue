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
            <input
              :id="UNIQUE_ORGANIZATION"
              v-model="selectedOrgs"
              :value="UNIQUE_ORGANIZATION"
              type="checkbox"
              class="mr-3"
              @change="selectOrg"
            />
            <label :for="UNIQUE_ORGANIZATION">{{ UNIQUE_ORGANIZATION }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>
<script>
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import useJobStore, { UNIQUE_ORGANIZATIONS } from "../../../stores/jobs";
import useUserStore, { ADD_SELECTED_ORGANIZATION } from "../../../stores/user";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: {
    CollapsibleAccordion,
  },
  data() {
    return {
      selectedOrgs: [],
    };
  },
  computed: {
    ...mapState(useJobStore, [UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATION]),
    selectOrg() {
      this.ADD_SELECTED_ORGANIZATION(this.selectedOrgs);
    },
  },
};
</script>
