<template>
  <div class="h-full">
    <img
      ref="myElement"
      class="h-14 object-contain rounded"
      :src="imgSrc"
      alt="user profile image"
    />
  </div>
</template>
<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imgSrc:
        "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_3832.jpg",
    };
  },
};
</script>
