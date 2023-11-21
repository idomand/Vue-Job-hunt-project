<template>
  <h2>Job Page</h2>
  <h1>{{ currentJobId }}</h1>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const currentJobId = computed(() => route.params.id);
</script>
