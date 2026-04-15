<template>
  <div class="hotel-booking-bar">
    <nav class="nav-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tab-item', { active: tab.name === '房间' }]"
      >
        {{ tab.name }}
        <div v-if="tab.name === '房间'" class="active-line"></div>
      </div>
    </nav>

    <div class="search-panel">
      <div class="date-picker-wrapper">
        <DatePickerSection
          :checkIn="formData.checkIn"
          :checkOut="formData.checkOut"
          :checkInText="formData.checkInText"
          :checkOutText="formData.checkOutText"
          :nights="formData.nights"
          @update="handleDateUpdate"
        />
        <div class="guest-picker">
          <GuestPickerSection
            :modelValue="formData"
            @update:modelValue="Object.assign(formData, $event)"
          />
        </div>
      </div>
    </div>

    <div class="filter-tags">
      <div
        v-for="tag in filterTags"
        :key="tag.label"
        :class="['tag-item', { disabled: tag.count === 0 }]"
      >
        <span v-if="tag.icon" class="tag-icon">{{ tag.icon }}</span>
        {{ tag.label }}({{ tag.count }})
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getHotelRooms } from "../../../api/hotel.js";
import DatePickerSection from "/src/components/DatePickerSection.vue";
import GuestPickerSection from "/src/components/GuestPickerSection.vue";
// ✅ 数据中心（父组件统一管理）
const formData = reactive({
  checkIn: new Date(2026, 3, 16), // 4月16日 (月份从0开始)
  checkOut: new Date(2026, 3, 17), // 4月17日
  checkInText: "4月16日",
  checkOutText: "4月17日",
  nights: 1,

  rooms: 1,
  adults: 2,
  children: 0,
});
// ✅ 接收日期组件数据
const handleDateUpdate = (data) => {
  formData.checkIn = data.start;
  formData.checkOut = data.end;
  formData.nights = data.nights;

  formData.checkInText = formatDate(data.start);
  formData.checkOutText = formatDate(data.end);
};


// 日期格式化
const formatDate = (date) => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
    date.getDay()
  ];
  return `${m}月${d}日(${week})`;
};

const emit = defineEmits(["updateRooms", "updateFormData"]);
const route = useRoute();

const fetchRooms = async () => {
  console.log('数据变化', formData);
  if (!formData.checkIn || !formData.checkOut) return;
  
  const formatDateForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  try {
    const res = await getHotelRooms(route.query.hotelId, {
      checkIn: formatDateForApi(formData.checkIn),
      checkOut: formatDateForApi(formData.checkOut),
      rooms: formData.rooms,
      adults: formData.adults,
      children: formData.children
    });
    emit("updateRooms", res.data || []);
    emit("updateFormData", {
      checkIn: formatDateForApi(formData.checkIn),
      checkOut: formatDateForApi(formData.checkOut),
      checkInText: formData.checkInText,
      checkOutText: formData.checkOutText,
      nights: formData.nights,
      rooms: formData.rooms,
      adults: formData.adults,
      children: formData.children
    });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }
};

watch(formData, (newVal) => {
  console.log('数据变化了', newVal);
  fetchRooms();
}, { deep: true });
onMounted(() => {
  // Wait for initial checkIn/checkOut from DatePickerSection if they are set asynchronously, Or fetch immediately if they exist.
  if (formData.checkIn) fetchRooms();
});

const tabs = [
  { name: "概览" },
  { name: "房间" },
  { name: "点评" },
  { name: "服务及设施" },
  { name: "政策" },
  { name: "地点" },
];

const filterTags = [
  { label: "酒店套餐", count: 4 },
  { label: "含早餐", count: 8, icon: "🍴" },
  { label: "大床房", count: 16 },
  { label: "双床房", count: 0 },
  { label: "免费取消", count: 16, icon: "🛡️" },
  { label: "立即确认", count: 16 },
  { label: "可订", count: 16 },
  { label: "在线付款", count: 16 },
  { label: "免费Wi-Fi上网", count: 16 },
];
</script>

<style lang="less" scoped>
.hotel-booking-bar {
  padding: 0 20px;
  color: #333;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  // 1. 顶部导航
  .nav-tabs {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;

    .tab-item {
      padding: 15px 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      position: relative;
      color: #666;

      &.active {
        color: #0066cc;
        .active-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background-color: #0066cc;
          border-radius: 2px;
        }
      }
    }
  }

  // 2. 搜索面板
  .search-panel {
    background-color: #f0f3f8;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 20px;

    .date-picker-wrapper {
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 2px;
      height: 48px;
      width: fit-content;

      .date-box {
        padding: 0 20px;
        font-weight: bold;
        font-size: 15px;
        min-width: 140px;
      }

      .duration {
        color: #999;
        font-size: 13px;
        padding: 0 10px;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .guest-picker {
        padding: 0 15px;
        min-width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: 1px solid #ddd;
        font-size: 15px;
        font-weight: bold;

        .arrow-down {
          border: solid #666;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(45deg);
          margin-top: -4px;
        }
      }
    }
  }

  // 3. 筛选 Tag
  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;

    .tag-item {
      background-color: #f5f7fa;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      cursor: pointer;

      .tag-icon {
        margin-right: 4px;
        font-size: 12px;
      }

      &:hover {
        background-color: #e9ecef;
      }

      &.disabled {
        color: #ccc;
        cursor: not-allowed;
        background-color: #f9f9f9;
      }
    }
  }
}
</style>
