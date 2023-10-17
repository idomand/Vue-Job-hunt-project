<template>
  <h1 class="text-6xl font-bold">JobResultsView</h1>
  <h1 class="text-6xl font-bold">I'm looking for {{ getRole }}</h1>
  <h1 class="text-6xl font-bold">in {{ getLocation }}</h1>

  <button @click="goHome">got to home</button>
</template>

<script>
export default {
  name: "JobResultsView",
  components: {},
  computed: {
    getRole() {
      console.log("this.$route.params.role :>> ", this.$route);
      return this.$route.query.role;
    },
    getLocation() {
      return this.$route.query.location;
    },
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
