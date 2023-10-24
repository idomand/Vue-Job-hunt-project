<template>
  <main-nav />

  <router-view />
</template>

<script>
import MainNav from "./components/Navigation/MainNav.vue";

console.log("test");

export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>
