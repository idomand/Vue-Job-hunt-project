<template>
  <CollapsibleAccordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";

const router = useRouter();

const props = defineProps({
  header: { type: String, required: true },
  uniqueValues: { type: Set, required: true },
  action: { type: Function, required: true },
});
const selectedValues = ref([]);

function selectValue() {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
}
</script>
