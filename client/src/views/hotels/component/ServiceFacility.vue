<template>
  <div class="facility-detail">
    <h1>服务及设施</h1>
    <section class="basic-facilities">
      <h2 class="title"><i class="icon-main">☕</i> 设施服务</h2>
      <div class="grid-box">
        <div v-for="item in basicList" :key="item.name" class="item">
          <span class="icon">{{ item.icon }}</span>
          <span class="name">{{ item.name }}</span>
          <span v-if="item.free" class="tag-free">免费</span>
        </div>
      </div>
    </section>

    <section class="photo-section">
      <div
        v-for="photo in facilityPhotos"
        :key="photo.title"
        class="photo-card"
      >
        <img :src="photo.url" :alt="photo.title" />
        <div class="photo-label">{{ photo.title }}</div>
      </div>
    </section>

    <section class="more-facilities">
      <h2 class="title"><i class="icon-main">⊕</i> 更多设施</h2>
      <div class="category-grid">
        <div v-for="cat in categories" :key="cat.title" class="category-column">
          <h3 class="cat-title">
            <i class="cat-icon">{{ cat.icon }}</i> {{ cat.title }}
          </h3>
          <ul class="cat-list">
            <li v-for="sub in cat.items" :key="sub.name">
              <span class="check">✓</span>
              {{ sub.name }}
              <span v-if="sub.free" class="tag-free-small">免费</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const basicList = [
  { name: "公共停车场", icon: "🅿️", free: true },
  { name: "大堂吧", icon: "✔️" },
  { name: "健身室", icon: "🏋️" },
  { name: "餐厅", icon: "🍴" },
  { name: "叫车服务", icon: "✔️" },
  { name: "行李寄存", icon: "🧳" },
  { name: "儿童餐", icon: "👶" },
];

const facilityPhotos = [
  {
    title: "大堂吧",
    url: "https://dimg04.c-ctrip.com/images/20021d000001eqqrgE9F3_R_600_360_R5.webp",
  },
  {
    title: "健身室",
    url: "https://dimg04.c-ctrip.com/images/1mc4112000bl89x6792A5_R_600_360_R5.webp",
  },
];

const categories = [
  {
    title: "前台服务",
    icon: "🛎️",
    items: [
      { name: "储物柜" },
      { name: "礼宾服务" },
      { name: "前台服务语言" },
      { name: "快速入住退房" },
      { name: "专职行李员" },
      { name: "储物柜" },
      { name: "叫醒服务" },
      { name: "叫醒服务" },
    ],
  },
  {
    title: "清洁服务",
    icon: "🧹",
    items: [
      { name: "外送洗衣服务" },
      { name: "干衣机" },
      { name: "熨斗/挂烫机" },
      { name: "洗衣服务", free: true },
    ],
  },
  {
    title: "公共区",
    icon: "🏠",
    items: [
      { name: "公共音响系统" },
      { name: "无烟楼层" },
      { name: "公用区wifi", free: true },
      { name: "电梯" },
    ],
  },
  {
    title: "无障碍设施服务",
    icon: "♿",
    items: [
      { name: "楼梯扶手" },
      { name: "无障碍通道" },
      { name: "无障碍客房" },
    ],
  },
  {
    title: "亲子设施",
    icon: "♿",
    items: [
      { name: "楼梯扶手" },
      { name: "无障碍通道" },
      { name: "无障碍客房" },
    ],
  },
  {
    title: "商务设施",
    icon: "♿",
    items: [
      { name: "楼梯扶手" },
      { name: "无障碍通道" },
      { name: "无障碍客房" },
    ],
  },
  {
    title: "安全与安保",
    icon: "♿",
    items: [
      { name: "楼梯扶手" },
      { name: "无障碍通道" },
      { name: "无障碍客房" },
    ],
  },
];
</script>

<style lang="less" scoped>
.facility-detail {
  padding: 20px;
  color: #333;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .icon-main {
      font-style: normal;
      margin-right: 8px;
    }
  }

  // 1. 基础图标网格
  .basic-facilities {
    margin-bottom: 30px;
    .grid-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      .item {
        display: flex;
        align-items: center;
        font-size: 14px;
        .icon {
          margin-right: 10px;
        }
        .tag-free {
          background: #e6f7ff;
          color: #0066cc;
          font-size: 12px;
          padding: 1px 4px;
          margin-left: 6px;
          border-radius: 2px;
        }
      }
    }
  }

  // 2. 图片卡片
  .photo-section {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
    .photo-card {
      flex: 1;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      height: 200px;
      cursor: pointer;
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      .photo-label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        color: #fff;
        padding: 20px 10px 10px;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  // 3. 详细分类列表
  .more-facilities {
    .category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); // 三列布局
      gap: 30px;

      .category-column {
        .cat-title {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          .cat-icon {
            font-style: normal;
            margin-right: 8px;
          }
        }
        .cat-list {
          list-style: none;
          padding: 0;
          li {
            font-size: 13px;
            color: #555;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .check {
              color: #999;
              margin-right: 8px;
              font-size: 12px;
            }
            .tag-free-small {
              color: #00897b;
              font-size: 12px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
