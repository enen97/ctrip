<template>
  <div class="calendar-wrapper" @click.stop>
    <div class="calendar-header">
      <span
        class="arrow left"
        :class="{ disabled: isFirstMonth }"
        @click="prevMonth"
        >〈</span
      >
      <div class="month-titles">
        <span>{{ leftYear }}年{{ leftMonth }}月</span>
        <span>{{ rightYear }}年{{ rightMonth }}月</span>
      </div>
      <span class="arrow right" @click="nextMonth">〉</span>
    </div>

    <div class="months-container">
      <div
        v-for="mInfo in monthList"
        :key="mInfo.year + '-' + mInfo.month"
        class="month-box"
      >
        <div class="week-header">
          <span
            v-for="day in [
              '周日',
              '周一',
              '周二',
              '周三',
              '周四',
              '周五',
              '周六',
            ]"
            :key="day"
            :class="{ weekend: day === '周日' || day === '周六' }"
          >
            {{ day }}
          </span>
        </div>
        <div class="days-grid">
          <div
            v-for="empty in getFirstDayOfMonth(mInfo.year, mInfo.month)"
            :key="'empty-' + empty"
          ></div>

          <div
            v-for="date in getDaysInMonth(mInfo.year, mInfo.month)"
            :key="date"
            class="day-cell"
            :class="getDayStatus(mInfo.year, mInfo.month, date)"
            @click="handleDateClick(mInfo.year, mInfo.month, date)"
            @mouseover="handleDateHover(mInfo.year, mInfo.month, date)"
          >
            <i
              class="festival-dot"
              v-if="getDayInfo(mInfo.year, mInfo.month, date).name"
            ></i>
            <span class="date-num">{{ date }}</span>
            <span v-if="isStart(mInfo.year, mInfo.month, date)" class="tip"
              >入住</span
            >
            <span v-if="isEnd(mInfo.year, mInfo.month, date)" class="tip"
              >离店</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="calendar-footer">
      <p class="desc">
        ● {{ hoverText || "将鼠标悬浮在日期上查看节假日信息" }}
      </p>
      <div class="result" v-if="range.start">
        {{ formatDateText(range.start) }}
        <template v-if="range.end">
          – {{ formatDateText(range.end) }}
          <span class="night-count">({{ nightCount }} 晚)</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import { Lunar, Solar } from "lunar-javascript";

const emit = defineEmits(["select"]);

const props = defineProps({
  initialRange: {
    type: Object,
    default: () => ({ start: null, end: null }),
  },
});

// 初始化时直接使用父组件传进来的日期
const range = ref({
  start: props.initialRange.start ? new Date(props.initialRange.start) : null,
  end: props.initialRange.end ? new Date(props.initialRange.end) : null,
});

// 1. 初始化日期：viewDate 始终代表左侧显示的月份
const now = new Date();
const viewDate = ref(new Date(now.getFullYear(), now.getMonth(), 1));

// 2. 计算左侧和右侧的年/月
const leftYear = computed(() => viewDate.value.getFullYear());
const leftMonth = computed(() => viewDate.value.getMonth() + 1);

const rightDate = computed(() => new Date(leftYear.value, leftMonth.value, 1));
const rightYear = computed(() => rightDate.value.getFullYear());
const rightMonth = computed(() => rightDate.value.getMonth() + 1);

const monthList = computed(() => [
  { year: leftYear.value, month: leftMonth.value },
  { year: rightYear.value, month: rightMonth.value },
]);

// 3. 翻页逻辑
const isFirstMonth = computed(() => {
  return (
    viewDate.value.getFullYear() === now.getFullYear() &&
    viewDate.value.getMonth() === now.getMonth()
  );
});

const prevMonth = () => {
  if (isFirstMonth.value) return;
  viewDate.value = new Date(leftYear.value, leftMonth.value - 2, 1);
};

const nextMonth = () => {
  viewDate.value = new Date(leftYear.value, leftMonth.value, 1);
};

// --- 以下为原有的日期逻辑，已适配动态年月 ---

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
const getFirstDayOfMonth = (year, month) =>
  new Date(year, month - 1, 1).getDay();

const handleDateClick = (y, m, d) => {
  const selected = new Date(y, m - 1, d);
  if (!range.value.start || (range.value.start && range.value.end)) {
    range.value.start = selected;
    range.value.end = null;
  } else {
    if (selected <= range.value.start) {
      range.value.start = selected;
    } else {
      range.value.end = selected;
      emit("select", {
        start: range.value.start,
        end: range.value.end,
        nights: nightCount.value,
      });
    }
  }
};

const getDayStatus = (y, m, d) => {
  const current = new Date(y, m - 1, d);
  const curTime = current.getTime();
  const startTime = range.value.start?.getTime();
  const endTime = range.value.end?.getTime();

  if (startTime && curTime === startTime) return "is-start";
  if (endTime && curTime === endTime) return "is-end";
  if (startTime && endTime && curTime > startTime && curTime < endTime)
    return "is-range";
  return "";
};

const isStart = (y, m, d) =>
  range.value.start?.getTime() === new Date(y, m - 1, d).getTime();
const isEnd = (y, m, d) =>
  range.value.end?.getTime() === new Date(y, m - 1, d).getTime();

const nightCount = computed(() => {
  if (!range.value.start || !range.value.end) return 0;
  return Math.round(
    (range.value.end - range.value.start) / (1000 * 60 * 60 * 24),
  );
});

const formatDateText = (date) => {
  if (!date) return "";
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return `${m}月${d}日(${weeks[date.getDay()]})`;
};

const getDayInfo = (y, m, d) => {
  const solar = Solar.fromYmd(y, m, d);
  const lunar = solar.getLunar();

  // 1. 获取公历节日 (如：元旦)
  const solarFestivals = solar.getFestivals();
  // 2. 获取农历节日 (如：春节、端午)
  const lunarFestivals = lunar.getFestivals();
  // 3. 获取节气 (如：清明、冬至)
  const jieQi = lunar.getJieQi();

  // 优先级：公历节日 > 农历节日 > 节气
  const name = solarFestivals[0] || lunarFestivals[0] || jieQi || null;

  return { name, fullInfo: `${m}月${d}日 ${name || ""}` };
};
const hoverText = ref(null);
const handleDateHover = (y, m, d) => {
  const info = getDayInfo(y, m, d);
  console.log(info);
  hoverText.value = null;
  if (info.name) {
    hoverText.value = info.fullInfo; // 当鼠标悬浮时更新左下角文字
  }
};
</script>

<style lang="less" scoped>
@blue: #0086f6;
@range-bg: #e8f4ff;

.calendar-wrapper {
  width: 750px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  user-select: none;

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 10px;

    .month-titles {
      flex: 1;
      display: flex;
      justify-content: space-around;
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .arrow {
      color: @blue; // 激活状态颜色
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      padding: 0 10px;

      &.disabled {
        color: #ccc; // 变暗
        cursor: not-allowed;
      }
    }
  }

  .months-container {
    display: flex;
    gap: 40px;
  }

  .month-box {
    flex: 1;
    .week-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      margin-bottom: 10px;
      span {
        font-size: 14px;
        color: #333;
        font-weight: bold;
      }
      .weekend {
        color: @blue;
      }
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      .day-cell {
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        font-weight: 500;
        border-radius: 4px;

        &:hover {
          background-color: #f5f5f5;
        }

        &.is-start,
        &.is-end {
          background-color: @blue !important;
          color: #fff;
          border-radius: 4px;
          .tip {
            font-size: 10px;
            margin-top: 2px;
          }
        }

        &.is-range {
          background-color: @range-bg;
          color: @blue;
          border-radius: 0; // 区间内保持平滑矩形
        }

        .festival-dot {
          width: 4px;
          height: 4px;
          background-color: #999; // 默认灰色点
          border-radius: 50%;
          position: absolute;
          top: 8px; // 位于格子顶部
        }
      }
    }
  }

  .calendar-footer {
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc {
      color: #999;
      font-size: 12px;
    }
    .result {
      font-size: 16px;
      color: #333;
      .night-count {
        font-weight: bold;
        margin-left: 5px;
      }
    }
  }
}
</style>
