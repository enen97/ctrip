<template>
  <div class="booking-notes">
    <h2 class="main-title">订房必读</h2>

    <div class="note-row">
      <div class="note-label">特殊证件要求</div>
      <div class="note-content">儿童入住必须提供身份证/户口本/出生证明。</div>
    </div>

    <div class="note-row">
      <div class="note-label">城市通知</div>
      <div class="note-content">
        为贯彻落实《上海市生活垃圾管理条例》相关规定，推进生活垃圾源头减量，上海市文化和旅游局特制定《关于本市旅游住宿业不主动提供客房一次性日用品的实施意见》，2019年7月1日起，上海市旅游住宿业将不再主动提供牙刷、梳子、浴擦、剃须刀、指甲锉、鞋擦这些一次性日用品。若需要可咨询酒店。
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.booking-notes {
  padding: 20px;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .main-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 25px;
    color: #000;
  }

  .note-row {
    display: flex;
    align-items: flex-start;
    line-height: 1.6;

    .note-label {
      width: 150px; // 左侧固定宽度
      font-size: 15px;
      font-weight: bold;
      color: #333;
      flex-shrink: 0;
    }

    .note-content {
      flex: 1;
      font-size: 14px;
      color: #333;
      text-align: justify; // 段落两端对齐，增加美感
    }
  }
}
</style>
