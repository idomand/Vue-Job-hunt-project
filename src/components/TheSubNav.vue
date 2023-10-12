<template>
  <div class="bg-white w-full h-16 border-b border-solid border-brand-gray-1">
    <div v-if="onJobResultsPage" class="flex items-center h-full px-8">
      <div>
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      </div>
      <div><span class="text-brand-green-1">1653</span> jobs matched</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSubNav",
  data() {
    return { onJobResultsPage: true };
  },
};
</script>
