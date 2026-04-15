<script setup>
import { Location } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

const nearby = ref([
  {
    type: "地铁",
    name: "杨树浦路地铁站",
    dist: "660米",
    iconClass: "icon-subway",
  },
  {
    type: "地铁",
    name: "提篮桥地铁站",
    dist: "380米",
    iconClass: "icon-subway",
  },
  {
    type: "机场",
    name: "上海虹桥国际机场",
    dist: "18.5千米",
    iconClass: "icon-airplane",
  },
  {
    type: "机场",
    name: "上海浦东国际机场",
    dist: "38.8千米",
    iconClass: "icon-airplane",
  },
  {
    type: "火车站",
    name: "上海站",
    dist: "5.9千米",
    iconClass: "icon-train-front",
  },
]);

// 点击复制酒店地址
const copyAddress = () => {
  navigator.clipboard.writeText(hotelData.value.address).then(
    () => {
      ElMessage.success("地址已复制到剪贴板");
    },
    (err) => {
      ElMessage.error("复制失败，请手动复制", err);
    },
  );
};

// 点击选择房间按钮，滚动到房间列表
const emit = defineEmits(["scrollToRoomEvent"]);

// 点击查看所有照片
const previewRef = ref(null);
const showAllImages = () => {
  const el = previewRef.value?.$el.querySelector("img");
  if (el) {
    el.click();
  } else {
    console.error("未能找到预览组件的触发元素");
  }
};

// 地图组件相关逻辑
import MapDetail from "../../../components/MapDetail.vue"; // 引入新组件
import { getHotelDetail } from "../../../api/hotel.js";

const mapVisible = ref(false);
const openMapDialog = () => {
  mapVisible.value = true;
};

const hotelData = ref(null);
onMounted(() => {
  const route = useRoute();
  getHotelDetail(route.query.hotelId).then((response) => {
    hotelData.value = response.data;
  });
});
</script>

<template>
  <div v-if="hotelData" class="hotel-detail">
    <div class="header-info">
      <div class="title-section">
        <h1>
          {{ hotelData.name }}
          <span class="stars">{{ "⭐".repeat(hotelData.rating) }}</span>
        </h1>
        <p class="address">
          <el-icon><Location></Location></el-icon>
          <el-tooltip content="点击复制地址" placement="top">
            <span @click="copyAddress" style="cursor: pointer">{{
              hotelData.address
            }}</span>
          </el-tooltip>
          <a>显示地图</a>
        </p>
      </div>
      <button class="select-room-btn" @click="emit('scrollToRoomEvent')">
        选择房间
      </button>
    </div>

    <div class="gallery-grid">
      <div class="main-img">
        <el-image
          :src="hotelData.images[0]"
          :preview-src-list="hotelData.images"
          :initial-index="0"
          fit="cover"
          preview-teleported
        />
      </div>
      <div class="side-imgs">
        <div
          v-for="(img, index) in hotelData.images.slice(1, 7)"
          :key="index"
          class="sub-img"
        >
          <el-image
            :src="img"
            :preview-src-list="hotelData.images"
            :initial-index="index + 1"
            fit="cover"
            preview-teleported
          />
          <div v-if="index === 5" class="more-mask" @click="showAllImages">
            查看所有照片
          </div>
        </div>
      </div>
      <el-image
        ref="previewRef"
        style="display: none"
        :src="hotelData.images[0]"
        :preview-src-list="hotelData.images"
        preview-teleported
      />
    </div>

    <div class="hotel-container">
      <main class="hotel-main">
        <section class="facility-section">
          <h2 class="section-title">酒店设施</h2>
          <div class="facility-grid">
            <div
              v-for="item in hotelData.facilities"
              :key="item.text"
              class="facility-item"
            >
              <i class="iconfont" :class="item.iconClass"></i>
              <span class="label">{{ item.text }}</span>
              <span v-if="item.isFree" class="tag-free">免费</span>
            </div>
          </div>
          <a href="javascript:;" class="link-more">所有设施</a>
        </section>

        <section class="intro-section">
          <h2 class="section-title">酒店简介</h2>
          <p class="intro-text">
            酒店位于上海北外滩中心东大名路，紧邻黄浦江畔，步行约5分钟即可到达北外滩“滨江步道”；距离公平路轮渡口约40...
          </p>
          <a href="javascript:;" class="link-more">查看更多</a>
        </section>
      </main>

      <aside class="hotel-sidebar">
        <div class="rating-box">
          <div class="rating-header">
            <span class="badge">{{ hotelData.score }}</span>
            <span class="status">{{ hotelData.scoreText }}</span>
          </div>
          <p class="comment-preview">
            {{ hotelData.description }}
          </p>
          <a href="javascript:;" class="link-blue"
            >显示所有{{ hotelData.reviewCount }}条点评</a
          >
        </div>

        <div class="nearby-box">
          <h3 class="nearby-title">附近</h3>
          <ul class="transport-list">
            <li v-for="(loc, index) in nearby" :key="index">
              <i class="iconfont" :class="loc.iconClass"></i>
              <span class="info">{{ loc.type }}：{{ loc.name }}</span>
              <span class="distance">({{ loc.dist }})</span>
            </li>
          </ul>
          <a href="javascript:;" class="link-blue" @click="openMapDialog">
            在地图上查看
          </a>
          <el-dialog
            v-model="mapVisible"
            width="80%"
            top="5vh"
            destroy-on-close
          >
            <MapDetail
              v-if="mapVisible"
              :hotel-name="hotelData.name"
              :address="hotelData.address"
              score="4.8"
              comment-count="1016"
              :lng="106.611"
              :lat="29.537"
            />
          </el-dialog>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="less">
// 定义变量方便统一维护
@primary-blue: #0086f6;
@text-main: #333;
@text-light: #666;
@border-radius: 4px;
@gap: 4px;

.iconfont {
  font-size: 20px;
  color: #333;
  margin-right: 8px;
}

.hotel-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .header-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title-section {
      h1 {
        font-size: 24px;
        color: @text-main;
        margin-bottom: 8px;

        .stars {
          font-size: 16px;
          margin-left: 10px;
        }
      }

      .address {
        font-size: 14px;
        color: @text-light;
        display: flex;
        align-items: center;
        gap: 4px;

        .el-icon {
          color: @primary-blue;
        }

        a {
          color: @primary-blue;
          margin-left: 10px;
          cursor: pointer;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .select-room-btn {
      background-color: #006ff6;
      color: #fff;
      border: none;
      padding: 0px 24px;
      height: 56px;
      border-radius: @border-radius;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background-color: darken(@primary-blue, 5%);
      }
    }
  }

  // 照片墙网格系统
  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr; // 左侧主图占2份，右侧占1份
    gap: @gap;
    height: 300px;
    margin-top: 20px;
    .main-img {
      overflow: hidden;
      height: 300px;
    }

    .main-img,
    .side-imgs > div {
      display: grid;
      place-items: center; /* 水平垂直同时居中 */
    }

    .side-imgs {
      display: grid;
      height: 300px;
      grid-template-columns: 1fr 1fr 1fr; // 右侧再平分为两列
      grid-template-rows: 1fr 1fr; // 平分为两行
      gap: @gap;

      .sub-img {
        position: relative;
        overflow: hidden; // 确保圆点不溢出
        height: 100%; // 适配网格高度

        .more-mask {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }
  }

  .hotel-container {
    margin-top: 40px;
    display: flex;

    .hotel-main {
      flex: 1;
      padding-right: 40px;

      .intro-section {
        margin-top: 20px;
      }

      .section-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333333;
      }

      .facility-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px 0;
        margin-bottom: 5px;

        .facility-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333333;

          .icon {
            margin-right: 8px;
            font-size: 16px;
          }

          .tag-free {
            background-color: #e6f7ff;
            color: #006ff6;
            font-size: 12px;
            padding: 1px 4px;
            margin-left: 6px;
            border-radius: 2px;
          }
        }
      }

      .intro-text {
        font-size: 14px;
        line-height: 1.8;
        color: #333333;
      }

      .link-more {
        color: #006ff6;
        text-decoration: none;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .hotel-sidebar {
      width: 300px;
      border-left: 1px solid #eeeeee;
      padding-left: 24px;

      .link-blue {
        color: #006ff6;
        font-size: 14px;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }

      .rating-box {
        margin-bottom: 30px;

        .rating-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .badge {
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 20px;
            text-align: center;

            background-color: #006ff6;
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 4px 4px 12px;
            font-weight: bold;
            font-size: 18px;
          }

          .status {
            margin-left: 12px;
            color: #006ff6;
            font-size: 20px;
            font-weight: bold;
          }
        }

        .comment-preview {
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 10px;
        }
      }

      .nearby-box {
        .nearby-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333333;
        }

        .transport-list {
          list-style: none;
          padding: 0;
          margin-bottom: 15px;

          li {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;

            .type-icon {
              margin-right: 12px;
              width: 18px;
              text-align: center;
            }

            .info {
              color: #333333;
            }

            .distance {
              color: #999999;
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
