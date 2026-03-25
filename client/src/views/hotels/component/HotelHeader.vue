<script setup>
import { hotelData } from "./mockData.js";
</script>

<template>
  <div class="hotel-detail">
    <div class="header-info">
      <div class="title-section">
        <h1>{{ hotelData.name }} <span class="stars">⭐⭐⭐⭐</span></h1>
        <p class="address">{{ hotelData.address }} <a>显示地图</a></p>
      </div>
      <button class="select-room-btn">选择房间</button>
    </div>

    <div class="gallery-grid">
      <div class="main-img">
        <img :src="hotelData.images[0]" alt="Main" />
      </div>
      <div class="side-imgs">
        <div
          v-for="(img, index) in hotelData.images.slice(1, 5)"
          :key="index"
          class="sub-img"
        >
          <img :src="img" />
          <div v-if="index === 3" class="more-mask">查看所有照片</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  height: 400px;
  margin-top: 20px;
}
.main-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.side-imgs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.sub-img {
  position: relative;
  height: 196px;
}
.sub-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.more-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
