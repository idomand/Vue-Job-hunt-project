<template>
  <input
    class="w-full font-normal text-lg focus:outline-none"
    type="text"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: { type: String, required: true },
});
const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
<!-- 
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TextInput",
  props: {
    modelValue: { type: String, required: true },
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script> -->
