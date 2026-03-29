<template>
  <div class="location-module">
    <h2 class="module-title">地点</h2>

    <div class="location-grid">
      <div class="grid-column">
        <section class="sub-section">
          <h3 class="sub-title"><span class="icon">🚆</span> 交通</h3>
          <ul class="item-list">
            <li v-for="item in transport" :key="item.name">
              <span class="name">{{ item.name }}</span>
              <span class="distance">{{ item.dist }}</span>
            </li>
          </ul>
        </section>

        <section class="sub-section">
          <h3 class="sub-title"><span class="icon">🛍️</span> 购物</h3>
          <ul class="item-list">
            <li v-for="item in shopping" :key="item.name">
              <span class="name">{{ item.name }}</span>
              <span class="distance">{{ item.dist }}</span>
            </li>
          </ul>
        </section>
      </div>

      <div class="grid-column">
        <section class="sub-section">
          <h3 class="sub-title"><span class="icon">📍</span> 景点</h3>
          <ul class="item-list">
            <li v-for="item in attractions" :key="item.name">
              <span class="name">{{ item.name }}</span>
              <span class="distance">{{ item.dist }}</span>
            </li>
          </ul>
        </section>
      </div>

      <div class="grid-column">
        <section class="sub-section">
          <h3 class="sub-title"><span class="icon">🍴</span> 美食</h3>
          <ul class="item-list">
            <li v-for="item in food" :key="item.name">
              <span class="name text-ellipsis">{{ item.name }}</span>
              <span class="distance">{{ item.dist }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="footer-link">显示地图 <span>></span></div>
  </div>
</template>

<script setup>
const transport = [
  { name: "地铁：提篮桥地铁站", dist: "380米" },
  { name: "地铁：杨树浦路地铁站", dist: "660米" },
  { name: "火车站：上海站", dist: "5.9千米" },
  { name: "机场：上海虹桥国际机场", dist: "18.5千米" },
];

const shopping = [
  { name: "SMP上海白玉兰广场", dist: "1.3千米" },
  { name: "瑞虹新天地月亮湾", dist: "1.8千米" },
  { name: "金茂时尚生活中心", dist: "266米" },
];

const attractions = [
  { name: "陆家嘴", dist: "1.8千米" },
  { name: "东方明珠", dist: "1.7千米" },
  { name: "外滩", dist: "2.7千米" },
  { name: "上海海洋水族馆", dist: "1.5千米" },
  { name: "黄浦江", dist: "1.9千米" },
  { name: "豫园", dist: "3.3千米" },
  { name: "南京路步行街", dist: "3.5千米" },
];

const food = [
  { name: "蘭庭·炉端烧·酒(金茂时尚生活中心店)", dist: "196米" },
  { name: "遇外滩SKYLINE", dist: "391米" },
  { name: "临江宴·雲(北外滩店)", dist: "381米" },
  { name: "麦当劳(宝地广场店)", dist: "1.1千米" },
  { name: "Manner Coffee(北外滩来福士店)", dist: "326米" },
  { name: "Wagas沃歌斯(宝地广场店)", dist: "1千米" },
];
</script>

<style lang="less" scoped>
.location-module {
  padding: 20px;
  color: #333;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .module-title {
    font-size: 22px;
    margin-bottom: 24px;
    font-weight: bold;
  }

  .location-grid {
    display: flex;
    justify-content: flex-start;
    gap: 60px; // 列与列之间的间距

    .grid-column {
      flex: 1; // 每一列平分宽度
      min-width: 0; // 防止内容撑破 flex

      .sub-section {
        margin-bottom: 30px;

        .sub-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
          display: flex;
          align-items: center;

          .icon {
            margin-right: 8px;
            font-size: 18px;
            font-style: normal;
          }
        }

        .item-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 1.4;

            .name {
              color: #333;
              padding-right: 15px;

              // 针对美食店名过长的情况
              &.text-ellipsis {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            .distance {
              color: #999;
              flex-shrink: 0; // 保证距离数值不被压缩
              text-align: right;
            }
          }
        }
      }
    }
  }

  .footer-link {
    text-align: center;
    color: #0066cc;
    font-size: 15px;
    margin-top: 20px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
