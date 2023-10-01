<template>
  <header class="w-full">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="border-brand-grey-1 mx-auto flex h-full flex-nowrap border-b border-solid px-8">
        <a class="flex h-full items-center text-xl" href="/">{{ company }} </a>
        <h2 class="ml-8 flex h-full items-center">
          Develop by {{ author.firstName }} {{ author.lastName }}
        </h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return { company: 'Bobo careers', author: { firstName: 'ido', lastName: 'Mandelman' } }
  }
}
</script>

<style lang=""></style>
