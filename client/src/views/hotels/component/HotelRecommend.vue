<template>
  <div class="hotel-footer">
    <div class="seo-description">
      携程网为您推荐<strong>桔子水晶上海北外滩酒店</strong>以及酒店预订、价格查询，桔子水晶上海北外滩酒店信息，酒店地址：上海虹口区东大名路1191号；涵盖酒店周边设施，酒店交通地图，真实用户点评等信息，同时还可查找上海旅游报价以及上海旅游攻略。上海酒店预订，上海酒店导航，酒店团购，特价酒店，选携程更放心！<a
        href="javascript:;"
        >查看更多</a
      >
    </div>

    <div class="divider"></div>

    <div class="footer-row">
      <div class="footer-label">热门城市</div>
      <div class="footer-grid">
        <div v-for="city in cities" :key="city" class="grid-item">
          {{ city }}酒店
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="footer-row">
      <div class="footer-label">品牌推荐</div>
      <div class="footer-grid">
        <div v-for="brand in brands" :key="brand" class="grid-item">
          {{ brand }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cities = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "南京",
  "杭州",
  "成都",
  "厦门",
  "青岛",
  "三亚",
  "香港",
  "澳门",
  "西安",
  "苏州",
  "长沙",
  "武汉",
  "大连",
  "天津",
  "重庆",
  "长春",
  "济南",
  "贵阳",
  "昆明",
  "郑州",
  "银川",
  "南昌",
  "沈阳",
  "石家庄",
  "福州",
  "合肥",
  "南宁",
  "乌鲁木齐",
  "太原",
  "哈尔滨",
  "兰州",
  "台北",
  "拉萨",
  "西宁",
  "呼和浩特",
];

const brands = [
  "7天连锁酒店",
  "如家快捷酒店",
  "汉庭酒店",
  "锦江之星",
  "香格里拉酒店",
  "格林豪泰",
  "莫泰168",
  "布丁酒店",
  "桔子酒店",
  "希尔顿",
  "凯宾斯基",
  "皇冠假日酒店",
  "威斯汀酒店",
  "假日酒店",
  "喜来登酒店",
  "维也纳酒店",
  "星程酒店",
  "宜必思酒店",
  "洲际酒店",
  "万豪酒店",
  "速8酒店",
  "凯悦酒店",
  "百时快捷酒店",
  "半岛酒店",
  "诺富特酒店",
];
</script>

<style lang="less" scoped>
.hotel-footer {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px 20px;
  background-color: #f5f7fa; // 浅灰色底
  color: #666666;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  // SEO 文本样式
  .seo-description {
    font-size: 13px;
    line-height: 2;
    color: #999999;
    text-align: justify;

    strong {
      color: #666666;
      font-weight: normal;
    }

    a {
      color: #0066cc;
      text-decoration: none;
      margin-left: 5px;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  // 虚线分割
  .divider {
    height: 1px;
    border-top: 1px dashed #cccccc;
    margin: 20px 0;
  }

  // 行布局
  .footer-row {
    display: flex;
    align-items: flex-start;

    .footer-label {
      width: 80px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      padding-top: 2px;
      flex-shrink: 0;
    }

    // 八列网格布局
    .footer-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(8, 1fr); // 核心：强制 8 列平铺
      gap: 12px 0;

      .grid-item {
        font-size: 13px;
        color: #666666;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
          color: #0066cc;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
