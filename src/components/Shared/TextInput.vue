<template>
  <input
    class="w-full font-normal text-lg focus:outline-none"
    type="text"
    :value="value"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",

  props: {
    value: { type: String, required: true },
  },
  methods: {
    handleInput($event) {
      this.$emit("handleInput", $event.target.value);
    },
  },
};
</script>
