<template>
  <div class="order-container">
    <div class="order-content">
      <div class="left-form">
        <section class="form-section">
          <div class="section-header">
            <h3>住客资料</h3>
            <span class="sub-tip">住客姓名必须与登记入住时使用的有效证件完全一致。
              <el-popover placement="bottom-start" :width="400" trigger="hover" popper-class="name-info-popover">
                <template #reference>
                  <el-icon>
                    <Warning />
                  </el-icon>
                </template>
                <div class="popover-content">
                  <h4>住客姓名填写说明</h4>
                  <p class="intro">预订国内酒店需按住客办理入住时所持的身份证件，正确填写住客姓名。</p>

                  <h5>中文姓名填写方法：</h5>
                  <ul>
                    <li>
                      姓名中有生僻字，须全名拼音代替。
                      <br />例如：“王龑军”填写为“Wang/Yanjun”。
                    </li>
                    <li>
                      姓名中有特殊符号，可省略输入。
                      <br />例如：“汉祖然·买买提”填写为“汉祖然买买提”。
                    </li>
                  </ul>

                  <h5>英文姓名填写方法：</h5>
                  <ul>
                    <li>英文姓名中不能包含数字或特殊符号。</li>
                    <li>
                      姓在前，姓和名之间用“/”隔开，如有中间名则空一格紧随名之后。
                      <br />格式：Surname(姓)/Given name(名)Middle name(中间名)。
                      <br />例如：Green/Jim Stephanie
                    </li>
                  </ul>
                </div>
              </el-popover>
            </span>
          </div>
          <el-form label-position="top">
            <el-form-item label="住客姓名" required>
              <el-input v-model="formData.name" />
            </el-form-item>
            <div class="contact-info">
              <el-form-item label="电子邮件" style="flex: 1; margin-right: 20px;">
                <el-input v-model="formData.email" placeholder="行程单将发送至此邮箱" />
              </el-form-item>
              <el-form-item label="电话号码" required style="flex: 1;">
                <el-input v-model="formData.phone">
                  <template #prepend>
                    <el-select v-model="formData.areaCode" style="width: 90px">
                      <el-option label="(+86)" value="86" />
                      <el-option label="(+852)" value="852" />
                      <el-option label="(+886)" value="886" />
                      <el-option label="(+1)" value="1" />
                      <el-option label="(+82)" value="82" />
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </el-form>
        </section>

        <section class="form-section">
          <h3>到达时间</h3>
          <p class="sub-text">房间整晚保留</p>
          <el-select v-model="formData.arrivalTime" style="width: 280px">
            <el-option label="20:30" value="20:30" />
            <el-option label="21:30" value="21:30" />
            <el-option label="22:30" value="22:30" />
            <el-option label="23:30" value="23:30" />
          </el-select>
        </section>

        <section class="form-section">
          <h3>特别要求<span> (选填)</span></h3>
          <p class="sub-text">我们会将您的需求转达给酒店，但无法确保一定能够满足。</p>
          <div class="special-request">
            <p>电梯远近</p>
            <el-radio-group v-model="formData.elevator">
              <el-radio label="远离电梯">远离电梯</el-radio>
              <el-radio label="靠近电梯">靠近电梯</el-radio>
            </el-radio-group>
          </div>
        </section>

        <section class="form-section no-border">
          <h3>发票信息</h3>
          <p class="sub-text">下单后在订单页开具，发票由携程国际旅行社或其分公司开具 (可开普票、专票)</p>
          <el-button type="primary" class="submit-btn" size="large" @click="handleOrderSubmit" :loading="isSubmitting">最后一步</el-button>
          <p class="agreement">预订条款，个人信息授权协议，前往下一步代表已阅读并同意上述条件</p>
        </section>
      </div>

      <div class="right-summary">
        <div class="hotel-card card">
          <div class="hotel-info">
            <img :src="hotelDetail.image || 'https://placehold.jp/80x80.png'" class="hotel-img" />
            <div class="hotel-detail">
              <h4>{{ hotelDetail.name || '酒店名称加载中...' }} <span class="stars">{{ '⭐'.repeat(hotelDetail.star_level || 4) }}</span></h4>
              <div class="score"><span style="border-radius: 10.8px 0 9.6px 10.8px;">{{ hotelDetail.score || '-' }}</span> <span
                  style="color: #0086ff;background-color: transparent">{{ hotelDetail.scoreText }}</span> {{ hotelDetail.reviews ? hotelDetail.reviews.toLocaleString() + '条点评' : '' }}</div>
            </div>
          </div>
          <div class="room-type">

            <h5>{{ query.roomName }} <span v-if="query.hasBreakfast === '1'">· {{ query.breakfastText }}</span></h5>
            <p><el-icon><User /></el-icon>x{{  query.adults + query.children}} · {{ query.hasBreakfast === '1' ? '含早餐' : '无早餐' }} · Wi-Fi免费 · 禁烟 · 窗户较小 · {{ query.area }}平方米 · 最多{{ query.maxPeople }}人</p>
            <p class="shuttle">迪士尼班车接送服务 1份 / 迷你吧 1份 </p>
            <div class="cancel-tag"><el-icon class="green"><CircleCheck /></el-icon> 订单确认后30分钟内免费取消</div>
          </div>
        </div>

        <div class="date-card card">
          <div class="date-row">
            <span class="date-val">{{ formData.checkInText }} - {{ formData.checkOutText }}</span>
            <div class="divider"></div>
            <div class="display-flex-container">
              <div class="night-count-border">
                <div class="night-count">
                  <DatePickerSection :checkIn="query.checkIn" :checkOut="query.checkOut"
                    :checkInText="formData.checkInText" :checkOutText="formData.checkOutText" :nights="formData.nights"
                    :hideNight="true" @update="handleDateUpdate" />
                </div>
              </div>

              <div class="room-count">
                <el-icon><House /></el-icon>
                <el-select
                  v-model="query.rooms"
                  size="small"
                  style="width: 50px;"
                  :border="false"
                >
                  <el-option :value="1" label="1" />
                  <el-option :value="2" label="2" />
                  <el-option :value="3" label="3" />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="price-detail-card">
          <div class="card-header">
            <h3>价格详情</h3>
          </div>

          <div class="price-content">
            <div class="price-row summary-row">
              <span class="label">{{ formData.rooms }}间 x {{ formData.nights }}晚</span>
              <span class="value main-amount">¥{{ formData.totalPrice }}</span>
            </div>

            <div class="daily-breakdown">
              <div class="breakdown-item" v-for="(price, date) in formData.priceList" :key="date">
                <span class="date">{{ date }}:</span>
                <span class="amount">¥{{ price }} x{{ formData.rooms }}</span>
              </div>
              <div class="breakdown-item no-price">
                <span class="date">{{ formData.checkOutText }}:</span>
                <span class="desc">(离店日)</span>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="card-footer">
            <div class="price-row final-row">
              <span class="label">在线支付</span>
              <span class="value final-amount">¥{{ formData.totalPrice }}</span>
            </div>
          </div>
        </div>

        <div class="info-sidebar">
          <div class="policy-card card">
            <h4 class="card-title">取消政策</h4>

            <div class="timeline">
              <div class="timeline-item success">
                <div class="node">
                  <el-icon>
                    <Clock />
                  </el-icon>
                </div>
                <div class="content">
                  <div class="status">免费取消</div>
                  <div class="desc">订单确认30分钟内</div>
                </div>
              </div>

              <div class="timeline-item disabled">
                <div class="node">
                  <span class="dot"></span>
                </div>
                <div class="content">
                  <div class="status">不可取消</div>
                  <div class="desc">订单确认30分钟后</div>
                </div>
              </div>
            </div>

            <div class="policy-text">
              <p>*
                订单确认后30分钟内免费取消。若未入住将收取您¥{{ formData.totalPrice
                }}（如用优惠券、积分则以使用后的支付价为准）。订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准，如订单不确认将全额退款至您的付款账户。
              </p>
              <p>预订服务由携程旗下上海赫程国际旅行社有限公司及其分公司提供、住宿服务由酒店提供。</p>
            </div>
          </div>

          <div class="must-read-card card">
            <h4 class="card-title">订房必读</h4>
            <ul class="read-list">
              <li>儿童入住必须提供身份证/户口本/出生证明。</li>
              <li>无独立卫生间</li>
            </ul>
            <el-button link type="primary" class="expand-btn" @click="dialogVisible = true">
              展开更多
            </el-button>
          </div>
          <el-dialog v-model="dialogVisible" title="订房必读" width="700px" class="must-read-dialog" :align-center="true">
            <div class="dialog-content">
              <div class="info-item">
                <div class="label">证件要求</div>
                <div class="text">儿童入住必须提供身份证/户口本/出生证明。</div>
              </div>

              <div class="info-item">
                <div class="label">设施提示</div>
                <div class="text">无独立卫生间酒店空调为季节性开放，详情可提前咨询酒店，多有不便敬请谅解。</div>
              </div>

              <div class="info-item">
                <div class="label">城市通知</div>
                <div class="text">
                  为贯彻落实《上海市生活垃圾管理条例》相关规定，推进生活垃圾源头减量，上海市文化和旅游局特制定《关于本市旅游住宿业不主动提供客房一次性日用品的实施意见》，2019年7月1日起，上海市旅游住宿业将不再主动提供牙刷、梳子、浴擦、剃须刀、指甲锉、鞋擦这些一次性日用品。若需要可咨询酒店。
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter  } from 'vue-router';
import { CircleCheck, Clock, House, User, Warning } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import DatePickerSection from '../../components/DatePickerSection.vue';
import { getHotelDetail, getRoomAvailability } from '../../api/hotel.js';
import { createOrder } from '../../api/order.js';
import { useUserStore } from '../../store/user.js';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();


// 从路由读取所有预订参数
const query = reactive({
  hotelId: route.query.hotelId,
  roomTypeId: route.query.roomTypeId,
  roomName: route.query.roomName,
  area: route.query.area,
  maxPeople: route.query.maxPeople,
  hasBreakfast: route.query.hasBreakfast,
  checkIn: route.query.checkIn,
  checkOut: route.query.checkOut,
  rooms: parseInt(route.query.rooms),
  adults: parseInt(route.query.adults),
  children: parseInt(route.query.children),
});

// 酒店详情（从API获取）
const hotelDetail = reactive({
  name: '',
  star_level: 4,
  score: '',
  reviews: 0,
  image: '',
  hotelDetail: '',
});




// 日期组件用的 formData（兼容 DatePickerSection 双向绑定）
const parseDate = (str) => {
  if (!str) return new Date();
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
};

function formatToDate(str) {
  const date = new Date(str);
  
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

const formatDate = (date) => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
  return `${m}月${d}日(${week})`;
};

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  areaCode: '86',
  arrivalTime: '21:30',
  elevator: '远离电梯',
  checkInText: formatDate(parseDate(query.checkIn)),
  checkOutText: formatDate(parseDate(query.checkOut)),
  nights: Math.ceil((parseDate(query.checkOut) - parseDate(query.checkIn)) / (1000 * 60 * 60 * 24)),
  rooms: query.rooms || 1,
  totalPrice: 0,
  priceList: {}, // { '2026-04-02': 500, ... }
});



const handleDateUpdate = (data) => {
  query.checkIn = formatToDate(data.start);
  query.checkOut = formatToDate(data.end);
  const newQuery = {
    ...route.query,   // 👈 用当前 URL 参数
    checkIn: query.checkIn,
    checkOut: query.checkOut,
    rooms: query.rooms,   // ✅ 保留用户选择的房间数
  };
  // 同时同步 formData 中的 rooms，以便模板立即反应（虽然之后会 reload）
  formData.rooms = query.rooms;
  router.replace({
    path: route.path,
    query: newQuery,
  }).then(() => {
    window.location.reload(); // 🔥 用新 URL 刷新页面
  });
};

// 控制展开更多弹窗
const dialogVisible = ref(false);

watch(() => query.rooms, (newVal) => {
  formData.rooms = newVal;
  // 重新获取数据并验证库存/价格
  fetchRoomAvailability();
});

const fetchRoomAvailability = async () => {
  try {
    const res = await getRoomAvailability({
      hotelId: query.hotelId,
      roomTypeId: query.roomTypeId,
      checkIn: query.checkIn,
      checkOut: query.checkOut,
      rooms: query.rooms,
      adults: query.adults,
      children: query.children
    });
    const availability = res.data || [];
    
    if (availability.length === 0) {
      ElMessageBox.alert('该房间已售罄，请选择其他房间。', '提示', {
        confirmButtonText: '查看可预订房间',
        type: 'warning',
        showClose: false,
        callback: () => {
          router.push(`/hotels?hotelId=${query.hotelId}`);
        }
      });
      return;
    }

    // 检查是否有哪一天的库存不足
    const isInsufficient = availability.some(item => (item.stock - item.locked_stock) < query.rooms);
    if (isInsufficient) {
      ElMessageBox.alert('房间数不够请重新选择。', '提示', {
        confirmButtonText: '查看可预订房间',
        type: 'warning',
        showClose: false,
        callback: () => {
          router.push(`/hotels?hotelId=${query.hotelId}`);
        }
      });
      return;
    }
    
    const prices = {};
    let total = 0;
    availability.forEach(item => {
      // 这里的 date 可能是完整 ISO 字符串或 YYYY-MM-DD
      const dateStr = item.date.split('T')[0];
      prices[dateStr] = item.price;
      total += parseFloat(item.price);
    });
    
    formData.priceList = prices;
    formData.totalPrice = (total * query.rooms).toFixed(2);
    formData.nights = availability.length;
  } catch (e) {
    console.error('获取房间动态及价格失败', e);
  }
};

onMounted(async () => {
  if (query.hotelId) {
    try {
      // 获取酒店详情
      const res = await getHotelDetail(query.hotelId);
      const d = res.data || {};
      hotelDetail.name = d.name;
      hotelDetail.star_level = d.rating;
      hotelDetail.score = d.score;
      hotelDetail.reviews = d.reviewsCount;
      hotelDetail.scoreText = d.scoreText;
      hotelDetail.image = await getValidImage(d.images || []);
      console.log('酒店详情加载完成', hotelDetail);
      
      // 获取每天价格
      await fetchRoomAvailability();
    } catch (e) {
      console.error('获取酒店详情失败', e);
    }
  }
});

function getValidImage(images){
  return new Promise((resolve) => {
    let index = 0
    const tryLoadImage = () => {
      if(index >= images.length){
        resolve(''); // 所有图片都无法加载，返回占位图
        return;
      }
      const img = new Image();
      const current = images[index];
      img.onload = () => resolve(current); // 图片加载成功，返回该图片URL
      img.onerror = () => {
        index++;
        tryLoadImage(); // 加载失败，尝试下一张图片
      };
      img.src = current; // 开始加载当前图片
    };
    tryLoadImage();
  });
}

const isSubmitting = ref(false);

const handleOrderSubmit = async () => {
  if (!formData.name || !formData.phone) {
    ElMessage.warning('请填写完整的住客姓名和电话号码');
    return;
  }

  isSubmitting.value = true;
  try {
    const orderData = {
      userId: userStore.userId,
      hotelId: query.hotelId,
      roomTypeId: query.roomTypeId,
      checkIn: query.checkIn,
      checkOut: query.checkOut,
      rooms: query.rooms,
      totalPrice: formData.totalPrice,
      guestName: formData.name,
      guestEmail: formData.email,
      guestPhone: formData.phone,
      arrivalTime: formData.arrivalTime,
      // 特别要求
      elevator: formData.elevator
    };
    const res = await createOrder(orderData);
    console.log('提交订单成功，返回结果:', res);
    
    // 如果返回的是支付链接字符串，直接跳转
    if (typeof res === 'string' && res.startsWith('http')) {
      window.location.href = res;
    } else if (res && res.code === 200 && typeof res.data === 'string') {
      window.location.href = res.data;
    } else if (res && res.code !== 200) {
      ElMessage.error(res.msg || '创建订单失败');
    } else {
       console.error('未知的响应格式:', res);
       ElMessage.error('支付跳转失败，请检查后端返回');
    }
  } catch (error) {
    console.error('提交订单异常:', error);
    ElMessage.error(error.message || '系统繁忙，请稍后再试');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="less" scoped>
// 1. 定义变量
@primary-green: #06875a;

@local-text-gray: #666;
@local-border-color: #ebeef5;

@color-text-main: #333;
@color-text-sub: #666;
@color-text-light: #999;
@border-color: #f2f4f7;

.green {
  color: @primary-green; // 在这里使用 Less 变量
}

.divider {
  border-top: 1px dashed #e0e3ed;
  margin: 12px 0;
}


.order-container {
  background-color: #f5f7fa;
  padding: 20px;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;

  .order-content {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
  }
}

.left-form {
  flex: 1;
  background: #fff;
  padding: 20px 30px;
  border-radius: 4px;

  .form-section {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #ebeef5;

    &.no-border {
      border: none;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      span {
        font-weight: normal;
        color: #909399;
        font-size: 14px;
        margin-left: 5px;
      }
    }

    .section-header {
      display: flex;
      align-items: center;

      .sub-tip {
        display: inline-flex; // 使用行内 flex 确保不占满整行
        align-items: center;
        font-size: 12px;
        color: #606266;
        margin-left: 10px;
        flex: 1;

        .name-info-popover {
          padding: 20px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;

          .popover-content {
            color: #333;
            line-height: 1.6;

            h4 {
              font-size: 18px;
              margin-bottom: 15px;
              color: #002d5c; // 深蓝色标题
            }

            .intro {
              font-size: 14px;
              margin-bottom: 20px;
            }

            h5 {
              font-size: 14px;
              font-weight: bold;
              margin: 15px 0 8px 0;
            }

            ul {
              padding-left: 18px;
              margin: 0;

              li {
                font-size: 13px;
                color: #444;
                margin-bottom: 12px;
                list-style-type: disc;

                &::marker {
                  color: #ccc; // 浅灰色圆点
                }
              }
            }
          }
        }
      }
    }

    .sub-text {
      font-size: 13px;
      color: #909399;
      margin-bottom: 15px;
    }
  }
}


.right-summary {
  width: 340px;

  .card {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  }

  .date-card {

    .date-val {
      font-size: 21px;
      font-weight: bold;
      color: #333;
    }

    .night-count-border {
      position: relative;
      margin-right: 10px;

      .night-count::after {
        content: "";
        position: absolute;
        right: -13px;
        top: 3px;
        bottom: 3px;
        width: 1px;
        background-color: #dcdfe6;
      }
    }

    .room-count {
      .el-icon {
        vertical-align: middle;
        margin-top: -2px;
      }

      line-height: 1;
    }
  }

  .display-flex-container {
    display: flex;
    align-items: center; // 确保子元素垂直居中对齐
    gap: 12px; // 设置两个区块之间的间距
  }

  .night-count {
    :deep(.section) {
      padding: 0;
    }

    // 如果 DatePickerSection 内部有文字，可以通过深度选择器控制
    :deep(.date-info .val) {
      font-size: 12px; // 调小日期文字
    }

    :deep(.tag-night) {
      font-size: 10px;
    }
  }

  .price-detail-card {
    width: 340px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid @local-border-color;
    padding: 16px;
    font-family: "PingFang SC", sans-serif;

    h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      color: #333;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 8px;
    }

    .daily-breakdown {
      position: relative;
      padding-left: 12px;
      margin: 10px 0;

      // 左侧垂直装饰线
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 4px;
        bottom: 4px;
        width: 1px;
        background-color: #dcdfe6;
      }

      .breakdown-item {
        font-size: 13px;
        color: @local-text-gray;
        margin-bottom: 6px;

        .gray-text {
          color: #999;
        }
      }
    }


    .final-row {
      align-items: baseline;

      .label {
        font-size: 16px;
        font-weight: bold;
      }

      .final-amount {
        font-size: 22px;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .info-sidebar {
    width: 340px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .card {
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .card-title {
      font-size: 18px;
      margin: 0 0 20px 0;
      color: @color-text-main;
    }

    // 时间轴样式核心实现
    .timeline {
      position: relative;
      padding-left: 4px;

      .timeline-item {
        position: relative;
        display: flex;
        padding-bottom: 24px;

        // 垂直连线
        &:not(:last-child)::after {
          content: "";
          position: absolute;
          left: 8px; // 对应 node 的中心位置
          top: 20px;
          bottom: 0;
          width: 1px;
          background-color: #e4e7ed;
        }

        .node {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          z-index: 1;
          background: #fff;

          .el-icon {
            font-size: 16px;
            color: @primary-green;
          }

          .dot {
            width: 8px;
            height: 8px;
            background-color: #e4e7ed;
            border-radius: 50%;
          }
        }

        .content {
          .status {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 4px;
          }

          .desc {
            font-size: 13px;
            color: @color-text-main;
          }
        }

        &.success {
          .status {
            color: @primary-green;
          }
        }

        &.disabled {
          padding-bottom: 10px;

          .status {
            color: @color-text-main;
          }
        }
      }
    }

    .policy-text {
      font-size: 12px;
      color: @color-text-light;
      line-height: 1.6;
      margin-top: 10px;

      p {
        margin: 8px 0;
      }
    }

    // 订房必读样式
    .must-read-card {
      .read-list {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
          position: relative;
          padding-left: 15px;
          font-size: 14px;
          color: @color-text-main;
          margin-bottom: 12px;
          line-height: 1.4;

          // 自定义列表圆点
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 7px;
            width: 4px;
            height: 4px;
            background-color: #000;
            border-radius: 50%;
          }
        }
      }

      .expand-btn {
        padding: 0;
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
        color: #111;

        &:hover {
          text-decoration: none;
        }
      }
    }

    // 修改 el-dialog 的标题样式
    :deep(.must-read-dialog) {
      border-radius: 8px;

      .el-dialog__header {
        margin-right: 0;
        padding: 20px 24px;
        border-bottom: 1px solid #f2f4f7;

        .el-dialog__title {
          font-weight: bold;
          font-size: 18px;
        }
      }

      .el-dialog__body {
        padding: 10px 24px 30px 24px;
      }
    }

    .dialog-content {
      .info-item {
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid #f2f4f7;
        line-height: 1.6;

        &:last-child {
          border-bottom: none;
        }

        .label {
          width: 100px; // 左侧标签固定宽度
          flex-shrink: 0;
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }

        .text {
          flex: 1;
          color: #666;
          font-size: 14px;
          text-align: justify; // 两端对齐，更美观
        }
      }
    }
  }

  .hotel-info {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;

    .hotel-img {
      width: 80px;
      height: 80px;
      border-radius: 4px;
    }

    h4 {
      font-size: 14px;
      margin: 0;
      line-height: 1.4;
    }

    .stars {
      color: #faad14;
      font-size: 12px;
    }

    .score {
      font-size: 12px;
      margin-top: 15px;

      span {
        color: #fff;
        background: #0086ff;
        padding: 2px 4px;
        border-radius: 4px;
      }
    }
  }

  .room-type {
    h5 {
      margin: 10px 0;
      font-size: 14px;
    }

    p {
      font-size: 12px;
      color: #606266;
      margin: 4px 0;
    }

    .shuttle {
      color: #333;
    }

    .cancel-tag {
      font-size: 12px;
      margin-top: 8px;
    }
  }

  .final-price {
    font-size: 20px;
    color: #0086ff;
    font-weight: bold;
  }
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  background-color: #3263ff;
  border-radius: 8px;
}

.agreement {
  font-size: 12px;
  color: #909399;
  text-align: center;
  margin-top: 15px;
}

.contact-info {
  display: flex;
  justify-content: space-between;
}
</style>