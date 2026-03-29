<template>
  <div class="reviews-module">
    <h2 class="module-title">点评</h2>

    <section class="rating-overview">
      <div class="total-score-box">
        <div class="score-badge">4.8</div>
        <div class="score-info">
          <div class="status">超棒</div>
          <div class="count">3,571 条评论</div>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-item" v-for="item in ratings" :key="item.label">
          <span class="label">{{ item.label }}</span>
          <div class="bar-bg">
            <div
              class="bar-fill"
              :style="{ width: (item.score / 5) * 100 + '%' }"
            ></div>
          </div>
          <span class="score-num">{{ item.score }}</span>
        </div>
      </div>
    </section>

    <section class="tags-section">
      <h3 class="sub-title">热门提及</h3>
      <div class="tags-wrapper">
        <span v-for="tag in hotTags" :key="tag.text" class="tag">
          {{ tag.text }} ({{ tag.count }})
        </span>
      </div>
    </section>

    <section class="impressions-section">
      <h3 class="sub-title">住客印象</h3>
      <div class="cards-grid">
        <div
          class="comment-card"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="user-info">
            <div class="avatar">👤</div>
            <div class="meta">
              <div class="username">{{ comment.user }}</div>
              <div class="date">{{ comment.date }}</div>
            </div>
          </div>
          <p class="content">{{ comment.text }}</p>
        </div>
      </div>
      <div class="more-btn">展开更多 <span>></span></div>
    </section>
  </div>
</template>

<script setup>
const ratings = [
  { label: "卫生", score: 4.8 },
  { label: "设施", score: 4.8 },
  { label: "环境", score: 4.8 },
  { label: "服务", score: 4.8 },
];

const hotTags = [
  { text: "所有点评", count: "3,571" },
  { text: "值得推荐", count: "3,521" },
  { text: "有图", count: "600" },
  { text: "视频", count: "14" },
  { text: "前台热情", count: "373" },
  { text: "早餐很棒", count: "371" },
  { text: "交通便利", count: "291" },
  { text: "近地铁站", count: "117" },
  { text: "差评", count: "50" },
];

const comments = [
  {
    user: "V5猪猪侠",
    date: "2025年10月28日",
    text: "设施：比较完善 环境：高层比较安静，距离外滩乘坐地铁方便。服务：非常热情，礼貌。",
  },
  {
    user: "M2jjm101i****",
    date: "2026年2月21日",
    text: "订的江景房，晚上可以看到江景，风景还挺好的，工作人员服务态度也很好。",
  },
  {
    user: "M520530****",
    date: "2026年3月22日",
    text: "房间很好啊，来旅游本来打算住一个晚上就换酒店，后面觉得这里各方面都很好。",
  },
];
</script>

<style lang="less" scoped>
.reviews-module {
  color: #333;
  border-radius: 10px;
  border: 2px solid #ebedf1;
  padding: 20px;

  .module-title {
    font-size: 22px;
    margin-bottom: 24px;
  }

  // 1. 评分部分
  .rating-overview {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;

    .total-score-box {
      display: flex;
      align-items: center;
      margin-right: 60px;

      .score-badge {
        background-color: #006ff6;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        padding: 2px 14px;
        border-radius: 4px 4px 16px 4px;
        margin-right: 12px;
      }
      .status {
        color: #006ff6;
        font-size: 18px;
        font-weight: bold;
      }
      .count {
        color: #666;
        font-size: 14px;
        margin-top: 4px;
      }
    }

    .progress-container {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px 40px;

      .progress-item {
        display: flex;
        align-items: center;
        .label {
          font-weight: bold;
          width: 40px;
          font-size: 14px;
        }
        .score-num {
          color: #006ff6;
          font-weight: bold;
          width: 30px;
          text-align: right;
        }
        .bar-bg {
          flex: 1;
          height: 8px;
          background-color: #f0f2f5;
          border-radius: 4px;
          margin: 0 10px;
          overflow: hidden;
          .bar-fill {
            height: 100%;
            background-color: #006ff6;
            border-radius: 4px;
          }
        }
      }
    }
  }

  // 2. 标签部分
  .tags-section {
    margin-bottom: 30px;
    .sub-title {
      font-size: 18px;
      margin-bottom: 16px;
    }
    .tags-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .tag {
        background-color: #f5f7fa;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        color: #333;
        cursor: pointer;
        &:hover {
          background-color: #eef1f6;
        }
      }
    }
  }

  // 3. 卡片部分
  .impressions-section {
    .sub-title {
      font-size: 18px;
      margin-bottom: 16px;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;

      .comment-card {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 16px;
        height: 180px;
        display: flex;
        flex-direction: column;

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          .avatar {
            width: 36px;
            height: 36px;
            background: #e8f3ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
          }
          .username {
            font-weight: bold;
            font-size: 14px;
          }
          .date {
            color: #999;
            font-size: 12px;
          }
        }
        .content {
          font-size: 13px;
          line-height: 1.6;
          color: #333;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
    .more-btn {
      text-align: center;
      color: #006ff6;
      margin-top: 20px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }
  }
}
</style>
