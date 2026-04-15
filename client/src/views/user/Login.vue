<template>
  <div class="login-wrapper">
    <el-card class="login-box">
      <h2>账号密码登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="formRef">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="手机号/用户名" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="登录密码"
            show-password
          />
        </el-form-item>

        <el-button type="primary" class="register-btn" @click="handleRegister">
          注册
        </el-button>

        <el-button
          type="primary"
          class="login-btn"
          @click="handleLogin(formRef)"
        >
          登 录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "../../api/user";
import { useUserStore } from "../../store/user";

const router = useRouter();
const userStore = useUserStore();
const formRef = ref();
const loginForm = reactive({ account: "", password: "" });

const handleRegister = () => {
  router.push("/register");
};

const rules = {
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const handleLogin = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await login(loginForm);
        // axios 拦截器已经直接返回了 res.data，所以这里的 res 就是后端的 JSON 数据
        if (res.code === 200) {
          userStore.setUserInfo(res.data);
          console.log(res.data);
          alert("登录成功！");
          // 跳转到首页
          window.location.href = "/";
        } else {
          // 如果后端抛出了业务错误 (如被禁用、密码错误，code 为 500)
          alert(res.msg || "登录失败");
        }
      } catch (err) {
        // 只有网络不通等底层异常才会走到这里
        alert("请求异常，请检查网络或联系管理员");
      }
    }
  });
};
</script>

<style lang="less" scoped>
.login-wrapper {
  height: 100vh;
  background: linear-gradient(180deg, #eef5ff 0%, #fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .login-box {
    padding: 20px;
    .login-btn,
    .register-btn {
      border: none;
      height: 42px;
      width: 150px;
    }
  }
}
</style>
