<template>
  <div class="section guests" :class="{ active }" @click="toggle">
    <i class="icon">
      <el-icon><User /></el-icon>
    </i>

    <span class="val">
      {{ form.rooms }}间, {{ form.adults }}成人, {{ form.children }}儿童
    </span>

    <div class="dropdown-panel guest-panel" v-if="active" @click.stop>
      <div class="counter-row" v-for="item in config" :key="item.key">
        <div class="label">
          <span class="main">{{ item.label }}</span>
          <span class="sub" v-if="item.sub">{{ item.sub }}</span>
        </div>

        <div class="counter-ctrl">
          <button
            :disabled="form[item.key] <= item.min"
            @click="form[item.key]--"
          >
            −
          </button>

          <span class="num">{{ form[item.key] }}</span>

          <button @click="form[item.key]++">+</button>
        </div>
      </div>

      <button class="confirm-btn" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { User } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const active = ref(false);

const form = reactive({ ...props.modelValue });

// 监听父组件的值，更form值
watch(
  () => props.modelValue,
  (val) => Object.assign(form, val),
);

const config = [
  { label: "房间", key: "rooms", min: 1 },
  { label: "成人", sub: "18岁及以上", key: "adults", min: 1 },
  { label: "儿童", sub: "0-17岁", key: "children", min: 0 },
];

const toggle = () => {
  active.value = !active.value;
};

const confirm = () => {
  emit("update:modelValue", { ...form });
  active.value = false;
};
</script>

<style scoped lang="less">
.section.guests {
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

  .val {
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }
}

/* 下拉面板 */
.guest-panel {
  position: absolute;
  top: 60px;
  left: 0;
  width: 260px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 20px;
  z-index: 100;
}

/* 每一行 */
.counter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .label {
    display: flex;
    flex-direction: column;

    .main {
      font-size: 15px;
      color: #333;
    }

    .sub {
      font-size: 12px;
      color: #999;
    }
  }

  .counter-ctrl {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #3264ff;
      background: #fff;
      color: #3264ff;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        background: #f0f5ff;
      }

      &:disabled {
        border-color: #ddd;
        color: #ccc;
        cursor: not-allowed;
      }
    }

    .num {
      min-width: 20px;
      text-align: center;
      font-size: 16px;
    }
  }
}

/* 确认按钮 */
.confirm-btn {
  width: 100%;
  height: 36px;
  background: #3264ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #254edb;
  }
}
</style>
