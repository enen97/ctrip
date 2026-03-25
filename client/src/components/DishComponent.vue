<template>
  <div class="nav-container" ref="navContainer">
    <el-menu
      :collapse="isCollapse"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      class="el-menu-vertical"
    >
      <div class="menu-header">
        <el-icon @click="toggleCollapse"><Operation /></el-icon>
      </div>

      <el-menu-item
        v-for="item in menuItems"
        :key="item.index"
        :index="item.index"
      >
        <el-icon><component :is="item.icon"></component></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Operation,
  HomeFilled,
  Location,
  Guide,
  Van,
  Ship,
  Bicycle,
  Briefcase,
  Tickets,
  User,
  Search,
  MapLocation,
  Timer,
  ChatLineRound,
  Setting,
} from "@element-plus/icons-vue";

// 定义导航数据
const menuItems = [
  { index: "1", icon: HomeFilled, title: "酒店" },
  { index: "2", icon: Location, title: "机票" },
  { index: "3", icon: Guide, title: "火车票" },
  { index: "4", icon: Van, title: "汽车票" },
  { index: "5", icon: Ship, title: "轮船票" },
  { index: "6", icon: Bicycle, title: "短途租车" },
  { index: "7", icon: Briefcase, title: "旅游套餐" },
  { index: "8", icon: Tickets, title: "我的订单" },
  { index: "9", icon: User, title: "个人中心" },
  { index: "10", icon: Search, title: "目的地查询" },
  { index: "11", icon: MapLocation, title: "地图导航" },
  { index: "12", icon: Timer, title: "行程提醒" },
  { index: "13", icon: ChatLineRound, title: "在线客服" },
  { index: "14", icon: Setting, title: "系统设置" },
];
// 是否永久展开
const isPinned = ref(false);
// 是否鼠标悬停
const isHovered = ref(false);

// 只有在既没有固定也没有悬停时才折叠
const isCollapse = computed(() => !isPinned.value && !isHovered.value);

// 点击按钮切换永久状态
const toggleCollapse = () => {
  isPinned.value = !isPinned.value;
};

// 鼠标悬停逻辑
const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

// 显示与隐藏滚动条
const navContainer = ref(null);
let scrollTimer = null;

const handleScroll = () => {
  const el = navContainer.value;
  if (!el) return;
  // 1、滚动时增加类名
  el.classList.add("show-scrollbar");
  // 2、清除之前的定时器，重新计时
  clearTimeout(scrollTimer);
  // 3、停止滚动1s后，移除类名
  scrollTimer = setTimeout(() => {
    el.classList.remove("show-scrollbar");
  }, 1000);
};

import { onMounted, onUnmounted } from "vue";
// 增加滚动监听事件
onMounted(() => {
  navContainer.value?.addEventListener("scroll", handleScroll);
  // console.log(navContainer.value)
});
// 移除滚动监听事件
onUnmounted(() => {
  // console.log(navContainer.value)
  navContainer.value?.removeEventListener("scroll", handleScroll);
  // console.log('remove', navContainer.value)
});
</script>

<style scoped>
.nav-container {
  height: 100vh; /* 限制容器高度为视口高度 */
  /* 隐藏滚动条 */
  overflow-y: auto;

  /* 初始隐藏滚动条 (兼容性写法) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

/* 定义一个显示滚动条类 */
.nav-container.show-scrollbar {
  scrollbar-width: thin;
}

.nav-container.show-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.nav-container.show-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 160px;
}

.menu-header {
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
}
.menu-header .el-icon {
  font-size: 18px;
  width: 24px;
}

/* 覆盖选中项背景和文字颜色 */
.el-menu-item.is-active {
  position: relative;
  color: #fff;
  z-index: 1;
}

/* 椭圆背景层 */
.el-menu-item.is-active::before {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  top: 5px;
  bottom: 5px;
  border-radius: 25px;
  background: linear-gradient(
    90deg,
    rgb(0, 167, 250) 0%,
    rgb(0, 118, 245) 100%
  );
  z-index: -1;
}
</style>
