<template>
  <div class="nearby-hotels">
    <h2 class="section-title">附近的酒店</h2>

    <div class="hotels-grid">
      <div class="hotel-card" v-for="(hotel, index) in hotelList" :key="index">
        <div class="image-wrapper">
          <img :src="hotel.image" :alt="hotel.name" />
          <div class="score-tag">
            <span class="score">{{ hotel.score }}</span>
            <span class="reviews">{{ hotel.reviews }} 点评</span>
          </div>
        </div>

        <div class="info-content">
          <div>
            <span class="hotel-name">{{ hotel.name }}</span>
            <span v-for="s in hotel.stars" :key="s" class="star-icon">💎</span>
          </div>

          <div class="distance-info">
            距酒店直线{{ hotel.distance }} · 近{{ hotel.landmark }}
          </div>

          <div class="booking-status">
            {{ hotel.lastBooked }}
            <div v-if="hotel.hotDeal" class="hot-deal">
              热卖！低价房仅剩{{ hotel.roomsLeft }}间
            </div>
          </div>

          <div class="action-bar">
            <button class="login-btn">登录看低价</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const hotelList = [
  {
    name: "如家商旅酒店(上海北外滩店)",
    image:
      "https://dimg04.c-ctrip.com/images/200a0r000000h2fx28B5D_R_640_440_R5.webp",
    score: "4.8",
    reviews: "1,861",
    stars: 3,
    distance: "520米",
    landmark: "SMP上海白玉兰广场",
    lastBooked: "52分钟前有人预订",
    hotDeal: false,
  },
  {
    name: "桔子水晶上海五角场大柏树酒店",
    image:
      "https://dimg04.c-ctrip.com/images/0205312000962xkif59E0_R_640_440_R5.webp",
    score: "4.8",
    reviews: "2,081",
    stars: 4,
    distance: "4.3公里",
    landmark: "近百联曲阳购物中心",
    lastBooked: "",
    hotDeal: true,
    roomsLeft: 5,
  },
  {
    name: "上海陆家嘴东方明珠桔子水晶酒店",
    image:
      "https://dimg04.c-ctrip.com/images/1mc6u12000myxta68F609_R_640_440_R5.webp",
    score: "4.7",
    reviews: "2,335",
    stars: 4,
    distance: "1.3公里",
    landmark: "近东方明珠",
    lastBooked: "",
    hotDeal: true,
    roomsLeft: 1,
  },
  {
    name: "桔子水晶上海五角场酒店",
    image:
      "https://dimg04.c-ctrip.com/images/1mc4i12000oljkvv99538_R_640_440_R5.webp",
    score: "4.8",
    reviews: "2,672",
    stars: 4,
    distance: "6.8公里",
    landmark: "近上海财经大学(国定路校区)",
    lastBooked: "",
    hotDeal: true,
    roomsLeft: 3,
  },
];
</script>

<style lang="less" scoped>
.nearby-hotels {
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .section-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  .hotels-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); // 四列布局
    gap: 15px;

    .hotel-card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        box-shadow: 1px 3px 8px 0 rgba(18, 24, 38, 0.12);
        transform: translateY(-10px);
      }

      .image-wrapper {
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .score-tag {
          position: absolute;
          bottom: -14px;
          left: 12px;
          background: #fff;
          border-radius: 4px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid #006ff6;

          .score {
            background: #006ff6;
            color: #fff;
            font-weight: bold;
            font-size: 15px;
            padding: 2px 8px;
            border-radius: 0px 0px 10px 0px;
            margin-right: 6px;
          }
          .reviews {
            color: #006ff6;
            font-size: 15px;
            padding: 0px 5px;
          }
        }
      }

      .info-content {
        display: flex;
        flex-direction: column;
        padding: 20px 12px 12px 12px;
        height: 200px;

        .hotel-name {
          font-size: 17px;
          font-weight: bold;
          color: #333;
        }

        .distance-info {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }

        .booking-status {
          font-size: 12px;
          color: #999;
          margin-bottom: 10px;
          min-height: 18px;
          .hot-deal {
            font-size: 12px;
            color: #ff4d4f; // 热卖红色
            margin-bottom: 8px;
            font-weight: bold;
          }
        }

        .action-bar {
          flex: 1;
          display: flex;
          justify-content: end;
          align-items: end;

          .login-btn {
            width: 113px;
            background: #fff;
            border: 1px solid #006ff6;
            color: #006ff6;
            padding: 8px 0;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background: #f0f7ff;
            }
          }
        }
      }
    }
  }
}
</style>
