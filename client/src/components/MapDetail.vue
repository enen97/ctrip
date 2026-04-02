<script setup>
import { ref, onMounted, watch } from "vue";
import { loadBMap } from "@/utils/loadBMap";

const props = defineProps({
  hotelName: String,
  address: String,
  score: [String, Number],
  commentCount: [String, Number],
  lng: { type: Number, default: 121.47 }, // 建议传入实际经度 上海
  lat: { type: Number, default: 31.23 }, // 建议传入实际纬度
});

const poiResults = ref({
  subway: [],
  airport: [],
  railway: [],
});
const categoryMap = {
  subway: { title: "地铁站", icon: "icon-subway" },
  airport: { title: "机场", icon: "icon-airplane" },
  railway: { title: "火车站", icon: "icon-train-front" },
};

const mapContainer = ref(null);
let map = null;

const activePoiName = ref(""); // 用于记录当前鼠标悬停的 POI 名称
// 1. 定义自定义图标（复刻图片中的橙色火车站/地铁样式）
// 图标资源映射（建议使用你项目 assets 中的本地图片或远程 URL）
const iconLib = {
  subway: {
    normal: {
      url: "https://ak-d.tripcdn.com/images/1re1612000ck5n58uCBDA.png", // 替换为你的地铁图标
      size: [32, 32],
      anchor: [16, 32],
    },
    active: {
      url: "https://ak-d.tripcdn.com/images/1re6i12000ck5ola13A35.png", // 对应图二：带文字气泡的图标
      size: [48, 48],
      anchor: [10, 48],
    },
  },
  airport: {
    normal: {
      url: "https://ak-d.tripcdn.com/images/1re4t12000ck5o3zg38D7.png", // 替换为你的机场图标
      size: [32, 32],
      anchor: [16, 32],
    },
    active: {
      url: "https://ak-d.tripcdn.com/images/1re1612000ck5o75o247B.png", // 对应图二：带文字气泡的图标
      size: [48, 48],
      anchor: [10, 48],
    },
  },
  railway: {
    normal: {
      url: "https://ak-d.tripcdn.com/images/1re5q12000ck5oi1uE5DC.png", // 替换为你的火车站图标
      size: [32, 32],
      anchor: [16, 32],
    },
    active: {
      url: "https://ak-d.tripcdn.com/images/1re3p12000ck5ojij120D.png", // 对应图二：带文字气泡的图标
      size: [48, 48],
      anchor: [80, 48],
    },
  },
};

// 2. 搜索并标记函数
const searchAndMark = (BMap, mapInstance, centerPoint, keyword, type) => {
  const local = new BMap.LocalSearch(mapInstance, {
    onSearchComplete: (results) => {
      if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
        const list = [];
        const config = iconLib[type]; // 获取当前类别的图标配置
        // 预创建图标对象
        const normalIcon = new BMap.Icon(
          config.normal.url,
          new BMap.Size(...config.normal.size),
        );
        const activeIcon = new BMap.Icon(
          config.active.url,
          new BMap.Size(...config.active.size),
        );

        // 取前 2 个结果进行展示
        for (let i = 0; i < Math.min(results.getCurrentNumPois(), 2); i++) {
          const poi = results.getPoi(i);
          // --- 在地图上添加标记 (Marker) ---
          const marker = new BMap.Marker(poi.point, { icon: normalIcon });
          // 鼠标移入 换图+右侧高亮
          marker.addEventListener("mouseover", () => {
            marker.setIcon(activeIcon);
            marker.setTop = true;
            activePoiName.value = poi.title;
          });

          // 鼠标移除：还原图标+取消高亮
          marker.addEventListener("mouseout", () => {
            marker.setIcon(normalIcon);
            marker.setTop = false;
            activePoiName.value = "";
          });

          mapInstance.addOverlay(marker);

          // --- 计算距离和时间 ---
          const distanceMeters = mapInstance.getDistance(
            centerPoint,
            poi.point,
          );
          const distStr = (distanceMeters / 1000).toFixed(1);
          const timeStr = Math.round(distanceMeters / 500);

          // 给标记添加点击信息窗口
          const infoWindow = new BMap.InfoWindow(
            `<div><strong>${poi.title}</strong><br/>距离酒店${distStr}公里</div>`,
          );
          marker.addEventListener("click", () => {
            mapInstance.openInfoWindow(infoWindow, poi.point);
          });

          // 存入响应式列表用于页面显示
          list.push({
            name: poi.title,
            dist: distStr,
            time: timeStr,
            point: poi.point, // 存下坐标，方便点击列表时地图跳转
            marker: marker,
            normalIcon: normalIcon,
            activeIcon: activeIcon,
          });
        }

        // 将结果分发到对应的分类
        poiResults.value[type] = list;
      }
    },
  });

  // 执行附近搜索
  local.searchNearby(keyword, centerPoint, 5000); // 搜索 5km 范围内
};

const initMap = async () => {
  const BMap = await loadBMap("87TmyeXdUp2OkDPjmxFFEFN6yhwHoZ3Z");
  if (!BMap) return;

  map = new BMap.Map(mapContainer.value);
  const point = new BMap.Point(props.lng, props.lat);

  map.centerAndZoom(point, 15);
  map.addOverlay(new BMap.Marker(point));
  // map.addControl(new BMap.NavigationControl());
  map.enableScrollWheelZoom(true);

  // 执行三次搜索：地铁、机场、火车站
  searchAndMark(BMap, map, point, "地铁站", "subway");
  searchAndMark(BMap, map, point, "机场", "airport");
  searchAndMark(BMap, map, point, "火车站", "railway");
};
const handleMouseEnter = (item) => {
  if (item.marker) {
    item.marker.setIcon(item.activeIcon);
    item.marker.setTop = true;
    map.panTo(item.point);
  }
};
const handleMouseLeave = (item) => {
  if (item.marker) {
    item.marker.setIcon(item.normalIcon);
    item.marker.setTop = false;
  }
};

// 深度监听 poiResults 的变化
watch(
  () => poiResults.value,
  (newVal) => {
    // 当搜索结果填充进去时，这里会触发
    if (newVal.subway.length > 0 || newVal.railway.length > 0) {
      console.log("搜索结果已更新:", newVal);
    }
  },
  { deep: true },
);

onMounted(() => {
  initMap();
});
</script>

<template>
  <div class="map-detail-container">
    <div ref="mapContainer" class="map-canvas"></div>

    <div class="info-panel">
      <div class="panel-header">
        <h2 class="title">{{ hotelName }} <span class="stars">●●</span></h2>
        <div class="address">{{ address }}</div>
        <div class="rating-tag">
          <span class="score">{{ score }} 超棒</span> · {{ commentCount }}条点评
        </div>
        <el-button type="primary" class="book-btn">选择房间</el-button>
      </div>

      <div class="panel-content">
        <div class="tabs">
          <span class="tab active">附近</span>
          <span class="tab">附近的酒店</span>
        </div>

        <div class="filter-tags">
          <el-tag size="small" effect="plain">交通</el-tag>
          <el-tag size="small" effect="plain">景点</el-tag>
          <el-tag size="small" effect="plain">美食</el-tag>
          <el-tag size="small" effect="plain">购物</el-tag>
        </div>

        <div class="transport-section">
          <div v-for="(items, key) in poiResults" :key="key" class="group-item">
            <div class="group-item">
              <div class="group-title">
                <i class="iconfont" :class="categoryMap[key].icon"></i>
                {{ categoryMap[key].title }}
              </div>
              <ul class="detail-list">
                <li v-if="items.length === 0">暂无数据</li>
                <li
                  v-for="item in items"
                  :key="item.name"
                  :class="{ 'is-active': activePoiName == item.name }"
                  @mouseenter="handleMouseEnter(item)"
                  @mouseleave="handleMouseLeave(item)"
                >
                  <div class="name">{{ item.name }}</div>
                  <div class="desc">
                    驾车距离{{ item.dist }}公里，约{{ item.time }}分钟
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.map-detail-container {
  display: flex;
  height: 600px;
  background: #fff;
  .map-canvas {
    flex: 1;
    height: 100%;
  }
  .info-panel {
    width: 350px;
    border-left: 1px solid #eee;
    display: flex;
    flex-direction: column;
    .panel-content {
      .transport-section {
        .group-item {
          margin-bottom: 20px;
          .group-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            i {
              font-size: 18px;
              margin-right: 8px;
              color: #409eff;
            }
          }
          .detail-list {
            list-style: none;
            padding-left: 0;
            li {
              cursor: pointer;
              margin-bottom: 10px;
              .name {
                font-size: 14px;
                font-weight: 500;
              }
              .desc {
                font-size: 12px;
                color: #666;
              }
              &:hover {
                background-color: #ebf4ff;
              }
            }
            .is-active {
              background-color: #ebf4ff;
            }
          }
        }
      }
    }
  }
}
</style>
