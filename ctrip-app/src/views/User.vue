<template>
  <div class="user-page">
    <div class="user-header">
      <div class="top-bar">
        <van-icon name="scan" />
        <van-icon name="passed" />
        <van-icon name="service-o" />
        <van-icon name="setting-o" />
      </div>
      <div class="info-row">
        <van-image round width="60" height="60" src="https://via.placeholder.com/120" />
        <div class="text">
          <h3>尊敬的会员 <small>主页 ></small></h3>
          <p>粉丝 0 | 关注 0 | 获赞 0</p>
        </div>
      </div>
      <div class="vip-card">
        <div class="vip-line"><span>普通会员 会员中心 ></span> <span>携程积分多 ></span></div>
        <div class="benefits">
          <span>积分抵现</span><span>机场餐饮</span><span>优享会</span>
        </div>
      </div>
    </div>

    <van-grid :column-num="4" :border="false" class="assets-grid">
      <van-grid-item v-for="item in ['收藏','浏览历史','积分','优惠券']" :key="item">
        <template #icon><span class="num">0</span></template>
        <template #text>{{item}}</template>
      </van-grid-item>
    </van-grid>

    <div class="order-group">
      <van-grid :column-num="5" :border="false">
        <van-grid-item icon="pending-payment" text="待付款" />
        <van-grid-item icon="tosend" text="待出行" />
        <van-grid-item icon="after-sale" text="退款/售后" />
        <van-grid-item icon="comment-o" text="待点评" />
        <van-grid-item icon="orders-o" text="全部订单" />
      </van-grid>
    </div>

    <div class="wallet-card">
      <div class="title">我的钱包 <small>去实名</small></div>
      <van-grid :column-num="4" :border="false">
        <van-grid-item text="生意人贷">
          <template #icon><span class="money">50万</span></template>
        </van-grid-item>
        <van-grid-item text="拿去花">
          <template #icon><span class="money">10万</span><van-tag type="danger" size="mini">去查看</van-tag></template>
        </van-grid-item>
        <van-grid-item text="信用贷">
          <template #icon><span class="money">30万</span></template>
        </van-grid-item>
        <van-grid-item text="联名卡">
          <template #icon><span class="money">10万</span></template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-page {
  background: #f4f7fc;
  padding-bottom: 60px;
  .user-header {
    background: linear-gradient(#e1efff, #f4f7fc);
    padding: 40px 15px 60px;
    position: relative;
    .top-bar { display: flex; justify-content: flex-end; gap: 15px; font-size: 20px; color: #333; }
    .info-row { display: flex; align-items: center; gap: 15px; margin-top: 20px; }
    .vip-card {
      position: absolute; bottom: -10px; left: 10px; right: 10px;
      background: linear-gradient(to right, #d4e8ff, #ffffff);
      border-radius: 10px; padding: 12px;
      .vip-line { display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-bottom: 10px; }
      .benefits { display: flex; gap: 15px; font-size: 10px; color: #666; }
    }
  }
  .assets-grid { margin-top: 20px; background: white; .num { font-weight: bold; font-size: 16px; } }
  .order-group { background: white; margin: 10px; border-radius: 12px; padding: 10px 0; }
  .wallet-card {
    background: white; margin: 10px; border-radius: 12px; padding: 15px;
    .title { font-size: 14px; font-weight: bold; margin-bottom: 10px; }
    .money { font-size: 16px; font-weight: bold; color: #333; }
  }
}
</style>