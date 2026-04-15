<template>
  <div class="pay-success">
    <div class="card">
      <!-- loading -->
      <div v-if="loading" class="loading">
        正在确认支付结果...
      </div>

      <!-- success -->
      <div v-else-if="status === 1" class="success">
        <div class="icon">✅</div>
        <h2>支付成功</h2>
        <p>订单号：{{ orderNo }}</p>

        <div class="btns">
          <button @click="goHome">返回首页</button>
          <button @click="goOrder">查看订单</button>
        </div>
      </div>

      <!-- fail -->
      <div v-else class="fail">
        <div class="icon">❌</div>
        <h2>支付未完成</h2>
        <p>请在订单页查看状态</p>

        <div class="btns">
          <button @click="goHome">返回首页</button>
          <button @click="goOrder">我的订单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const orderNo = route.query.out_trade_no; // 支付后建议带上
const status = ref(0); // 0 loading / 1 success / 2 fail
const loading = ref(true);

// 🔥 查询订单状态（关键）
const checkPayStatus = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/order/status/${orderNo}`
    );

    if (res.data.status === 1) {
      status.value = 1;
    } else {
      status.value = 2;
    }
  } catch (err) {
    status.value = 2;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!orderNo) {
    loading.value = false;
    status.value = 2;
    return;
  }

  // 立即查询一次
  checkPayStatus();

  // 🔥 轮询（防止支付宝回调延迟）
  const timer = setInterval(() => {
    if (status.value === 1) {
      clearInterval(timer);
      return;
    }
    checkPayStatus();
  }, 2000);
});

// 跳转
const goHome = () => router.push("/");
const goOrder = () => router.push("/order-list");
</script>

<style scoped>
.pay-success {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.card {
  width: 420px;
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.loading {
  font-size: 16px;
  color: #666;
}

.icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.success h2 {
  color: #2ecc71;
}

.fail h2 {
  color: #e74c3c;
}

.btns {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #3264ff;
  color: #fff;
}

button:hover {
  opacity: 0.9;
}
</style>