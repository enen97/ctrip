<template>
  <div class="search-more-container">
    <div class="content-wrapper">
      <h2 class="title">仍未找到合适的酒店？</h2>
      <button class="more-btn">查看更多上海的酒店</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-more-container {
  padding: 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .content-wrapper {
    text-align: center;

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 24px;
      letter-spacing: 0.5px; // 微调字间距，贴合视觉效果
    }

    .more-btn {
      background-color: #007aff; // 携程/旅游类 App 常用标准蓝
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      padding: 12px 32px;
      border: none;
      border-radius: 6px; // 略带圆角，增加现代感
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0066cc; // 鼠标悬停时稍微加深
      }

      &:active {
        background-color: #0055aa; // 点击时反馈
        transform: translateY(1px); // 轻微点击位移
      }
    }
  }
}
</style>
