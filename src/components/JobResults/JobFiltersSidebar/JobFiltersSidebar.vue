<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <JobFilterSidebarPrompt />
      <JobFilterSidebarSkills />
      <CollapsibleAccordion header="Degrees">
        <JobFilterSidebarDegrees />
      </CollapsibleAccordion>
      <CollapsibleAccordion header="Job types">
        <JobFilterSidebarJobType />
      </CollapsibleAccordion>
      <CollapsibleAccordion header="Organizations"
        ><JobFilterSidebarOrganizations />
      </CollapsibleAccordion>
    </section>
  </div>
</template>

<script setup lang="ts">
import JobFilterSidebarSkills from "./JobFilterSidebarSkills.vue";
import JobFilterSidebarPrompt from "./JobFilterSidebarPrompt.vue";
import JobFilterSidebarDegrees from "./JobFilterSidebarDegrees.vue";
import JobFilterSidebarJobType from "./JobFilterSidebarJobType.vue";
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";
import JobFilterSidebarOrganizations from "./JobFilterSidebarOrganizations.vue";
</script>
