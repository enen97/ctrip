<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="section city">
        <div class="icon">
          <el-icon><Location /></el-icon>
        </div>
        <input
          type="text"
          v-model="formData.city"
          placeholder="目的地"
          class="city-input"
        />
        <div class="close" v-if="formData.city" @click="clearCity">
          <el-icon><CircleCloseFilled /></el-icon>
        </div>
      </div>

      <div class="section date">
        <DatePickerSection
          :checkIn="formData.checkIn"
          :checkOut="formData.checkOut"
          :checkInText="formData.checkInText"
          :checkOutText="formData.checkOutText"
          :nights="formData.nights"
          @update="handleDateSelect"
        />
      </div>

      <div class="section guests">
        <GuestPickerSection v-model="formData" />
      </div>

      <div class="section keyword">
        <input type="text" v-model="formData.keyword" placeholder="位置/品牌/酒店 (选填)" />
      </div>

      <button class="btn-search" @click="handleSearch">
        <el-icon><RefreshRight /></el-icon>搜索
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import DatePickerSection from "../../../components/DatePickerSection.vue";
import GuestPickerSection from "../../../components/GuestPickerSection.vue";

import {
  Location,
  CircleCloseFilled,
  RefreshRight,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const props = defineProps(['initialConfig']);
const router = useRouter();

const formData = reactive({
  city: "上海",
  checkIn: null,
  checkOut: null,
  checkInText: "", // 默认初始值
  checkOutText: "",
  nights: 0,
  rooms: 1,
  adults: 2,
  children: 0,
  keyword: ''
});

// 搜索
const handleSearch = () => {
  console.log(formData)
  console.log(formatDateTime(formData.checkIn))
  console.log(formatDateTime(formData.checkOut))
  router.push({
    path: '/hotels/list',
    query: {
      city: formData.city,
      checkIn: formatDateTime(formData.checkIn),
      checkOut: formatDateTime(formData.checkOut),
      adults: formData.adults,
      children: formData.children,
      rooms: formData.rooms,
      keyword: formData.keyword,
    }
  });
}

// 格式化日期
// 格式化日期：支持 Date 对象和 字符串
const formatDateTime = (dateInput) => {
  // 1. 防御空值
  if (!dateInput) return "";

  // 2. 核心：强制转换为 Date 对象
  // 哪怕 dateInput 已经是 Date 对象了，new Date(dateInput) 也不会报错
  const date = new Date(dateInput);

  // 3. 检查转换是否成功（防止 dateInput 是乱码字符串）
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
// 简单的日期格式化工具
const formatDate = (date) => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
    date.getDay()
  ];
  return `${m}月${d}日(${week})`;
};

watch(() => props.initialConfig, (newVal) => {
  console.log(newVal)
  formData.city = newVal.city;
  formData.checkIn = newVal.checkIn;
  formData.checkOut = newVal.checkOut;
  formData.rooms = newVal.rooms;
  formData.adults = newVal.adults;
  formData.children = newVal.children;

  formData.checkInText = formatDate(new Date(newVal.checkIn));
  formData.checkOutText = formatDate(new Date(newVal.checkOut));
  formData.nights = (new Date(newVal.checkOut) - new Date(newVal.checkIn)) / 1000 / 60 / 60 / 24;
},{ immediate: true, deep: true })



const clearCity = () => {
  formData.city = "";
};

const handleDateSelect = (data) => {
  formData.checkIn = data.start;
  formData.checkOut = data.end;
  formData.nights = data.nights;

  formData.checkInText = formatDate(data.start);
  formData.checkOutText = formatDate(data.end);
};
</script>

<style lang="less" scoped>
@blue: #3264ff;
@text-main: #333;
@text-light: #999;
@border: #e5e5e5;
@focus-bg: #ebf4ff;

.search-bar {
  display: flex;
  align-items: center;
  border: 3px solid @blue;
  border-radius: 8px;
  height: 60px;
  position: relative;
  background: #fff;

  > .section {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-right: 1px solid @border;
    cursor: pointer;
    position: relative;

    &.active {
      background-color: #ebf4ff; // 选中时的浅蓝背景
    }

    .icon {
      display: flex;
      align-items: center;
      margin-right: 8px;
      height: 100%;
    }
    .val {
      font-weight: 600;
      color: @text-main;
      font-size: 15px;
    }
  }

  // 1. 城市输入样式
  .city {
    width: 150px;
    .city-input {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-weight: 600;
      font-size: 15px;
      background: transparent;
      &:focus {
        background-color: @focus-bg;
      }
    }
    .close {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  // 2. 日期样式
  .date {
    // display: flex;
    // align-items: center;
    .line {
      margin: 0 8px;
    }
    .tag-night {
      margin-top: 3px;
      margin-left: 10px;
      background: #ebeff5;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 14px;
    }
  }

  // 通用下拉弹窗基础样式
  .dropdown-panel {
    position: absolute;
    top: 52px;
    left: 0;
    background: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    z-index: 100;
    cursor: default;
  }

  // 图一：日历弹窗特有样式
  .calendar-panel {
    width: 700px;
    padding: 20px;
    .calendar-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .calendar-footer {
      border-top: 1px solid @border;
      padding-top: 15px;
      text-align: right;
      font-size: 14px;
    }
  }

  // 图二：人数弹窗特有样式
  .guest-panel {
    width: 250px;
    padding: 20px;
    left: 0;

    .counter-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .label {
        display: flex;
        flex-direction: column;
        .main {
          font-size: 16px;
          color: @text-main;
        }
        .sub {
          font-size: 12px;
          color: @text-light;
        }
      }

      .counter-ctrl {
        display: flex;
        align-items: center;
        gap: 5px;

        button {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid @blue;
          background: #fff;
          color: @blue;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          &:disabled {
            border-color: @border;
            color: @border;
          }
        }
        .num {
          font-size: 16px;
          min-width: 20px;
          text-align: center;
        }
      }
    }

    .confirm-btn {
      margin-left: auto;
      display: block;
      width: 30%;
      background: @blue;
      color: #fff;
      border: none;
      padding: 5px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .keyword {
    flex: 1;
    border: none;
    input {
      border: none;
      outline: none;
      width: 100%;
    }
  }

  .btn-search {
    background: @blue;
    color: #fff;
    border: none;
    height: 52px;
    padding: 0 30px;
    margin: 0 4px;
    border-radius: 6px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
