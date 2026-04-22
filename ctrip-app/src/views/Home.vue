<template>
  <div class="home-page">
    <div class="header-nav">
      <div class="logo-area">
        <img src="https://pic.c-ctrip.com/common/c_logo_2022.png" alt="logo" class="logo" />
      </div>
      <div class="user-tools">
        <div class="tool-item">
          <van-icon name="gem-o" />
          <span>普通会员</span>
        </div>
        <div class="tool-item">
          <van-icon name="gold-coin-o" />
          <span>积分</span>
        </div>
      </div>
    </div>

    <div class="main-grid-container">
      <div class="core-grid">
        <div class="grid-item hotel">
          <van-icon name="home-o" size="20" />
          <span>酒店</span>
        </div>
        <div class="grid-item scenic">
          <van-icon name="location-o" size="20" />
          <span>攻略/景点</span>
        </div>
        <div class="grid-item flight">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </span>
          <span>机票</span>
        </div>
        <div class="grid-item train">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11h14V7H5v4zm0-6h14V5H5v0z"/>
            </svg>
          </span>
          <span>火车票</span>
        </div>
        <div class="grid-item travel">
          <van-icon name="star-o" size="20" />
          <span>旅游/定制</span>
        </div>
      </div>
      <van-grid :column-num="5" :border="false" class="sub-grid">
        <van-grid-item icon="shop-o" text="民宿/客栈" />
        <van-grid-item icon="photo-o" text="门票/玩乐" />
        <van-grid-item icon="logistics" text="接送机/包车" />
        <van-grid-item icon="guide-o" text="租车自驾" />
        <van-grid-item icon="flag-o" text="跟团游" />
      </van-grid>
    </div>

    <div class="search-card">
      <div class="search-bar-wrapper">
        <div class="location-search">
          <van-icon name="service-o" class="ai-icon" />
          <span class="search-text">重庆 · 陶喆 Soul Power II...</span>
          <van-button icon="search" type="primary" size="small" round class="search-btn" />
        </div>
        <div class="map-entry">
          <van-icon name="location-o" />
          <p>旅游地图</p>
        </div>
      </div>
      <div class="hot-search-tags">
        <span>搜一搜：</span>
        <span class="tag">成都</span>
        <span class="tag">西安</span>
        <span class="tag">上海</span>
        <span class="tag">北京</span>
      </div>
    </div>

    <div class="feature-sections">
      <div class="feature-item">
        <p>特价/直播</p>
        <van-icon name="discount" color="#ff4d4f" />
      </div>
      <div class="feature-item">
        <p>演出/展览</p>
        <van-icon name="music-o" color="#5c7cff" />
      </div>
      <div class="feature-item">
        <p>行程规划</p>
        <van-icon name="records-o" color="#00b894" />
      </div>
      <div class="feature-item">
        <p>旅行热点</p>
        <van-icon name="ascending" color="#ff7675" />
      </div>
      <div class="feature-item">
        <p>携程榜单</p>
        <van-icon name="label-o" color="#ff7675" />
      </div>
    </div>

    <div class="content-stream">
      <div class="waterfall-col">
        <div class="stream-card main-card">
          <img src="https://via.placeholder.com/150x200" alt="ad" />
          <div class="card-info">如歌的旅程</div>
        </div>
      </div>
      <div class="waterfall-col">
        <div class="stream-card hotel-rank">
          <img src="https://via.placeholder.com/150x120" alt="hotel" />
          <div class="card-title">重庆哪些酒店值得住</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 50px;

  /* 顶部蓝色区域 */
  .header-nav {
    background: linear-gradient(to right, #2b91ff, #0076f6);
    height: 120px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: white;
    .logo { height: 24px; }
    .user-tools {
      display: flex;
      gap: 10px;
      font-size: 12px;
      .tool-item { display: flex; align-items: center; gap: 4px; }
    }
  }

  /* 主金刚区卡片 */
  .main-grid-container {
    background: white;
    margin: -60px 10px 10px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);

    .core-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding: 10px;
      gap: 2px;
      .grid-item {
        height: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
        border-radius: 4px;
        gap: 4px;
        &.hotel { background: linear-gradient(#ff7a7a, #f85050); }
        &.scenic { background: linear-gradient(#ffb35a, #ff8a22); }
        &.flight { background: linear-gradient(#6faaff, #2b91ff); }
        &.train { background: linear-gradient(#9d8cff, #6c5ce7); }
        &.travel { background: linear-gradient(#56e2c3, #00b894); }
      }
    }

    .sub-grid {
      :deep(.van-grid-item__text) {
        font-size: 10px;
      }
    }

    .more-products {
      text-align: center;
      padding: 8px;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #f0f0f0;
    }
  }

  /* 搜索卡片 */
  .search-card {
    background: white;
    margin: 10px;
    padding: 12px;
    border-radius: 12px;
    .search-bar-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      .location-search {
        flex: 1;
        border: 2px solid #0086ff;
        border-radius: 25px;
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 4px 0 10px;
        .search-text { flex: 1; font-size: 13px; color: #333; margin: 0 8px; }
        .search-btn { height: 28px; width: 45px; }
      }
      .map-entry {
        text-align: center;
        font-size: 10px;
        color: #666;
        van-icon { font-size: 18px; }
      }
    }
    .hot-search-tags {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
      display: flex;
      gap: 12px;
      overflow-x: auto;
      .tag { color: #5c7cff; }
    }
  }

  /* 特色版块 */
  .feature-sections {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin: 10px;
    gap: 8px;
    .feature-item {
      background: white;
      padding: 10px 5px;
      border-radius: 8px;
      text-align: center;
      p { font-size: 11px; margin-bottom: 5px; font-weight: 500; }
    }
  }

  /* 内容流 */
  .content-stream {
    display: flex;
    padding: 0 10px;
    gap: 10px;
    .waterfall-col {
      flex: 1;
      .stream-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 10px;
        img { width: 100%; display: block; }
        .card-info, .card-title {
          padding: 8px;
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>