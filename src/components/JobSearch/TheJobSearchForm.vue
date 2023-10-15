<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex flex-1 flex-nowrap h-full text-base font-light">
      <div class="flex h-full flex-1 relative items-center pr-3">
        <label class="absolute left-0 -top-10" for="">Role</label>
        <input
          v-model="role"
          class="w-full font-normal text-lg focus:outline-none"
          placeholder="software developer"
          type="text"
        />
      </div>
      <span
        class="flex items-center h-full border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>
      <div class="flex h-full flex-1 relative items-center pl-3">
        <label class="absolute left-0 -top-10" for="">Where?</label>
        <input
          v-model="location"
          class="w-full font-normal text-lg focus:outline-none"
          placeholder="Berlin"
          type="text"
        />
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>
<script>
import ActionButton from "../Shared/ActionButton.vue";
export default {
  name: "TheJobSearchForm",

  components: { ActionButton },
  data() {
    return {
      role: "",
      location: "",
    };
  },
  computed: {},
  methods: {},
};
</script>
