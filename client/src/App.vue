<script setup>
import HeadComponent from "./components/HeadComponent.vue";
import BottomComponent from "./components/BottomComponent.vue";
import DishComponent from "./components/DIshComponent.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="position: fixed; height: 100vh" width="auto"
        ><DishComponent></DishComponent
      ></el-aside>
      <el-container style="margin-left: 65px">
        <div class="main-container">
          <el-header><HeadComponent></HeadComponent></el-header>
          <el-main><router-view /></el-main>
        </div>
        <el-footer style="padding: 0"
          ><BottomComponent></BottomComponent
        ></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-main {
  overflow: visible !important;
}
</style>

<style scoped>
.main-container {
  width: 1220px;
  margin: 0 auto;
}
</style>
