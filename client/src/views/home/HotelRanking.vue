<template>
  <div class="ranking-wrapper">
    <div class="ranking-column">
      <div class="header pink-gradient">
        <div class="header-left">
          <img
            src="../../assets/home/main/group.912b559b491ae7f4c9feddabdabec74f.png"
            class="header-icon"
          />
          <span class="title">当季热卖·跟团游</span>
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            class="pas_arrow_ZIWax"
          >
            <path
              d="M8 1C4.131 1 1 4.131 1 8s3.131 7 7 7 7-3.131 7-7-3.131-7-7-7zm2.394 7.362-.019.019-3.256 3.107a.668.668 0 0 1-.938-.019.67.67 0 0 1 .019-.944l2.643-2.531-2.605-2.481a.664.664 0 0 1-.019-.944.662.662 0 0 1 .937-.019l3.238 3.088c.2.2.2.525 0 .725z"
              fill="#34475e"
              class="arrow_svg__transform-group"
            ></path>
          </svg>
        </div>
        <div class="header-right">
          <i class="iconfont icon-arrow-right-circle"></i>
        </div>
      </div>

      <div class="list-container">
        <div v-for="(item, index) in tourData" :key="index" class="list-item">
          <div class="img-wrapper">
            <img :src="item.img" class="main-img" />
            <span :class="['rank-tag', `rank-${index + 1}`]">{{
              index + 1
            }}</span>
          </div>
          <div class="content">
            <h4 class="item-title">{{ item.name }}</h4>
            <div class="meta-info">
              <span class="score">{{ item.score }}分</span>
              <span class="divider">|</span>
              <span class="count">{{ item.count }}人出游</span>
            </div>
            <div class="price-area">
              <span class="symbol">¥</span>
              <span class="price-num">{{ item.price }}</span>
              <span class="unit">起</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ranking-column">
      <div class="header blue-gradient">
        <div class="header-left">
          <img
            src="../../assets/home/main/flight.3f9b3de3d7f758268b54ffe8b14b9660.png"
            class="header-icon"
          />
          <span class="title">周末畅游·特价机票</span>
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            class="pas_arrow_ZIWax"
          >
            <path
              d="M8 1C4.131 1 1 4.131 1 8s3.131 7 7 7 7-3.131 7-7-3.131-7-7-7zm2.394 7.362-.019.019-3.256 3.107a.668.668 0 0 1-.938-.019.67.67 0 0 1 .019-.944l2.643-2.531-2.605-2.481a.664.664 0 0 1-.019-.944.662.662 0 0 1 .937-.019l3.238 3.088c.2.2.2.525 0 .725z"
              fill="#34475e"
              class="arrow_svg__transform-group"
            ></path>
          </svg>
        </div>
        <div class="header-right">
          <i class="iconfont icon-arrow-right-circle"></i>
        </div>
      </div>

      <div class="list-container">
        <div v-for="(item, index) in flightData" :key="index" class="list-item">
          <div class="img-wrapper">
            <img :src="item.img" class="main-img" />
            <span :class="['rank-tag', `rank-${index + 1}`]">{{
              index + 1
            }}</span>
          </div>
          <div class="content">
            <h4 class="item-title">{{ item.from }} ⇌ {{ item.to }}</h4>
            <div class="tags">
              <span class="tag-blue">携程精选</span>
            </div>
            <div class="date-info">{{ item.date }}</div>
            <div class="price-area-right">
              <div class="price-main">
                <span class="symbol">¥</span>
                <span class="price-num">{{ item.price }}</span>
              </div>
              <div class="discount">{{ item.discount }}折</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 模拟图片中的数据
const tourData = ref([
  {
    name: "浙江普陀山2日1晚跟团游",
    score: "4.6",
    count: "33201",
    price: "458",
    img: "	https://dimg04.c-ctrip.com/images/100p0b00000057x0o1540_C_160_160.jpg",
  },
  {
    name: "九华山风景区3日2晚跟团游",
    score: "4.7",
    count: "71",
    price: "1159",
    img: "https://dimg04.c-ctrip.com/images/0302d12000exq24a38F9F_C_160_160.png",
  },
  {
    name: "呈坎+徽州古城+阳产土楼+棠樾牌坊群鲍家花园...",
    score: "4.9",
    count: "33",
    price: "2146",
    img: "https://dimg04.c-ctrip.com/images/0302d12000exq24a38F9F_C_160_160.png",
  },
  {
    name: "九华山大愿文化园-九华大佛+百岁宫+化城寺+...",
    score: "4.9",
    count: "28",
    price: "1992",
    img: "https://dimg04.c-ctrip.com/images/0302d12000exq24a38F9F_C_160_160.png",
  },
  {
    name: "浙江普陀山2日1晚跟团游",
    score: "4.7",
    count: "1682",
    price: "754",
    img: "https://dimg04.c-ctrip.com/images/0302d12000exq24a38F9F_C_160_160.png",
  },
]);

const flightData = ref([
  {
    from: "上海",
    to: "长春",
    date: "03-28 去 03-30 回",
    price: "564",
    discount: "1.4",
    img: "https://pic.c-ctrip.com/flight/fuzzy/CGQ/640.jpg",
  },
  {
    from: "上海",
    to: "大连",
    date: "03-27 去 03-28 回",
    price: "569",
    discount: "1.8",
    img: "https://pic.c-ctrip.com/flight/fuzzy/DLC/640.jpg",
  },
  {
    from: "上海",
    to: "合肥",
    date: "03-27 去 03-28 回",
    price: "578",
    discount: "2.7",
    img: "https://pic.c-ctrip.com/flight/fuzzy/DLC/640.jpg",
  },
  {
    from: "上海",
    to: "南昌",
    date: "03-21 去 03-24 回",
    price: "582",
    discount: "2.3",
    img: "https://pic.c-ctrip.com/flight/fuzzy/DLC/640.jpg",
  },
  {
    from: "上海",
    to: "南京",
    date: "03-21 去 03-24 回",
    price: "584",
    discount: "2.8",
    img: "https://pic.c-ctrip.com/flight/fuzzy/DLC/640.jpg",
  },
]);
</script>

<style lang="less" scoped>
.ranking-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  & > :first-child {
    background: linear-gradient(
      -153.43deg,
      rgb(244, 250, 253) 0%,
      rgb(226, 242, 251) 100%
    );
  }
  & > :last-child {
    background: linear-gradient(
      26.57deg,
      rgb(230, 236, 252) 0%,
      rgb(244, 246, 253) 100%
    );
  }

  .ranking-column {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e8f0f8;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 10px;
      height: 60px;
      overflow: hidden;

      .header-left {
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        .header-icon {
          position: absolute;
          top: -15px;
          width: 95px;
          overflow-clip-margin: content-box;
          overflow: clip;
        }
        .title {
          padding-left: 95px;
          font-size: 15px;
          font-weight: bold;
          color: #333;
        }
      }
      .header-right {
        color: #446fa9;
        cursor: pointer;
      }
    }

    .list-container {
      padding: 0 10px;
      margin: 4px;
      border-radius: 10px;
      padding: 10px;
      background-color: white;

      .list-item {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        }

        .img-wrapper {
          position: relative;
          width: 85px;
          height: 85px;
          flex-shrink: 0;
          margin-right: 10px;

          .main-img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
          }

          .rank-tag {
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 20px;
            border-top-left-radius: 8px;
            border-bottom-right-radius: 8px;
            font-weight: bold;

            &.rank-1 {
              background-color: #ff4d4f;
            }
            &.rank-2 {
              background-color: #ff943e;
            }
            &.rank-3 {
              background-color: #ffc400;
            }
            &.rank-4,
            &.rank-5 {
              background-color: #adc6e8;
            }
          }
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          min-width: 0; // 解决省略号失效问题

          .item-title {
            width: 150px;
            font-size: 14px;
            color: #333;
            margin: 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .meta-info {
            margin-top: 6px;
            font-size: 12px;
            color: #999;
            .score {
              color: #0086f6;
              font-weight: bold;
            }
            .divider {
              margin: 0 4px;
              color: #ddd;
            }
          }

          .tags {
            margin-top: 4px;
            .tag-blue {
              font-size: 10px;
              color: #00b395;
              border: 1px solid #00b395;
              padding: 0 4px;
              border-radius: 2px;
            }
          }

          .date-info {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
          }

          // 跟团游价格样式
          .price-area {
            position: absolute;
            right: 0;
            top: 0;
            color: #0086f6;
            .symbol {
              font-size: 12px;
            }
            .price-num {
              font-size: 18px;
              font-weight: bold;
            }
            .unit {
              color: #666;
              font-size: 11px;
              margin-left: 2px;
            }
          }

          // 机票价格区域（包含折扣）
          .price-area-right {
            position: absolute;
            right: 0;
            top: 0;
            text-align: right;
            .price-main {
              color: #0086f6;
              .symbol {
                font-size: 12px;
              }
              .price-num {
                font-size: 18px;
                font-weight: bold;
              }
            }
            .discount {
              font-size: 12px;
              color: #666;
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
