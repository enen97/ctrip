<template>
  <div class="search-container">
    <div class="search-box">
      <div class="input-item city">广州</div>
      <div class="input-item date">3月25日 - 3月26日 <span>1晚</span></div>
      <div class="input-item guest">1间, 2成人, 0儿童</div>
      <input class="input-item keyword" placeholder="位置/品牌/酒店" />
      <button class="search-btn">搜索</button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  background: #f0f2f5;
  padding: 10px 0;
}
.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #0086f6;
  border-radius: 8px;
  width: 1000px;
  margin: 0 auto;
}
.input-item {
  padding: 10px 15px;
  border-right: 1px solid #eee;
  font-size: 14px;
}
.keyword {
  border: none;
  flex: 1;
  outline: none;
}
.search-btn {
  background: #0086f6;
  color: #fff;
  border: none;
  padding: 12px 30px;
  cursor: pointer;
}
</style>
