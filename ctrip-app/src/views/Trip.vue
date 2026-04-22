<template>
  <div class="trip-page">
    <van-nav-bar title="暂无行程" right-text="更多">
      <template #right><van-icon name="plus" size="18" /><van-icon name="wap-nav" size="18" style="margin-left:10px" /></template>
    </van-nav-bar>

    <div class="plan-card">
      <h3>线路规划</h3>
      <div class="map-preview">
        <div class="node">西安站</div>
        <div class="node">大雁塔</div>
        <div class="node">酒店</div>
        <van-button type="primary" round class="start-plan-btn">开始规划</van-button>
      </div>
    </div>

    <div class="discovery-section">
      <div class="section-title">
        <span><van-icon name="location" color="#ff7675" /> 旅游地图</span>
        <span class="more">发现你的旅行灵感 ></span>
      </div>
      
      <div class="city-group">
        <h4>北京 <span>攻略 ></span></h4>
        <div class="horizontal-scroll">
          <div class="guide-card" v-for="i in 3" :key="i">
            <img src="https://via.placeholder.com/200x260" />
            <div class="guide-tag">当地指南</div>
            <p>北京，已经这么好玩了吗？！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.trip-page {
  background: #f0f3f8;
  .plan-card {
    background: white;
    margin: 10px;
    padding: 15px;
    border-radius: 12px;
    .map-preview {
      height: 150px;
      background: #e3f2fd;
      border-radius: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .start-plan-btn { width: 140px; }
    }
  }
  .discovery-section {
    padding: 10px;
    .section-title { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 15px; }
    .horizontal-scroll {
      display: flex;
      overflow-x: auto;
      gap: 10px;
      .guide-card {
        flex: 0 0 140px;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        img { width: 100%; height: 180px; object-fit: cover; }
        .guide-tag { position: absolute; top: 5px; left: 5px; background: rgba(0,0,0,0.5); color: white; font-size: 10px; padding: 2px 4px; }
        p { padding: 8px; font-size: 12px; font-weight: bold; }
      }
    }
  }
}
</style>