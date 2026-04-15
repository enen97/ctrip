<script setup>
import SearchBar from "./component/SearchBar.vue";
import HotelHeader from "./component/HotelHeader.vue";
import HotelTab from "./component/HotelTab.vue";
import HotelCard from "./component/HotelCard.vue";
import HotelComment from "./component/HotelComment.vue";
import HotelLocation from "./component/HotelLocation.vue";
import ServiceFacility from "./component/ServiceFacility.vue";
import HotelPolicy from "./component/HotelPolicy.vue";
import HotelIntroduction from "./component/HotelIntroduction.vue";
import HotelMustRead from "./component/HotelMustRead.vue";
import AttachedHotel from "./component/AttachedHotel.vue";
import MoreHotel from "./component/MoreHotel.vue";
import PriceDescription from "./component/PriceDescription.vue";
import HotelRecommend from "./component/HotelRecommend.vue";
// import PicturePreview from "./component/PicturePreview.vue";

import { ref, watch } from "vue";
import { useRoute,useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const hotelCardRef = ref(null);


// 用于传递给 HotelTab 的初始值（从 URL 获取）
// 1. 定义响应式的初始配置
const initialConfig = ref({});
// 2. 封装一个解析 URL 参数的方法
const syncParamsFromUrl = () => {
  initialConfig.value = {
    checkIn: route.query.checkIn,
    checkOut: route.query.checkOut,
    adults: route.query.adult,
    children: route.query.children,
    rooms: route.query.rooms, // 对应你 URL 中的 rooms 参数
    city: route.query.city,
  };
};

// . 监听路由变化，一旦 URL 变了就重新解析配置
watch(() => route.query, (newQuery) => {
    // 可以在这里触发全局的刷新逻辑
    syncParamsFromUrl();
},{ immediate: true, deep: true });

const handleUpdateFormData = (data) => {
  bookingParams.value = data;
  router.push({
    query: {
    ...route.query,
    checkIn: data.checkIn ,
    checkOut: data.checkOut,
    adult: data.adults,
    children: data.children,
    rooms: data.rooms,
    }
  });
};


const scrollToRoom = () => {
  if (hotelCardRef.value) {
    hotelCardRef.value.$el.scrollIntoView({ behavior: "smooth" });
  }
};

const roomList = ref([]);
const bookingParams = ref({});
const handleUpdateRooms = (rooms) => {
  roomList.value = rooms;
};
</script>

<template>
  <div>
    <SearchBar :initial-config="initialConfig"></SearchBar>
    <HotelHeader
      style="margin-top: 40px"
      @scrollToRoomEvent="scrollToRoom"
    ></HotelHeader>
    <HotelTab style="margin-top: 40px" :initial-config="initialConfig" @updateRooms="handleUpdateRooms" @updateFormData="handleUpdateFormData"></HotelTab>
    <HotelCard ref="hotelCardRef" style="margin-top: 40px" :rooms="roomList" :bookingParams="bookingParams" :hotelId="route.query.hotelId"></HotelCard>
    <HotelComment style="margin-top: 40px"></HotelComment>
    <HotelLocation style="margin-top: 40px"></HotelLocation>
    <ServiceFacility style="margin-top: 40px"></ServiceFacility>
    <HotelPolicy style="margin-top: 40px"></HotelPolicy>
    <HotelIntroduction style="margin-top: 40px"></HotelIntroduction>
    <HotelMustRead style="margin-top: 40px"></HotelMustRead>
    <AttachedHotel style="margin-top: 40px"></AttachedHotel>
    <MoreHotel style="margin-top: 40px"></MoreHotel>
    <PriceDescription style="margin-top: 40px"></PriceDescription>
    <HotelRecommend style="margin-top: 40px"></HotelRecommend>
    <!-- <PicturePreview></PicturePreview> -->
  </div>
</template>
