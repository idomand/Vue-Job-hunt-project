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

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CollapsibleAccordion from "../../Shared/CollapsibleAccordion.vue";
import useUserStore from "../../../stores/user";

const userStore = useUserStore();

const router = useRouter();

const props = defineProps({
  header: { type: String, required: true },
  uniqueValues: { type: [Set<string>, Array<string>], required: true },
  action: { type: Function, required: true },
});
const selectedValues = ref<string[]>([]);

function selectValue() {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
}

userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name == "CLEAR_USER_JOB_FILTER_SELECTIONS") {
      selectedValues.value = [];
    }
  });
});
</script>
