<template>
  <div class="hotel-page-container">
    <aside class="filter-aside">
      <div class="map-box">
        <div class="map-btn">在地图上展示</div>
      </div>

      <section class="filter-section">
        <h4 class="section-title">价格(¥{{ priceMin }} - ¥{{ priceMax }}{{ priceMax >= 750 ? '+' : '' }})</h4>
        <div class="range-slider" ref="sliderRef" @mousedown="handleSliderClick">
          <div class="slider-track" :style="{ left: leftPercent + '%', right: (100 - rightPercent) + '%' }"></div>
          <div class="slider-handle left" :style="{ left: `calc(${leftPercent}% - 8px)` }"
            @mousedown.stop="startDrag('left')"></div>
          <div class="slider-handle right" :style="{ left: `calc(${rightPercent}% - 8px)` }"
            @mousedown.stop="startDrag('right')"></div>
        </div>
      </section>


      <section class="filter-section" v-for="group in filterGroups" :key="group.title">
        <h4 class="section-title">{{ group.title }}</h4>
        <div class="check-list">
          <label v-for="item in group.options" :key="item" class="check-item"
            :class="{ active: selectedIds.includes(`${group.title}-${item}`) }">
            <input type="radio" :name="group.title" :checked="selectedIds.includes(`${group.title}-${item}`)"
              @click="toggleFilter(group.title, item)" />
            <span>{{ item }}</span>
          </label>
        </div>
      </section>

    </aside>

    <main class="hotel-main">
      <div class="list-header">
        <span class="total-count">找到 {{ total }} 家酒店</span>
        <!-- <div class="sort-dropdown">智能排序 <i class="icon-arrow"></i></div> -->
      </div>

      <!-- Selected Filters Bar -->
      <div class="selected-bar" v-if="selectedFilters.length > 0">
        <div class="bar-left">
          <span class="tip">已选：</span>
          <div class="tag-list">
            <div v-for="opt in selectedFilters" :key="opt.id" class="filter-tag"
              :class="{ 'is-unchecked': !selectedIds.includes(opt.id) }">
              <label class="tag-label">
                <input type="checkbox" :value="opt.id" v-model="selectedIds" />
                <span>{{ opt.label }}</span>
              </label>
              <i class="close-icon" @click="removeTag(opt.id)">×</i>
            </div>
          </div>
        </div>
        <div class="clear-all" @click="clearAll">
          <i class="icon-delete"></i> 清除全部
        </div>
      </div>

      <div class="hotel-list">
        <div v-if="loading" class="loading-placeholder">
          <div v-for="i in 3" :key="i" class="skeleton-card"></div>
        </div>

        <template v-else>
          <div v-for="hotel in hotelList" :key="hotel._id || hotel.id" class="hotel-card">
            <div class="hotel-img">
              <img :src="hotel.mainImg || 'https://picsum.photos/400/300?random=' + hotel.id" alt="hotel">
            </div>
            <div class="hotel-info">
              <div class="info-top">
                <div class="title-row">
                  <h3>{{ hotel.name }} <span class="stars">{{ '⭐'.repeat(hotel.star || 0) }}</span></h3>
                  <span class="ad-tag" v-if="hotel.isAd">广告</span>
                </div>
                <div class="rating-row">
                  <span class="score">{{ hotel.score }}</span>
                  <span class="score-text">{{ hotel.score >= 4.5 ? '超棒' : '很好' }}</span>
                  <span class="comment-count">{{ hotel.commentCount || 0 }}条点评 · "{{ hotel.recommendText }}"</span>
                </div>
                <div class="location-row">
                  <i class="icon-loc"></i> {{ hotel.address }} ·

                  <a href="javascript:;" class="map-link" @click="openMapDialog">
                    查看地图
                  </a>
                  <el-dialog v-model="mapVisible" width="80%" top="5vh" destroy-on-close>
                    <MapDetail v-if="mapVisible" :hotel-name="hotel.name" :address="hotel.address"
                      :score="hotel.score" :comment-count="hotel.reviews" :lng="hotel.longitude"
                      :lat="hotel.latitude" />
                  </el-dialog>
                </div>
                <!-- <div class="room-type-bar">
                  <span class="room-name">{{ hotel.featuredRoom }}</span>
                  <span class="cancel-policy">免费取消</span>
                </div> -->
                <div class="good-review" v-if="hotel.reviewTag">{{ hotel.reviewTag }}</div>
              </div>

              <div class="info-bottom">
                <div class="price-action">
                  <div class="price-box">
                    <span class="old-price" v-if="hotel.oldPrice">¥{{ hotel.oldPrice }}</span>
                    <span class="unit">均</span>
                    <span class="currency">¥</span>
                    <span class="amount">{{ hotel.minPrice }}</span>
                    <span class="suffix">起</span>
                  </div>
                  <button class="detail-btn" @click="gotoDetail(hotel)">查看详情</button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="hotelList.length === 0" class="empty-state">
            <img src="https://img.icons8.com/ios/100/000000/nothing-found.png" alt="No data">
            <p>没有找到符合条件的酒店，请尝试更改筛选条件</p>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { searchHotels } from '@/api/hotel';
import MapDetail from '../../components/MapDetail.vue';

const router = useRouter();
const route = useRoute();

// 查看地图
const mapVisible = ref(false);
const openMapDialog = () => {
  mapVisible.value = true;
};

// 价格筛选
const priceMin = ref(Number(route.query.priceMin) || 0);
const priceMax = ref(Number(route.query.priceMax) || 750);
const maxRange = 750;
const step = 50;

const leftPercent = ref((priceMin.value / maxRange) * 100);
const rightPercent = ref((priceMax.value / maxRange) * 100);
const sliderRef = ref(null);

const updatePrice = (percent, type) => {
  let value = Math.round(((percent / 100) * maxRange) / step) * step;
  value = Math.max(0, Math.min(maxRange, value));
  const newPercent = (value / maxRange) * 100;

  if (type === 'left') {
    if (newPercent <= rightPercent.value - (step / maxRange * 100)) {
      leftPercent.value = newPercent;
      priceMin.value = value;
    }
  } else {
    if (newPercent >= leftPercent.value + (step / maxRange * 100)) {
      rightPercent.value = newPercent;
      priceMax.value = value;
    }
  }
};

const handleSliderClick = (e) => {
  if (!sliderRef.value) return;
  const rect = sliderRef.value.getBoundingClientRect();
  const percent = ((e.clientX - rect.left) / rect.width) * 100;

  // Find nearest handle
  const type = Math.abs(percent - leftPercent.value) < Math.abs(percent - rightPercent.value) ? 'left' : 'right';
  updatePrice(percent, type);
};

const startDrag = (type) => {
  const onMouseMove = (e) => {
    if (!sliderRef.value) return;
    const rect = sliderRef.value.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    updatePrice(percent, type);
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

// 已选筛选条件
const selectedFilters = ref([]);
// 真实选择的id（不包括selectedFilters选择但是未勾选的）
const selectedIds = ref(route.query.filters ? String(route.query.filters).split(',') : []);

const filterGroups = [
  // { title: '星级', options: ['1星','2星', '3星', '4星', '5星'] },
  { title: '点评数', options: ['500条以上', '200条以上', '100条以上'] },
  { title: '分数', options: ['4.5分及以上', '4.0分及以上', '3.5分及以上'] },
  { title: '设施服务', options: ['公共停车场', '大堂吧', '健身房', '餐厅', '叫车服务', '行李寄存', '儿童餐', '储物柜'] },
]

// 根据 selectedIds 初始化 selectedFilters
const initFiltersFromQuery = () => {
  if (selectedIds.value.length > 0) {
    const filters = [];
    selectedIds.value.forEach(id => {
      const [groupTitle, label] = id.split('-');
      if (groupTitle && label) {
        filters.push({ id, label, group: groupTitle });
      }
    });
    selectedFilters.value = filters;
  }
};

const gotoDetail = (hotel) => {
  router.push({
    path: '/hotels',
    query: {
      hotelId: hotel.id,
      checkIn: route.query.checkIn,
      checkOut: route.query.checkOut,
      rooms: route.query.rooms,
      adult: route.query.adults,
      children: route.query.children,
    }
  })
}

onMounted(() => {
  initFiltersFromQuery();
});

const toggleFilter = (group, item) => {
  const existingIndex = selectedFilters.value.findIndex(f => f.group === group);

  const newValue = { id: `${group}-${item}`, label: item, group };

  if (existingIndex > -1) {
    if (selectedFilters.value[existingIndex].label === item) {
      // 取消选中的
      selectedFilters.value.splice(existingIndex, 1);
      selectedIds.value = selectedIds.value.filter(id => id !== newValue.id);
    } else {
      // 替换
      const oldId = selectedFilters.value[existingIndex].id;
      selectedFilters.value[existingIndex] = newValue;
      selectedIds.value = selectedIds.value.filter(id => id !== oldId);
      selectedIds.value.push(newValue.id);
    }
  } else {
    selectedFilters.value.push(newValue);
    selectedIds.value.push(newValue.id);
  }
};

const clearAll = () => {
  selectedFilters.value = [];
  selectedIds.value = [];
};

const removeTag = (id) => {
  selectedFilters.value = selectedFilters.value.filter((f) => f.id !== id);
  selectedIds.value = selectedIds.value.filter((i) => i !== id);
}

// 酒店数据
const hotelList = ref([]);
const total = ref(0);
const loading = ref(false);

const fetchHotelsData = async () => {
  loading.value = true;
  try {
    const params = {
      ...route.query,
      priceMin: priceMin.value,
      priceMax: priceMax.value,
      filters: selectedIds.value,
    };
    console.log(params);
    const res = await searchHotels(params);
    if (res && res.data) {
      hotelList.value = res.data.list || [];
      total.value = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取酒店列表失败:', error);
  } finally {
    loading.value = false;
  }
};

// 将状态推送到 URL
let timer = null;
const pushParamsToUrl = () => {
  // 当上一次的定时器还没执行的时候，又来了一个新的定时器，那么就取消上一次的定时器，重新开始计时  防抖动
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    const query = { ...route.query };

    if (priceMin.value > 0) query.priceMin = priceMin.value;
    else delete query.priceMin;

    if (priceMax.value < 750) query.priceMax = priceMax.value;
    else delete query.priceMax;

    // 将 selectedIds 数组转成字符串
    if (selectedIds.value.length > 0) query.filters = selectedIds.value.join(',');
    else delete query.filters;

    // 只有当查询参数确实发生变化时才 push，避免冗余
    const currentQueryStr = JSON.stringify(route.query);
    const nextQueryStr = JSON.stringify(query);

    if (currentQueryStr !== nextQueryStr) {
      router.push({ query });
    }
  }, 300); // 300ms 抖动，适合价格滑动
};

// 监听筛选条件变化，更新 URL
watch([selectedIds, priceMin, priceMax], () => {
  pushParamsToUrl();
}, { deep: true });

// 监听 URL 变化，重新请求数据
watch(() => route.query, () => {
  fetchHotelsData();
}, { immediate: true });

</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #0086ff;
@orange-color: #ff6600;
@border-color: #eee;
@text-gray: #666;

.hotel-page-container {
  display: flex;
  height: 100vh;
  overflow: hidden; // 禁止外层滚动

  // 公共滚动条
  .custom-scroll() {
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
  }

  // 左侧
  .filter-aside {
    width: 260px;
    height: 100%;
    background: #fff;
    border-right: 1px solid @border-color;
    padding: 15px;
    overflow-y: auto;
    flex-shrink: 0;
    .custom-scroll();

    .map-box {
      height: 90px;
      background: #4a90e2 url('https://dimg04.c-ctrip.com/images/1re0c12000j5k9eacD259.png') center no-repeat;
      background-size: auto 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .map-btn {
        background: @primary-color;
        color: #fff;
        padding: 5px 15px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .filter-section {
      margin-bottom: 25px;

      .section-title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .range-slider {
        position: relative;
        height: 4px;
        background: #e8e8e8;
        margin: 15px 10px;

        .slider-track {
          position: absolute;
          left: 0;
          right: 0;
          height: 100%;
          background: @primary-color;
        }

        .slider-handle {
          position: absolute;
          width: 16px;
          height: 16px;
          background: #fff;
          border: 2px solid @primary-color;
          border-radius: 50%;
          top: -6px;

          &.left {
            left: -8px;
          }

          &.right {
            right: -8px;
          }
        }
      }

      .price-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;

        .price-item {
          border: 1px solid @border-color;
          padding: 6px;
          text-align: center;
          font-size: 12px;
          border-radius: 2px;
          cursor: pointer;

          &:hover {
            border-color: @primary-color;
            color: @primary-color;
          }
        }
      }

      .check-list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .check-item {
          display: flex;
          align-items: center;
          font-size: 13px;
          cursor: pointer;
          color: #333;
          transition: color 0.2s;

          &:hover {
            color: @primary-color;
          }

          &.active {
            color: @primary-color;
            font-weight: bold;
          }

          input {
            margin-right: 8px;
          }
        }

        .more-link {
          color: @primary-color;
          font-size: 12px;
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
  }

  // 右侧
  .hotel-main {
    flex: 1;
    height: 100%;
    padding: 15px 20px;
    overflow-y: auto;
    .custom-scroll();

    .selected-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 10px 15px;
      border-radius: 8px;
      margin-bottom: 15px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

      .bar-left {
        display: flex;
        align-items: center;
        gap: 12px;

        .tip {
          font-size: 13px;
          color: #999;
          white-space: nowrap;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .filter-tag {
            display: flex;
            align-items: center;
            background: #f0f7ff;
            border: 1px solid #cce4ff;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            color: @primary-color;
            transition: all 0.2s;

            &.is-unchecked {
              background: #f5f5f5;
              border-color: #ddd;
              color: #999;

              .tag-label span {
                text-decoration: line-through;
              }
            }

            .tag-label {
              display: flex;
              align-items: center;
              cursor: pointer;
              margin-right: 6px;

              input {
                margin-right: 4px;
                cursor: pointer;
              }
            }

            .close-icon {
              font-style: normal;
              cursor: pointer;
              font-size: 16px;
              line-height: 1;
              color: #999;

              &:hover {
                color: #ff4d4f;
              }
            }
          }
        }
      }

      .clear-all {
        font-size: 13px;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;

        &:hover {
          color: @primary-color;
        }
      }
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      .total-count {
        font-size: 18px;
        font-weight: bold;
      }

      .sort-dropdown {
        background: #fff;
        padding: 5px 12px;
        border: 1px solid @border-color;
        border-radius: 4px;
        font-size: 13px;
      }
    }

    .coupon-banner {
      background: #fff;
      border: 1px solid #ffe8d5;
      border-radius: 4px;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      .left-part {
        .label {
          color: @orange-color;
          font-weight: bold;
          margin-right: 15px;
        }

        .tag {
          background: @orange-color;
          color: #fff;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
        }
      }

      .action {
        color: @orange-color;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .hotel-list {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .loading-placeholder {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .skeleton-card {
          height: 210px;
          background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
          background-size: 400% 100%;
          animation: skeleton-loading 1.4s ease infinite;
          border-radius: 8px;
        }
      }

      @keyframes skeleton-loading {
        0% {
          background-position: 100% 50%;
        }

        100% {
          background-position: 0% 50%;
        }
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
        color: #999;

        img {
          width: 80px;
          opacity: 0.5;
          margin-bottom: 20px;
        }

        p {
          font-size: 14px;
        }
      }

      .hotel-card {
        display: flex;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        height: 210px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

        .hotel-img {
          width: 280px;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .img-dots {
            position: absolute;
            bottom: 10px;
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 5px;

            span {
              width: 6px;
              height: 6px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 50%;

              &.active {
                background: #fff;
              }
            }
          }
        }

        .hotel-info {
          flex: 1;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title-row {
            display: flex;
            justify-content: space-between;

            h3 {
              font-size: 17px;
              margin: 0;

              .stars {
                color: #ffb400;
                font-size: 12px;
                margin-left: 5px;
              }
            }

            .ad-tag {
              font-size: 11px;
              color: #ccc;
            }
          }

          .rating-row {
            margin-top: 6px;
            display: flex;
            align-items: center;
            gap: 8px;

            .score {
              background: @primary-color;
              color: #fff;
              padding: 0 4px;
              border-radius: 4px 4px 4px 0;
              font-weight: bold;
              font-size: 13px;
            }

            .score-text {
              color: @primary-color;
              font-weight: bold;
              font-size: 14px;
            }

            .comment-count {
              color: @text-gray;
              font-size: 12px;
            }
          }

          .location-row {
            font-size: 12px;
            color: @text-gray;
            margin-top: 8px;

            .map-link {
              color: @primary-color;
              cursor: pointer;
            }
          }

          .room-type-bar {
            background: #f8fafd;
            padding: 8px;
            border-radius: 4px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .room-name {
              font-size: 13px;
              color: #333;
            }

            .cancel-policy {
              color: #28b445;
              font-size: 12px;
            }
          }

          .good-review {
            color: #f63b2d;
            font-size: 12px;
            margin-top: 5px;
          }

          .info-bottom {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            gap: 20px;

            .price-tags {
              display: flex;
              gap: 4px;
              margin-bottom: 5px;

              span {
                font-size: 10px;
                padding: 0 4px;
                border-radius: 2px;

                &.subsidy {
                  color: #f63b2d;
                  border: 1px solid #f63b2d;
                }

                &.discount {
                  color: @orange-color;
                  border: 1px solid @orange-color;
                }
              }
            }

            .price-action {
              display: flex;
              align-items: flex-end;
              gap: 15px;

              .price-box {
                text-align: right;
                color: @primary-color;

                .old-price {
                  color: #999;
                  text-decoration: line-through;
                  font-size: 12px;
                  display: block;
                }

                .unit,
                .currency,
                .suffix {
                  font-size: 12px;
                  font-weight: bold;
                }

                .amount {
                  font-size: 26px;
                  font-weight: bold;
                  line-height: 1;
                }
              }

              .detail-btn {
                background: @primary-color;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                font-weight: bold;
                cursor: pointer;

                &:hover {
                  background: darken(@primary-color, 5%);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>