<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link class="flex h-full items-center text-2xl" to="/">
          Home
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0 text-2xl"
            >
              <router-link
                class="flex h-full items-center py-2.5"
                :to="menuItem.url"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" @click="LOGIN_USER" />
        </div>
      </div>

      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useUserStore from "../../stores/user";
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const LOGIN_USER = userStore.LOGIN_USER;
const menuItems = ref([
  { text: "Teams", url: "/teams" },
  { text: "Locations", url: "/" },
  { text: "Life at Bobo Corp", url: "/" },
  { text: "How we hire", url: "/" },
  { text: "Students", url: "/" },
  { text: "Jobs", url: "/jobs/results" },
]);
const headerHeightClass = computed(() => {
  return {
    "h-16": !isLoggedIn.value,
    "h-32": isLoggedIn.value,
  };
});
</script>

<!-- <script>
import { mapActions, mapState } from "pinia";
import useUserStore, { LOGIN_USER } from "../../stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav,
  },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "/teams" },
        { text: "Locations", url: "/" },
        { text: "Life at Bobo Corp", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    headerHeightClass() {
      return {
        // "h-16": !this.isLoggedIn,
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
  },
  methods: {
    ...mapActions(useUserStore, [LOGIN_USER]),
  },
};
</script> -->
