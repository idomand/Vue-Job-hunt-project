<template>
  <main class="flex h-screen flex-col">
    <section class="pb-20 pt-10">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>

        <div class="col-span-5 col-start-2">
          <the-headline />
          <the-job-search-form />
        </div>

        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img
            class="h-80 w-80 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
          />
        </div>

        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>
    <SpotLights class="flex flex-ro justify-center pb-16">
      <template #spotlightName="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="mx-5 flex flex-col h-96 w-72 rounded-lg border bg-brand-gray-2"
        >
          <img :src="img" alt="" class="object-contain" />
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">
              {{ title }}
            </h3>
            <p class="mt-3 text-sm">
              {{ description }}
            </p>
            <router-link
              class="px-6 pb-4 text-sm text-brand-blue-1"
              to="/jobs/results"
              >see jobs</router-link
            >
          </div>
        </router-link>
      </template>
    </SpotLights>
  </main>
</template>

<script setup lang="ts">
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import TheJobSearchForm from "./TheJobSearchForm.vue";
import SpotLights from "./SpotLights.vue";
</script>
