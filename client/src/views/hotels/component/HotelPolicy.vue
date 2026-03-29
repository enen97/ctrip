<template>
  <div class="hotel-policies">
    <h2 class="main-title">酒店政策</h2>

    <div class="policy-row">
      <div class="policy-label">入离时间</div>
      <div class="policy-content">
        <p>入住时间：14:00后</p>
        <p>退房时间：12:00前</p>
      </div>
    </div>

    <div class="policy-row">
      <div class="policy-label">预订提示</div>
      <div class="policy-content">
        <p>
          订单需等酒店或供应商确认后生效，订单确认结果以平台短信、邮件或app通知为准。
        </p>
      </div>
    </div>

    <div class="policy-row">
      <div class="policy-label">入住提示</div>
      <div class="policy-content">
        <div class="sub-item">
          <span class="sub-label">入住方式</span>
          <span class="sub-text">在预订后，我们会提前向您发送入住说明</span>
        </div>
        <div class="sub-item">
          <span class="sub-label">提前联系</span>
          <span class="sub-text"
            >在预订后，若您需要在非入住时间办理入住，请务必提前1天通过电话联系酒店</span
          >
        </div>
        <div class="sub-item">
          <span class="sub-label">证件要求</span>
          <span class="sub-text">儿童入住必须提供身份证/户口本/出生证明。</span>
        </div>
        <div class="sub-item">
          <span class="sub-label">前台服务</span>
          <span class="sub-text">前台营业时间：24小时营业</span>
        </div>
      </div>
    </div>

    <div class="policy-row">
      <div class="policy-label">接待提示</div>
      <div class="policy-content">
        <div class="sub-item">
          <span class="sub-label">年龄限制</span>
          <span class="sub-text">入住办理人需年满18岁</span>
        </div>
        <div class="sub-item">
          <span class="sub-label">可接待人群</span>
          <span class="sub-text">接待来自任何国家/地区的客人</span>
        </div>
      </div>
    </div>

    <div class="policy-row">
      <div class="policy-label">宠物</div>
      <div class="policy-content">不可携带宠物</div>
    </div>

    <div class="policy-row">
      <div class="policy-label">早餐</div>
      <div class="policy-content">
        <p>餐食菜品：西式、中式</p>
        <p>餐食形式：自助餐，¥78每份</p>
        <p>营业时间：周六、周日06:30-10:30开放 周一至周五06:30-10:00开放</p>
      </div>
    </div>

    <div class="policy-row">
      <div class="policy-label">支付方式</div>
      <div class="policy-content">
        <div class="payment-icons">
          <span class="pay-tag" style="background: #eb2f96">UnionPay</span>
          <span class="pay-tag" style="background: #1890ff">Alipay</span>
          <span class="pay-tag" style="background: #1d39c4">VISA</span>
          <span class="pay-tag" style="background: #52c41a">Wechat</span>
        </div>
      </div>
    </div>

    <div class="policy-row">
      <div class="policy-label">儿童及加床</div>
      <div class="policy-content">
        <p class="bold-text">欢迎携带儿童入住</p>
        <p class="bold-text">婴儿床及加床政策</p>
        <p class="gray-text">所有房型不可加床、不提供婴儿床</p>

        <table class="policy-table">
          <thead>
            <tr>
              <th>年龄</th>
              <th>床铺</th>
              <th>费用</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>17岁及以下</td>
              <td>使用现有床铺</td>
              <td class="free">免费</td>
            </tr>
          </tbody>
        </table>

        <p class="bold-text" style="margin-top: 15px">儿童早餐</p>
        <table class="policy-table">
          <thead>
            <tr>
              <th>儿童身高</th>
              <th>费用</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.4米以下</td>
              <td class="free">免费</td>
            </tr>
            <tr>
              <td>1.4米及以上</td>
              <td>¥78/人</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.hotel-policies {
  padding: 20px;
  color: #333;
  line-height: 1.6;
  border-radius: 10px;
  border: 2px solid #ebedf1;

  .main-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 25px;
  }

  .policy-row {
    display: flex;
    margin-bottom: 24px;
    font-size: 14px;

    .policy-label {
      width: 120px;
      font-weight: bold;
      flex-shrink: 0;
    }

    .policy-content {
      flex: 1;

      p {
        margin: 0 0 8px 0;
      }

      .bold-text {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .gray-text {
        color: #888;
        margin-bottom: 12px;
      }

      .sub-item {
        display: flex;
        margin-bottom: 10px;
        .sub-label {
          width: 80px;
          font-weight: bold;
          color: #333;
        }
        .sub-text {
          flex: 1;
          color: #555;
        }
      }

      .payment-icons {
        display: flex;
        gap: 8px;
        .pay-tag {
          padding: 2px 8px;
          color: #fff;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
        }
      }

      // 表格样式还原
      .policy-table {
        width: 100%;
        max-width: 600px;
        border-collapse: collapse;
        margin-top: 10px;
        border: 1px solid #f0f0f0;

        th {
          background-color: #f5f7fa;
          text-align: left;
          padding: 10px 15px;
          font-weight: bold;
          color: #333;
        }

        td {
          padding: 10px 15px;
          border-top: 1px solid #f0f0f0;

          &.free {
            color: #00bfa5; // 图中的绿色“免费”
          }
        }
      }
    }
  }
}
</style>
