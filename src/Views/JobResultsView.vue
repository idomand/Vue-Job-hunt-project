<template>
  <h1 class="text-6xl font-bold">JobResultsView</h1>
  <button @click="goHome">got to home</button>
</template>

<script>
export default {
  name: "JobResultsView",
  components: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
