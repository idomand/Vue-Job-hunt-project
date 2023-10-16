<template>
  <input
    class="w-full font-normal text-lg focus:outline-none"
    type="text"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",

  props: {
    modelValue: { type: String, required: true },
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>
