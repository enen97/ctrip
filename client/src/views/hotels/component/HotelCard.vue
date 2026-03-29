<template>
  <div class="room-card">
    <div class="room-title">观景豪华大床房（手机投屏+迷你吧）</div>

    <div class="room-container">
      <aside class="room-info-side">
        <div class="image-gallery">
          <div class="main-img">
            <img
              src="https://dimg04.c-ctrip.com/images/1mc1u12000o1zfece8F66_R_400_200_R5.webp"
              alt="room"
            />
          </div>
          <div class="sub-imgs">
            <img
              src="https://dimg04.c-ctrip.com/images/0200i120008abw8ay0E94_R_200_100_R5.webp"
              alt="sub"
            />
            <div class="img-more">
              <img
                src="https://dimg04.c-ctrip.com/images/20031e000001flkkl53D3_R_200_100_R5.webp"
                alt="sub"
              />
              <span class="count">📷 10</span>
            </div>
          </div>
        </div>
        <ul class="info-list">
          <li><span class="icon">🛏️</span> 1张1.8米大床</li>
          <li class="green"><span class="icon">🪟</span> 有窗</li>
          <li><span class="icon">🚫</span> 禁烟</li>
          <li><span class="icon">📏</span> 31平方米 | 5-16层</li>
          <li class="green"><span class="icon">📶</span> Wi-Fi免费</li>
        </ul>
        <a href="javascript:;" class="detail-link">房间详情</a>
      </aside>

      <div class="room-right">
        <main class="room-plans-side">
          <div class="plan-header">
            <div class="col-summary">房型摘要</div>
            <div class="col-guests">可住人数</div>
            <div class="col-price">今日价格</div>
          </div>

          <div class="plan-row" v-for="(plan, index) in plans" :key="index">
            <div class="col-summary">
              <div :class="['breakfast', plan.hasBreakfast ? 'green' : 'gray']">
                <span class="icon">🍽️</span> {{ plan.breakfastText }}
                <span class="help-icon">?</span>
              </div>
              <ul class="policy-list">
                <li class="green">✔️ {{ plan.cancelPolicy }}</li>
                <li class="green">⚡ {{ plan.confirmPolicy }}</li>
                <li>💳 在线付</li>
                <li class="green">🌟 至多3间</li>
              </ul>
              <div v-if="plan.gift" class="gift-box">
                <span class="icon">🎁</span> {{ plan.gift }}
                <span class="arrow-right">></span>
              </div>
            </div>

            <div class="col-guests">
              <span class="guest-icons">👤👤</span>
            </div>

            <div class="col-price">
              <button class="book-btn">解锁优惠</button>
            </div>
          </div>
        </main>
        <div class="plan-footer">展示额外2个房型价格</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const plans = [
  {
    breakfastText: "无早餐",
    hasBreakfast: false,
    cancelPolicy: "入住当天18:00前可免费取消",
    confirmPolicy: "立即确认",
    gift: "赠送礼品",
  },
  {
    breakfastText: "2份早餐",
    hasBreakfast: true,
    cancelPolicy: "入住当天18:00前可免费取消",
    confirmPolicy: "立即确认",
    gift: null,
  },
];
</script>

<style lang="less" scoped>
.room-card {
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .room-title {
    padding: 12px 16px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
  }

  .room-container {
    display: flex;

    // 左侧样式
    .room-info-side {
      width: 240px;
      padding-left: 16px;
      padding-right: 16px;

      .image-gallery {
        margin-bottom: 12px;
        img {
          cursor: pointer;
          &:hover {
            transform: scale(1.05);
          }
          transition: transform 0.3s ease;
        }
        .main-img img {
          width: 100%;
          border-radius: 4px;
          display: block;
        }
        .sub-imgs {
          display: flex;
          gap: 4px;
          margin-top: 4px;
          img {
            width: 102px;
            height: 55px;
            border-radius: 2px;
          }
          .img-more {
            position: relative;
            .count {
              position: absolute;
              bottom: 4px;
              right: 4px;
              background: rgba(0, 0, 0, 0.6);
              color: #fff;
              font-size: 11px;
              padding: 1px 4px;
              border-radius: 2px;
            }
          }
        }
      }

      .info-list {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          font-size: 13px;
          color: #333;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          .icon {
            width: 20px;
            text-align: center;
            margin-right: 4px;
          }
          &.green {
            color: #00897b;
          }
        }
      }
      .detail-link {
        display: block;
        margin-top: 10px;
        color: #006ff6;
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
      }
    }

    // 右侧表格样式
    .room-right {
      width: 78%;
      margin-left: 5px;
      .room-plans-side {
        display: flex;
        flex-direction: column;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        overflow: hidden;

        .plan-header {
          display: flex;
          background: #f5f7fa;
          border-bottom: 1px solid #f0f0f0;
          div {
            padding: 8px 16px;
            font-size: 16px;
            font-weight: 700;
            color: #333;
          }
          .col-summary {
            flex: 44 1;
            padding: 0 16px;
          }
          .col-guests {
            padding: 0 16px;
          }
          .col-price {
            flex: 53 1;
            padding: 0 16px;
            text-align: center;
          }
        }

        .plan-row {
          display: flex;
          border-bottom: 1px solid #f0f0f0;
          &:last-of-type {
            border-bottom: none;
          }

          .col-summary {
            flex: 47 1;
            padding: 16px 8px;
            border-right: 1px solid #f0f0f0;

            .breakfast {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              &.gray {
                color: #333;
              }
              &.green {
                color: #00897b;
              }
              .help-icon {
                border: 1px solid #ccc;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                font-size: 10px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin-left: 8px;
                color: #999;
              }
            }

            .policy-list {
              list-style: none;
              padding: 0;
              margin: 0;
              li {
                font-size: 12px;
                margin-bottom: 4px;
                color: #333;
                &.green {
                  color: #00897b;
                }
              }
            }

            .gift-box {
              margin-top: 12px;
              padding: 8px;
              background: #fafafa;
              border: 1px solid #eee;
              border-radius: 4px;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              color: #666;
              cursor: pointer;
            }
          }

          .col-guests {
            width: 100px;
            display: flex;
            justify-content: center;
            padding-top: 16px;
            border-right: 1px solid #f0f0f0;
            .guest-icons {
              font-size: 14px;
            }
          }

          .col-price {
            flex: 53 1;
            display: flex;
            align-items: end;
            justify-content: end;
            padding: 16px;

            .book-btn {
              background-color: #006ff6;
              color: white;
              border: none;
              width: 150px;
              padding: 8px 24px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              &:hover {
                background-color: #2a5de8;
              }
            }
          }
        }
      }
      .plan-footer {
        padding: 12px;
        text-align: center;
        font-size: 13px;
        color: #006ff6;
        cursor: pointer;
        background: #fff;
      }
    }
  }
}
</style>
