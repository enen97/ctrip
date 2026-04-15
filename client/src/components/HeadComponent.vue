<script setup>
import { ref } from "vue";
import {
  Search,
  Iphone,
  Sunrise,
  User,
  OfficeBuilding,
  MapLocation,
  Van,
  List,
  ArrowDown,
  ArrowRight,
  Avatar,
  Money,
  CreditCard,
  Notebook,
  MessageBox,
  Present,
  SwitchButton,
} from "@element-plus/icons-vue";

const keyword = ref("");

const handleQuery = () => {
  console.log(keyword.value);
};

const isMenuOpen = ref(false);

import { useUserStore } from "../store/user";
const userStore = useUserStore();

const handleLogout = () => {
  // 清除管内Pinia状态
  userStore.clearUserInfo();
  // 跳转到登录页
  window.location.href = "/login";
  // 提示 (可选)
  alert("已成功退出");
};
</script>

<template>
  <div class="head-container">
    <div class="left">
      <h1><a class="logo" href="/"></a></h1>
      <div class="nav">
        <div class="search-box-container">
          <input
            type="text"
            class="search-input"
            placeholder="搜索任何旅游相关"
            v-model="keyword"
          />
          <div class="search-button" @click="handleQuery">
            <el-icon><Search /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li>
          <el-dropdown trigger="hover" placement="bottom-end" :teleported="false">
            <div class="user-info-capsule">
              <img
                :src="userStore.avatar"
                alt="avatar"
                class="capsule-avatar"
              />
              <span class="capsule-text">尊敬的{{ userStore.nickname || '会员' }}</span>
              <el-icon class="capsule-arrow"><arrow-down /></el-icon>
            </div>

            <template #dropdown>
              <div class="user-panel">
                <div class="panel-header">
                  <img
                    :src="userStore.avatar"
                    alt="avatar"
                    class="header-avatar"
                  />
                  <div class="header-right">
                    <div class="username-row">
                      <span class="username">{{ userStore.nickname || '普通会员' }}</span>
                      <el-icon class="username-arrow"><arrow-right /></el-icon>
                    </div>
                    <div class="level-label">
                      <el-icon class="level-icon"><avatar /></el-icon>
                      <span>白银贵宾</span>
                    </div>
                  </div>
                </div>

                <div class="panel-divider"></div>

                <el-dropdown-menu class="panel-menu">
                  <el-dropdown-item>
                    <el-icon><money /></el-icon><span>我的积分</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><credit-card /></el-icon><span>我的钱包</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><notebook /></el-icon><span>我的收藏</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><message-box /></el-icon><span>常用信息</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><present /></el-icon><span>会员商城</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><van /></el-icon><span>合作卡</span>
                  </el-dropdown-item>
                </el-dropdown-menu>

                <div class="panel-divider"></div>

                <el-dropdown-menu class="panel-menu panel-footer">
                  <el-dropdown-item @click="handleLogout" class="logout-item">
                    <el-icon class="logout-icon"><switch-button /></el-icon
                    ><span>退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </div>
            </template>
          </el-dropdown>
        </li>
        <li></li>
        <li></li>
        <li>
          <el-dropdown
            trigger="hover"
            popper-class="custom-dropdown"
            :teleported="false"
            @visible-change="isMenuOpen = $event"
          >
            <span class="el-dropdown-link" :class="{ 'is-open': isMenuOpen }"
              >我的订单 <span class="custom-triangle"></span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><el-icon
                    ><img src="../assets/plane.svg" class="iconfont" /></el-icon
                  >机票+相关订单</el-dropdown-item
                >
                <el-dropdown-item
                  ><el-icon><OfficeBuilding /></el-icon
                  >酒店订单</el-dropdown-item
                >
                <el-dropdown-item
                  ><el-icon><MapLocation /></el-icon>旅游订单</el-dropdown-item
                >
                <el-dropdown-item
                  ><el-icon><Van /></el-icon>火车票订单</el-dropdown-item
                >
                <!-- 点击跳转到订单页面 -->
                <el-dropdown-item @click="$router.push('/order-list')"
                  ><el-icon><List /></el-icon>全部订单</el-dropdown-item
                >
                <el-dropdown-item divided
                  ><el-icon><Search /></el-icon>手机号查询订单</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <li></li>
        <li>联系客服</li>
        <li></li>
        <li>
          <el-icon><Iphone /></el-icon>
        </li>
        <li>
          <el-icon><Sunrise /></el-icon>
        </li>
        <li>
          <el-icon><User /></el-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.head-container {
  display: flex;
  justify-content: space-between;
  .left {
    height: 72px;
    display: flex;
    align-items: center;
    .logo {
      display: block;
      width: 200px;
      height: 40px;
      background-image: url(../assets/logo.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  // 导航栏右侧部分
  .right {
    display: flex;
    align-items: center;
    font-size: 14px;
    > ul {
      display: flex;
      align-items: center;
      li {
        margin-left: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        // 强制去掉 dropdown 触发区域的边框和 outline
        .el-dropdown {
          outline: none; // 去掉焦点轮廓
          color: #000;

          :deep(.el-tooltip__trigger) {
            outline: none;
            border: none !important; // 强制移除可能存在的边框
          }
        }
        .el-dropdown-link:hover {
          color: #0076f5;
          .custom-triangle {
            border-top-color: #0076f5;
          }
        }

        .custom-triangle {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid #606266; /* 初始颜色 */
          border-radius: 5px;
          transition: transform 0.3s;
          margin-left: 3px;
        }

        /* 激活状态下旋转 */
        .is-open {
          color: #0076f5;
          .custom-triangle {
            transform: rotate(180deg);
            border-top-color: #0076f5;
          }
        }
      }
      li:hover {
        color: #1989f7;
      }
      li:nth-child(3),
      li:nth-child(5),
      li:nth-child(7)::before {
        content: "";
        width: 1px;
        height: 20px;
        background-color: #dadfe6;
      }
      /* 1. 顶部胶囊区域样式 */
      .user-info-capsule {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 4px 12px;
        background-color: #f0f7ff; /* 浅蓝色背景 */
        border-radius: 20px;       /* 胶囊形状 */
        transition: all 0.3s;

        .capsule-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 8px;
          // 如果头像背景需要黄色，可以在外部包裹 div
        }

        .capsule-text {
          color: #0076f7; /* 图片中文字是蓝色的 */
          font-size: 14px;
          margin-right: 6px;
        }

        .capsule-arrow {
          font-size: 12px;
          color: #0076f7;
        }
      }

      /* 2. 下拉面板整体样式 */
      .user-panel {
        width: 220px; /* 设定一个固定宽度 */
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* 阴影 */
        border: 1px solid #ebeef5;
        background: #fff;
      }

      /* 2.1 头部用户信息 */
      .panel-header {
        padding: 18px 16px;
        display: flex;
        align-items: center;

        .header-avatar {
          width: 50px;
          /* 更大的头像 */
          height: 50px;
          border-radius: 50%;
          margin-right: 14px;
          background-color: #ffc20e;
          /* 对应黄底头像 */
        }

        .header-right {
          flex: 1;

          .username-row {
            display: flex;
            align-items: center;
            margin-bottom: 6px;

            .username {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .username-arrow {
              font-size: 14px;
              margin-left: 6px;
              color: #888;
            }
          }

          .level-label {
            display: inline-flex;
            align-items: center;
            padding: 2px 8px;
            background-color: #f0f7ff;
            border-radius: 10px;
            font-size: 12px;
            color: #666;

            .level-icon {
              font-size: 14px;
              margin-right: 4px;
              color: #0076f7;
            }
          }
        }
      }

      /* 2.2 & 2.4 分隔线 */
      .panel-divider {
        height: 1px;
        background-color: #ebeef5;
        margin: 0;
      }

      /* 2.3 & 2.5 菜单列表样式 */
      .panel-menu {
        padding: 8px 0;

        // 重写 el-dropdown-item 的样式
        :deep(.el-dropdown-menu__item) {
          display: flex;
          align-items: center;
          padding: 10px 16px;
          font-size: 14px;
          color: #555;

          // 图标样式
          .el-icon {
            font-size: 18px;
            margin-right: 12px;
            color: #0076f7;
            /* 这里统一用了蓝色图标，图片中图标颜色不一，你可以根据Prop自定义 */
          }

          &:hover {
            background-color: #f5f7fa;
            color: #0076f7;
          }
        }

        // 退出登录单独样式
        &.panel-footer {
          padding: 10px 0;

          :deep(.logout-item) {
            .el-icon {
              color: #888;
              /* 退出图标设为灰色 */
            }

            &:hover {
              background-color: #fef0f0;
              /* 红色悬停效果 */
              color: #f56c6c;

              .el-icon {
                color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }
}

// 搜索框总容器
.search-box-container {
  display: flex; // 使用 flex 布局让子元素水平排列
  align-items: center; // 垂直居中
  width: 320px; // 设置搜索框的宽度，根据需要调整
  height: 34px; // 设置高度
  border: 1px solid #dcdfe6; // 默认状态下的边框颜色
  border-radius: 8px; // 设置大圆角
  overflow: hidden; // 确保按钮不会超出容器的圆角范围
  transition: all 0.3s; // 添加过渡动画效果
  margin-left: 30px;

  // 鼠标悬停时的样式
  &:hover {
    border-color: #1989f7; // 悬停时边框加深
  }
}

// 输入框部分
.search-input {
  flex: 1; // 占据剩余的所有空间
  border: none; // 去掉默认边框
  padding: 0 16px; // 设置左内边距，让文字不贴边
  font-size: 14px;
  color: #666;
  outline: none; // 去掉获得焦点时的蓝色外边框
  background-color: #fff; // 背景色

  // 占位符文字样式
  &::placeholder {
    color: #909399; // 灰色的占位文字
  }
}

// 搜索按钮部分
.search-button {
  width: 56px; // 按钮的固定宽度
  height: 100%; // 高度填满父容器
  background: linear-gradient(
    90deg,
    #00a7fa 0%,
    #0076f5 100%
  ); // 蓝色的渐变背景色
  border: none; // 去掉默认边框
  cursor: pointer; // 鼠标变成手形
  display: flex; // 让图标居中
  align-items: center;
  justify-content: center;
  color: #fff; // 图标颜色为白色
  font-size: 18px; // 图标大小
  transition: opacity 0.3s; // 添加透明度过渡

  // 鼠标悬停在按钮上时的效果
  &:hover {
    opacity: 0.9; // 增加一点透明度
  }
}

.iconfont {
  width: 20px;
}

// 深度选择器修改下拉框样式 (仅在本组件生效)
:deep(.custom-dropdown) {
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .el-dropdown-menu {
    border-radius: 12px;
    border: none;
    padding: 6px; // 增加内边距，让内部项的圆角背景有展现空间

    .el-dropdown-menu__item {
      margin: 2px 0;
      border-radius: 20px; // 较大的圆角，使其呈现椭圆/胶囊状
      padding: 8px 16px;
      transition: all 0.3s;

      // 鼠标悬停时的样式
      &:hover,
      &:focus {
        background-color: #e8f4ff !important; // 椭圆蓝色背景
        color: #1989f7 !important; // 蓝色文字
      }

      // 文字和图标的间距
      .el-icon {
        margin-right: 8px;
        font-size: 16px;
      }
    }
  }
}
</style>
