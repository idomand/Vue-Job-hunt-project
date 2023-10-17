<template>
  <h2>Job Page</h2>
  <h1>{{ currentJobId }}</h1>
</template>

<script>
export default {
  name: "JobView",

  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>
