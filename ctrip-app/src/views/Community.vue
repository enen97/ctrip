<template>
  <div class="community-page">
    <div class="community-header">
      <div class="nav-row">
        <div class="tabs">
          <span class="tab">关注</span>
          <span class="tab active">广场</span>
          <span class="tab">重庆 <van-icon name="arrow-down" /></span>
        </div>
        <div class="search-entry"><van-icon name="search" /> 搜索</div>
      </div>
    </div>

    <div class="post-card">
      <div class="user-info">
        <van-image round width="35" height="35" src="https://via.placeholder.com/100" />
        <span class="username">肉丸和胡辣汤</span>
      </div>
      <div class="post-content">
        🎉五一轰趴王炸！私汤别墅吃喝玩乐全包🎁...
      </div>
      <div class="image-grid">
        <van-image v-for="i in 4" :key="i" radius="8" src="https://via.placeholder.com/300" />
      </div>
      <div class="post-footer">
        <div class="input-fake">发表评论...</div>
        <div class="actions">
          <span><van-icon name="good-job-o" /> 31</span>
          <span><van-icon name="comment-o" /> 9</span>
        </div>
      </div>
    </div>

    <div class="post-btn"><van-icon name="plus" /></div>
  </div>
</template>

<style lang="less" scoped>
.community-page {
  background: #f5f5f5;
  .community-header {
    height: 180px;
    background: url('https://via.placeholder.com/800x400') center/cover;
    padding: 40px 15px 0;
    .nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tabs {
        color: #fff;
        .tab { margin-right: 15px; font-size: 16px; opacity: 0.8; }
        .active { font-size: 20px; font-weight: bold; opacity: 1; border-bottom: 3px solid #fff; }
      }
      .search-entry {
        background: rgba(255,255,255,0.8);
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .post-card {
    background: white;
    margin: -20px 10px 10px;
    border-radius: 12px;
    padding: 15px;
    position: relative;
    .user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      margin: 10px 0;
    }
    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-fake { background: #f5f5f5; flex: 1; padding: 6px 12px; border-radius: 20px; color: #999; font-size: 12px; }
      .actions { margin-left: 15px; display: flex; gap: 10px; color: #666; }
    }
  }
  .post-btn {
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 50px;
    height: 50px;
    background: #00d2ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
}
</style>