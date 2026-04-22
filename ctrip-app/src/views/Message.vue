<template>
  <div class="message-page">
    <van-nav-bar title="消息" fixed placeholder />
    
    <div class="header-tools">
      <van-grid :column-num="4" :border="false">
        <van-grid-item text="订单出行">
          <template #icon>
            <div class="icon-wrap blue"><van-icon name="description-o" /></div>
          </template>
        </van-grid-item>
        <van-grid-item text="互动消息">
          <template #icon>
            <div class="icon-wrap orange"><van-icon name="comment-o" /></div>
          </template>
        </van-grid-item>
        <van-grid-item text="账户通知">
          <template #icon>
            <div class="icon-wrap red"><van-icon name="bell" /></div>
          </template>
        </van-grid-item>
        <van-grid-item text="会员服务">
          <template #icon>
            <div class="icon-wrap gold"><van-icon name="gem-o" /></div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="empty-container">
      <van-empty 
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" 
        description="暂无更多消息"
      >
        <template #description>
          <p class="empty-text">暂无更多消息</p>
          <p class="empty-subtext">如需更多帮助，可点击下方按钮进入咨询</p>
        </template>
        <van-button round plain type="primary" class="contact-btn">联系客服</van-button>
      </van-empty>
    </div>
  </div>
</template>

<style lang="less" scoped>
.message-page {
  background: #f8fafe;
  min-height: 100vh;
  .header-tools {
    margin: 10px;
    background: white;
    border-radius: 12px;
    padding: 10px 0;
    .icon-wrap {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      margin-bottom: 8px;
      &.blue { background: #5da8ff; }
      &.orange { background: #ff9f43; }
      &.red { background: #ff6b6b; }
      &.gold { background: #d4af37; }
    }
  }
  .empty-container {
    margin-top: 40px;
    .empty-text { font-size: 16px; color: #333; margin-bottom: 4px; }
    .empty-subtext { font-size: 13px; color: #999; }
    .contact-btn { width: 120px; border-color: #0086ff; color: #0086ff; }
  }
}
</style>