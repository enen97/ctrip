<template>
  <div class="section date" :class="{ active: active }" @click="toggle">
    <i class="icon">
      <el-icon><Calendar /></el-icon>
    </i>

    <div class="date-info">
      <span class="val">{{ checkInText }}</span>
      <span class="line">-</span>
      <span class="val">{{ checkOutText }}</span>
    </div>

    <div class="tag-night">{{ nights }}晚</div>

    <div class="dropdown-panel" v-if="active" @click.stop>
      <CalendarPicker
        :initial-range="{ start: checkIn, end: checkOut }"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CalendarPicker from "@/components/CalendarPicker.vue";
import { Calendar } from "@element-plus/icons-vue";

const props = defineProps({
  checkIn: Date,
  checkOut: Date,
  checkInText: String,
  checkOutText: String,
  nights: Number,
});

const emit = defineEmits(["update"]);

const active = ref(false);

const toggle = () => {
  active.value = !active.value;
};

const handleSelect = (data) => {
  emit("update", data);
  active.value = false;
};
</script>

<style scoped lang="less">
.section.date {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #f5f7fa;
  }

  &.active {
    background: #ebf4ff;
  }

  .icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }

  .date-info {
    display: flex;
    align-items: center;

    .val {
      font-size: 15px;
      font-weight: 600;
      color: #333;
    }

    .line {
      margin: 0 6px;
      color: #999;
    }
  }

  .tag-night {
    margin-left: 10px;
    font-size: 13px;
    background: #eef1f6;
    padding: 2px 8px;
    border-radius: 10px;
    color: #666;
  }
}

/* 下拉面板 */
.dropdown-panel {
  position: absolute;
  top: 60px;
  left: 0;
  border-radius: 10px;
  z-index: 100;
}
</style>
