<template>
  <main class="flex flex-col h-screen bg-yellow-100 pt-10 pb-20">
    <div class="grid grid-cols-12">
      <div class="col-start-1 col-span-1 border border-blue-700">1 column</div>
      <div class="col-start-2 col-span-5 border border-blue-700">
        <the-headline />
      </div>
      <div class="col-start-7 col-span-5 border border-blue-700">5 column</div>
      <div class="col-start-12 col-span-1 border border-blue-700">1 column</div>
    </div>
  </main>
</template>

<script>
import theHeadline from "./TheHeadline.vue";
export default {
  name: "TheHero",
  components: {
    theHeadline,
  },
};
</script>
