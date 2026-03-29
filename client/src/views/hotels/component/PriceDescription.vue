<template>
  <div class="price-description-module">
    <h2 class="title">价格说明</h2>
    <ul class="description-list">
      <li>
        划线价格为参考价，该价格指商品或服务的门市价、服务提供商的指导价、零售价或该商品或服务曾经展示过的销售价等，并非原价；由于产品信息实时更新、市场价格波动等可能会与您预订时展示的不一致，该价格仅供您参考。
      </li>
      <li>
        未划线价格指商品或服务的实时标价，为划线价基础上计算出的优惠金额。具体成交价格根据商品或服务参加活动，或会员使用优惠券等发生变化，最终以订单结算页价格为准。
      </li>
      <li>如有疑问，您可在预订前联系客服进行咨询。</li>
      <li>
        此说明仅当出现价格比较时有效。若服务提供商单独对划线价格进行说明的，以服务提供商的表述为准。
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.price-description-module {
  padding: 20px;
  border-top: 1px solid #eeeeee; // 顶部分割线
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 16px;
  }

  .description-list {
    list-style: none; // 隐藏默认样式
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 15px; // 为自定义圆点留出空间
      font-size: 13px;
      color: #666666; // 正文颜色稍浅
      line-height: 1.8; // 增加行高，提升阅读体验
      margin-bottom: 8px;
      text-align: justify; // 文字两端对齐

      // 使用伪元素实现自定义小圆点
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px; // 根据行高微调位置
        width: 4px;
        height: 4px;
        background-color: #999999;
        border-radius: 50%;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
