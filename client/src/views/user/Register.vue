<template>
  <div class="register-wrapper">
    <el-card class="register-box">
      <h2>新用户注册</h2>
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="formRef"
        label-position="top"
      >
        <el-form-item prop="account">
          <el-input
            v-model="registerForm.account"
            placeholder="请输入手机号/用户名"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入登录密码"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>

        <div class="btn-group">
          <el-button class="back-btn" @click="goLogin">返回登录</el-button>
          <el-button
            type="primary"
            class="register-btn"
            @click="handleRegister(formRef)"
          >
            立即注册
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "../../api/user"; // 确保你在 api 目录下定义了 register 方法

const router = useRouter();
const formRef = ref();

const registerForm = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});

// 自定义验证逻辑：检查两次密码是否一致
const validateConfirmPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const rules = {
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: "blur" }],
};

// 注册逻辑
const handleRegister = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // 这里的 register 需要在 api/user.js 中导出
        const res = await register({
          account: registerForm.account,
          password: registerForm.password,
        });
        if (res.code == 500) {
          alert(res.msg);
          return;
        }
        alert("注册成功，请登录！", res);
        router.push("/login"); // 注册成功跳转登录页
      } catch (err) {
        alert(err.response?.data?.message || "注册失败");
      }
    }
  });
};

const goLogin = () => {
  router.push("/login");
};
</script>

<style lang="less" scoped>
.register-wrapper {
  height: 100vh;
  background: linear-gradient(180deg, #eef5ff 0%, #fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .register-box {
    width: 400px;
    padding: 20px;

    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .btn-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .register-btn,
      .back-btn {
        width: 48%;
        height: 42px;
      }
    }
  }
}
</style>
