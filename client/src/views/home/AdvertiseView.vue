<template>
  <div class="ad-container">
    <img :src="imgUrl" class="display-img" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const imgUrl = computed(() => route.query.img);
</script>

<style scoped>
.display-img {
  width: 100%;
  height: 250px;
}
</style>
