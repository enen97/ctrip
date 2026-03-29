<template>
  <div class="hotel-intro-container">
    <h2 class="section-title">酒店简介</h2>

    <div class="hotel-meta-info">
      <div class="meta-item">
        <span class="label">开业：</span>
        <span class="value">2013</span>
      </div>
      <div class="meta-item">
        <span class="label">装修：</span>
        <span class="value">2018</span>
      </div>
      <div class="meta-item">
        <span class="label">客房数：</span>
        <span class="value">169</span>
      </div>
      <div class="meta-item full-width">
        <span class="label">电话：</span>
        <span class="value">021-61972196-9</span>
      </div>
    </div>

    <div class="hotel-description">
      <p>
        酒店位于上海北外滩中心东大名路，紧邻黄浦江畔，步行约5分钟即可到达北外滩“滨江步道”；距离公平路轮渡口约400米，可直达陆家嘴金融中心；距离国际客运中心码头约700米；距离地铁12号线提篮桥站1号口约400米，步行约6分钟，距离东方明珠、南京路步行街、豫园等著名景点约15分钟车程。
      </p>
      <p>
        酒店作为知名“设计师酒店”，设施参照国际高星级配置，客房隔音系统由清华声学所设计，保证宾客有安静、舒适睡眠。
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.hotel-intro-container {
  padding: 20px;
  color: #333333;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #000000;
  }

  // 1. 顶部元数据布局
  .hotel-meta-info {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;

    .meta-item {
      width: 150px; // 固定宽度实现整齐排列
      margin-bottom: 12px;
      font-size: 14px;

      &.full-width {
        width: 100%; // 电话占一行
      }

      .label {
        font-weight: bold;
        color: #000000;
      }

      .value {
        color: #333333;
      }
    }
  }

  // 2. 描述文本布局
  .hotel-description {
    p {
      font-size: 14px;
      line-height: 1.8; // 增加行高，还原舒适的阅读感
      margin-bottom: 15px;
      text-align: justify; // 两端对齐
      color: #333333;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
