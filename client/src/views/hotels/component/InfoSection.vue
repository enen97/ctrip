<script setup>
import { hotelData } from "./mockData.js";
</script>

<template>
  <div class="info-row">
    <div class="facilities">
      <h3>酒店设施</h3>
      <div class="facility-list">
        <div
          v-for="item in hotelData.facilities"
          :key="item.name"
          class="f-item"
        >
          <i class="icon"></i> {{ item.name }}
          <span v-if="item.free" class="free-tag">免费</span>
        </div>
      </div>
    </div>

    <div class="score-card">
      <div class="score-num">
        {{ hotelData.score }} <span>{{ hotelData.scoreText }}</span>
      </div>
      <p>这次入住体验超出预期，房间干净无异味...</p>
      <a class="more-reviews">查看所有{{ hotelData.reviewCount }}条点评 ></a>
    </div>
  </div>
</template>

<style scoped>
.info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.score-card {
  background: #f5faff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.score-num {
  color: #0086f6;
  font-size: 24px;
  font-weight: bold;
}
.free-tag {
  color: #28a745;
  font-size: 12px;
  margin-left: 4px;
}
</style>
