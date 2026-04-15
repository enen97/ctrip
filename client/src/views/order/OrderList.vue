<template>
  <div class="order-container">
    <el-container style="width: 1200px;margin: 0 auto;">
      <el-header>
        <HeadComponent></HeadComponent>
      </el-header>
      <div class="order-page-container">
        <aside class="side-menu">
          <div v-for="menu in menuList" :key="menu.name" :class="['menu-item', { active: menu.active }]">
            {{ menu.name }}
            <el-icon v-if="menu.children" class="arrow">
              <ArrowDown />
            </el-icon>
          </div>
        </aside>
        <main class="order-content">
          <div class="info-banner">
            <el-icon>
              <InfoFilled />
            </el-icon>
            <span>您可以在线查看近一年订单，如需查找更久之前的订单，请至携程app或致电95010；您也可以使用右边下载功能下载历史所有订单</span>
            <a href="#" class="download-link" @click="handleDownloadAll"><el-icon>
                <Document />
              </el-icon>下载历史所有订单</a>
          </div>

          <div class="filter-tabs">
            <div class="tabs-header">
              <div v-for="tab in TABS" :key="tab" :class="['tab-item', { active: activeTab == tab }]"
                @click="activeTab = tab">
                {{ tab }}
              </div>
            </div>

            <div class="filter-bar">
              <span class="more-filter" @click="isMoreFilterOpen = !isMoreFilterOpen">更多筛选条件 <el-icon>
                  <CaretBottom />
                </el-icon></span>
            </div>
            <div v-show="isMoreFilterOpen" class="extended-filter-box">
              <el-form :inline="true" :model="searchForm" size="default">
                <el-form-item label="订单号">
                  <el-input v-model="searchForm.orderId" placeholder="请输入订单号" style="width: 150px" />
                </el-form-item>

                <el-form-item label="旅客">
                  <el-input v-model="searchForm.guest" placeholder="请输入姓名" style="width: 150px" />
                </el-form-item>

                <el-form-item label="预订日期">
                  <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                    style="width: 230px" :teleported="false"/>
                </el-form-item>

                <el-form-item>
                  <el-select v-model="searchForm.validStatus" style="width: 100px" :teleported="false">
                    <el-option label="全部订单" value="-1" />
                    <el-option label="待支付" value="0" />
                    <el-option label="未出行" value="1" />
                    <el-option label="已取消" value="2" />
                    <el-option label="待点评" value="3" />
                  </el-select>
                </el-form-item>

                <el-form-item class="search-btns">
                  <el-button type="default" @click="resetSearch">重置</el-button>
                  <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div class="order-list">
            <el-empty v-if="pageOrders.length == 0" description="暂无订单"></el-empty>
            <div v-for="order in pageOrders" :key="order.id" class="order-card">
              <div class="card-header">
                <el-checkbox v-model="order.checked" />
                <span class="order-no">订单号: <a href="#">{{ order.id }}</a></span>
                <span class="order-date">创建订单日期: {{ order.date }}</span>
                <a href="#" class="delete-btn" @click.prevent="handleDelete(order.id)">删除订单</a>
              </div>

              <div class="card-body">
                <div class="hotel-info">
                  <h3 class="hotel-name">{{ order.hotelName }}</h3>
                  <p class="address">{{ order.address }}</p>
                  <p class="details">入住日期: {{ order.checkIn }} 至 {{ order.checkOut }} {{ order.nights }}晚/{{
                    order.rooms }}间</p>
                  <p class="details">入住人: {{ order.guest }}</p>
                  <p class="room-type">{{ order.roomType }}</p>
                </div>

                <div class="order-status-price">
                  <div class="status">{{ order.status }}</div>
                  <div class="price-box">
                    <span class="pay-type">在线付</span>
                    <span class="currency">￥</span>
                    <span class="amount">{{ order.price }}</span>
                  </div>
                </div>
              </div>
              <div class="action-buttons">
                <button class="btn-plain">酒店详情</button>
                <button class="btn-plain">再次预订</button>
              </div>
            </div>
          </div>

          <div class="footer-bar">
            <div class="left">
              <el-checkbox v-model="isAllChecked" label="全选" />
              <span class="batch-download" @click="handleDownload"><el-icon>
                  <Download />
                </el-icon>下载</span>
            </div>
            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="filteredOrders.length"
              layout="prev, pager, next" size="small" />
          </div>
        </main>
      </div>
    </el-container>
    <el-footer style="padding: 0" class="footer">
      <BottomComponent></BottomComponent>
    </el-footer>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { InfoFilled, Document, ArrowDown, CaretBottom, Download } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx';
import { useUserStore } from '@/store/user';
import { getUserOrders } from '@/api/order';
import HeadComponent from '../../components/HeadComponent.vue';
import BottomComponent from '../../components/BottomComponent.vue';
import { ElMessageBox, ElMessage } from 'element-plus'
import { deleteOrderApi, searchUserOrders } from '../../api/order';



const userStore = useUserStore();
const allOrders = ref([]);

// 删除订单
const handleDelete = (orderNode) => {
  ElMessageBox.confirm(
    '删除后无法在客户端查询订单记录，请谨慎操作', // 正文
    '您需要删除此订单吗？', // 标题
    {
      confirmButtonText: '删除',
      cancelButtonText: '点错了',
      type: 'warning', // 警告图标
      icon: 'WarningFilled', // 自定义图标（需导入）
      draggable: true,
    }
  )
    .then(async () => {
      await deleteOrderApi(orderNode)
      // 刷新订单列表
      fetchOrders()
      ElMessage.success('删除成功')
    })
}


// 1. 定义tab状态常量
const TABS = {
  ALL: '全部订单',
  UNFILTERED: '未出行',
  PENDING_PAY: '待支付',
  PENDING_REVIEW: '待点评'
}

const activeTab = ref(TABS.ALL)

const menuList = [
  { name: '我的携程首页', active: false },
  { name: '订单', active: true },
  { name: '我的消息', active: false },
  { name: '钱包', active: false, children: true },
  { name: '礼品卡', active: false },
  { name: '优惠券', active: false },
  { name: '积分', active: false },
  { name: '我的收藏', active: false },
  { name: '常用信息', active: false, children: true },
  { name: '个人中心', active: false, children: true },
]

onMounted(() => {
  fetchOrders();
})


const fetchOrders = async () => {
  try {
    const res = await getUserOrders(userStore.userId);
    if (res.code == 200) {
      allOrders.value = res.data.map(order => {
        return {
          ...order,
          checked: false // 为每一项初始化 checked 属性
        }
      })
    }
  } catch (error) {
    console.error('获取订单失败:', error);
  }
}

// 3. 筛选逻辑
const filteredOrders = computed(() => {
  if (activeTab.value === TABS.ALL) {
    return allOrders.value
  }
  const typeMap = {
    [TABS.UNFILTERED]: 'unfiltered',
    [TABS.PENDING_PAY]: 'pending_pay',
    [TABS.PENDING_REVIEW]: 'pending_review'
  }
  return allOrders.value.filter(order => {
    return order.statusType === typeMap[activeTab.value]
  })
})


// 全选逻辑
const isAllChecked = computed({
  get() {
    return filteredOrders.value.length > 0 && filteredOrders.value.every(order => order.checked);
  },
  set(value) {
    filteredOrders.value.forEach(order => order.checked = value);
  }
})


// 定义分页相关变量
const currentPage = ref(1)
const pageSize = ref(3)

// 显示当前页面数据
const pageOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredOrders.value.slice(start, start + pageSize.value)
})

// TAB切换时重置分页
watch(activeTab, () => {
  currentPage.value = 1
})


// 下载功能
const handleDownload = () => {
  // 1、获取当前筛选条件下被勾选的订单
  const selectedOrders = filteredOrders.value.filter(order => order.checked)
  if (selectedOrders.length === 0) {
    alert('请至少选择一个订单进行下载')
    return
  }

  // 2、数据格式转换：将原始的key映射为excel的列名
  const excelData = selectedOrders.map(order => ({
    '订单号': order.id,
    '预订日期': order.date,
    '酒店名称': order.hotelName,
    '地址': order.address,
    '入住日期': order.checkIn,
    '离店日期': order.checkOut,
    '间夜数': `${order.nights}晚/${order.rooms}间`,
    '入住人': order.guest,
    '房型': order.roomType,
    '状态': order.status,
    '价格': order.price
  }));

  // 3、创建工作表工作簿和工作表
  const worksheet = XLSX.utils.json_to_sheet(excelData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '订单列表')

  // 4、设置列宽
  const cols = [
    { wch: 20 }, // 订单号
    { wch: 12 }, // 预订日期
    { wch: 30 }, // 酒店名称
    { wch: 30 }, // 地址
    { wch: 12 }, // 入住日期
    { wch: 12 }, // 离店日期
    { wch: 10 }, // 间夜数
    { wch: 10 }, // 入住人
    { wch: 25 }, // 房型
    { wch: 10 }, // 状态
    { wch: 10 }, // 价格
  ];

  worksheet['!cols'] = cols;

  // 5、生成Excel文件并触发下载
  const filename = `订单列表_${new Date().getTime()}.xlsx`
  XLSX.writeFile(workbook, filename)
}

// 下载全部订单
const handleDownloadAll = () => {
  const targetData = allOrders.value;

  if (targetData.length === 0) {
    alert('暂无订单可供下载');
    return;
  }

  // 1、数据格式转换
  const excelData = targetData.map(order => ({
    '订单号': order.id,
    '预订日期': order.date,
    '酒店名称': order.hotelName,
    '地址': order.address,
    '入住日期': order.checkIn,
    '离店日期': order.checkOut,
    '间夜数': `${order.nights}晚/${order.rooms}间`,
    '入住人': order.guest,
    '房型': order.roomType,
    '状态': order.status,
    '价格': order.price
  }));

  // 2、创建工作簿
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '全部订单列表');

  // 3、设置列宽
  const cols = [
    { wch: 20 }, // 订单号
    { wch: 12 }, // 预订日期
    { wch: 30 }, // 酒店名称
    { wch: 30 }, // 地址
    { wch: 12 }, // 入住日期
    { wch: 12 }, // 离店日期
    { wch: 10 }, // 间夜数
    { wch: 10 }, // 入住人
    { wch: 25 }, // 房型
    { wch: 10 }, // 状态
    { wch: 10 }, // 价格
  ];
  worksheet['!cols'] = cols;

  // 4、生成并下载
  const filename = `全部订单导出_${new Date().getTime()}.xlsx`;
  XLSX.writeFile(workbook, filename);
}


// 控制更多筛选栏的展开/折叠
const isMoreFilterOpen = ref(false)
// 搜索表单数据
const searchForm = reactive({
  orderId: '',
  guest: '',
  dateRange: ['', ''], // 这里会自动存储 [开始日期, 结束日期]
  validStatus: '-1'
})

// 查询逻辑
const handleSearch = async () => {
  const res = await searchUserOrders(userStore.userId, searchForm.dateRange[0], searchForm.dateRange[1], searchForm.guest, searchForm.orderId, searchForm.validStatus)
  if (res.code == 200) {
    allOrders.value = res.data.map(order => {
      return {
        ...order,
        checked: false // 为每一项初始化 checked 属性
      }
    })
  } else {
    ElMessage.error(res.msg)
  }
}

// 清空逻辑
const resetSearch = () => {
  searchForm.orderId = ''
  searchForm.guest = ''
  searchForm.dateRange = []
  searchForm.validStatus = '-1'
}
</script>

<style lang="less" scoped>
.order-page-container {
  display: flex;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;

  // 左侧导航
  .side-menu {
    width: 180px;
    background: #fff;
    border: 1px solid #e0e0e0;
    margin-right: 20px;

    .menu-item {
      padding: 12px 20px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.active {
        background-color: #f0f7ff;
        color: #006ff6;
        border-left: 3px solid #006ff6;
      }

      &:hover:not(.active) {
        background-color: #f8f8f8;
      }
    }
  }

  // 右侧主内容
  .order-content {
    flex: 1;

    .info-banner {
      background: #e6f3ff;
      border: 1px solid #a3d0fd;
      padding: 8px 15px;
      font-size: 12px;
      color: #666;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .el-icon {
        color: #006ff6;
        margin-right: 8px;
        font-size: 16px;
      }

      .download-link {
        margin-left: auto;
        color: #006ff6;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .filter-tabs {
      background: #fff;
      border: 1px solid #ddd;
      margin-bottom: 15px;

      .tabs-header {
        display: flex;
        border-bottom: 1px solid #ddd;

        .tab-item {
          padding: 12px 30px;
          font-size: 16px;
          cursor: pointer;

          &.active {
            color: #006ff6;
            border-bottom: 2px solid #006ff6;
            margin-bottom: -1px;
          }
        }
      }

      .filter-bar {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;

        .more-filter {
          cursor: pointer;
          color: #006ff6;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 4px;

          .el-icon {
            transition: transform 0.3s;
            &.is-active {
              transform: rotate(180deg); // 点击后箭头向上
            }
          }
        }
      }

      .extended-filter-box {
          padding: 15px;
          border-radius: 4px;
          display: flex;
          flex-wrap: wrap; // 允许换行
          :deep(.el-form) {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .search-btns {
              margin-top: 10px;
              margin-left: auto !important; // 强制推向右侧
              margin-right: 40px !important; // 覆盖默认的 margin-right
            }
          }
          
          :deep(.el-form-item) {
            // 保持你之前的重置样式
            margin-bottom: 10px; // 给换行后的行留点间距
          }
          
        }
    }

    // 订单卡片
    .order-card {
      background: #fff;
      border: 1px solid #ddd;
      margin-bottom: 20px;

      .card-header {
        background: #f9f9f9;
        padding: 8px 15px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 15px;
        border-bottom: 1px solid #eee;

        .order-no a {
          color: #006ff6;
          text-decoration: none;
        }

        .order-date {
          color: #999;
        }

        .delete-btn {
          margin-left: auto;
          color: #006ff6;
          text-decoration: none;
        }
      }

      .card-body {
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr 200px;
        align-items: start;

        .hotel-name {
          font-size: 16px;
          margin: 0 0 8px 0;
        }

        .address {
          font-size: 13px;
          color: #666;
          margin-bottom: 8px;
        }

        .details {
          font-size: 13px;
          color: #333;
          margin: 4px 0;
        }

        .room-type {
          font-size: 13px;
          color: #666;
          margin-top: 8px;
        }

        .order-status-price {
          text-align: right;
          padding-right: 20px;

          .status {
            color: #999;
            font-size: 13px;
            margin-bottom: 15px;
          }

          .price-box {
            .pay-type {
              font-size: 12px;
              color: #999;
              margin-right: 4px;
            }

            .currency {
              font-weight: bold;
              font-size: 14px;
            }

            .amount {
              font-weight: bold;
              font-size: 20px;
            }
          }
        }
      }

      .action-buttons {
        display: flex;
        justify-content: flex-end;
        padding: 20px;
        padding-top: 0;

        .btn-plain {
          padding: 6px 30px;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          margin-left: 40px;

          &:hover {
            border-color: #006ff6;
            color: #006ff6;
          }
        }
      }
    }

    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .batch-download {
        margin-left: 10px;
        color: #006ff6;
        cursor: pointer;
        font-size: 13px;
      }
    }
  }
}
</style>