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
import PicturePreview from "./component/PicturePreview.vue";

import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const hotelCardRef = ref(null);

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
const handleUpdateFormData = (data) => {
  bookingParams.value = data;
};
</script>

<template>
  <div>
    <SearchBar></SearchBar>
    <HotelHeader
      style="margin-top: 40px"
      @scrollToRoomEvent="scrollToRoom"
    ></HotelHeader>
    <HotelTab style="margin-top: 40px" @updateRooms="handleUpdateRooms" @updateFormData="handleUpdateFormData"></HotelTab>
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
