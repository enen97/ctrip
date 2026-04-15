<script setup>
import BottomContent from "./BottomContent.vue";
import HotelRanking from "./HotelRanking.vue";
import { ref, computed, onMounted, onUnmounted, reactive, watch } from "vue";
import { getHotels } from "@/api/hotel.js";
import { getCitys } from "@/api/city.js";
import { useRouter } from "vue-router"; // 1. 导入钩子函数

const router = useRouter(); // 2. 在 setup 顶层初始化实例

const slides = ref([]);
onMounted(async () => {
  // 加载右侧轮播图的推荐酒店
  try {
    let res = await getCitys();
    slides.value = res.data;
    console.log("打印数据:", slides.value);
  } catch (e) {
    console.log("加载右侧轮播图失败:", e);
  }
});
const activeIndex = ref(0);
const carouselRef = ref(null); // 用于操作轮播组件

const handleChange = (index) => {
  activeIndex.value = index;
};
// 点击自定义指示器切换轮播
const goToSlide = (index) => {
  carouselRef.value.setActiveItem(index); // Element Plus 提供的方法
};

// 搜索区内容
const searchCity = ref("重庆");
const showDropdown = ref(false);
const selectedCity = ref("");

// 国内热门城市
const domesticCities = [
  "北京",
  "上海",
  "天津",
  "重庆",
  "大连",
  "青岛",
  "西安",
  "南京",
  "苏州",
  "杭州",
  "厦门",
  "成都",
  "深圳",
  "广州",
  "三亚",
  "台北",
  "香港",
  "济南",
  "宁波",
  "沈阳",
  "武汉",
  "郑州",
];

// 海外热门城市
const overseasCities = [
  "首尔",
  "曼谷",
  "普吉岛",
  "东京",
  "新加坡",
  "大阪",
  "济州岛",
  "巴厘岛",
  "清迈",
  "哥打京那巴鲁",
  "京都",
  "吉隆坡",
  "芭堤雅",
  "那霸",
  "洛杉矶",
  "苏梅岛",
  "巴黎",
  "甲米",
  "拉斯维加斯",
  "伦敦",
];

// 选择城市
const selectCity = (city) => {
  selectedCity.value = city;
  searchCity.value = city;
  showDropdown.value = false;
};

// 处理失焦
const onBlur = () => {
  setTimeout(() => (showDropdown.value = false), 200);
};

// 选择住房日期
// --- 日历核心逻辑 ---
const showCalendar = ref(false);
const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const range = ref({
  start: new Date(2026, 3, 25),
  end: new Date(2026, 3, 30),
});

// 当前显示的月份参考（用于切换翻页）
const viewDate = ref(new Date(2026, 3, 1));

// 动态生成显示的月份（显示当前页和下一页，共两个月）
const calendarMonths = computed(() => {
  const m1 = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth(),
    1,
  );
  const m2 = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth() + 1,
    1,
  );
  return [
    { year: m1.getFullYear(), month: m1.getMonth() + 1 },
    { year: m2.getFullYear(), month: m2.getMonth() + 1 },
  ];
});

const changeMonth = (offset) => {
  viewDate.value = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth() + offset,
    1,
  );
};

const diffDays = computed(() => {
  if (!range.value.start || !range.value.end) return 0;
  const time = range.value.end - range.value.start;
  return Math.max(0, Math.ceil(time / (1000 * 60 * 60 * 24)));
});

const formatDate = (date) => {
  if (!date) return { date: "--", week: "--" };
  return {
    date: `${date.getMonth() + 1}月${date.getDate()}日`,
    week: weeks[date.getDay()],
  };
};

// 日历辅助函数
const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate();
const getFirstDayOfMonth = (y, m) => new Date(y, m - 1, 1).getDay();
const isHoliday = (m, d) => ["4-4", "4-5", "5-1"].includes(`${m}-${d}`);
const isToday = (y, m, day) => {
  const now = new Date();
  return (
    y === now.getFullYear() && m === now.getMonth() + 1 && day === now.getDate()
  );
};

const handleDateClick = (y, m, d) => {
  const selected = new Date(y, m - 1, d);
  if (!range.value.start || (range.value.start && range.value.end)) {
    range.value.start = selected;
    range.value.end = null;
  } else if (selected > range.value.start) {
    range.value.end = selected;
    // 选择完结束日期后，自动关闭日历（可选）
    // setTimeout(() => showCalendar.value = false, 300);
  } else {
    range.value.start = selected;
  }
};

const getDayClass = (y, m, d) => {
  const curr = new Date(y, m - 1, d);
  const startT = range.value.start?.getTime();
  const endT = range.value.end?.getTime();
  const currT = curr.getTime();

  return {
    "selected-bound": currT === startT || currT === endT,
    "in-range": startT && endT && currT > startT && currT < endT,
    "weekend-text": curr.getDay() === 0 || curr.getDay() === 6,
  };
};

const calendarContainer = ref(null); // 用于绑定日历的最外层容器

// 点击页面其他地方关闭日历
const handleOutsideClick = (event) => {
  // 如果日历是打开的，且点击的元素不在 calendarContainer 及其子元素内
  if (
    showCalendar.value &&
    calendarContainer.value &&
    !calendarContainer.value.contains(event.target)
  ) {
    // 还需要排除掉触发开关的那个按钮，防止逻辑冲突
    if (!event.target.closest(".date-status-bar")) {
      showCalendar.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener("mousedown", handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleOutsideClick);
});

// 住店人数和房间数下拉框
const isVisible = ref(false);
const bookingInfo = reactive({
  rooms: 1,
  adults: 1,
  children: 0,
});

const selectors = [
  { name: "房间", sub: "", key: "rooms" },
  { name: "成人", sub: "18岁及以上", key: "adults" },
  { name: "儿童", sub: "0-17岁", key: "children" },
];
const displayText = computed(() => {
  return `${bookingInfo.rooms}间, ${bookingInfo.adults + bookingInfo.children}位`;
});

const toggleDropdown = () => (isVisible.value = !isVisible.value);

const changeCount = (key, delta) => {
  bookingInfo[key] += delta;
};

const isMin = (key) => {
  if (key === "children") return bookingInfo[key] <= 0;
  return bookingInfo[key] <= 1; // 房间和成人最少为1
};

// 酒店级别下拉框
const isLevelVisible = ref(false);
const selectedLevels = ref([]); // 存放选中的星级，例如 ['三星', '五星']

const levelOptions = [
  "二星（钻）及以下",
  "三星（钻）",
  "四星（钻）",
  "五星（钻）",
];
// 顶部显示的文字逻辑
const levelDisplayText = computed(() => {
  if (selectedLevels.value.length === 0) return "不限";
  // 如果选得多，可以显示“已选X项”或者拼接前几个
  return selectedLevels.value.join("、");
});

// 切换选择
const toggleLevel = (item) => {
  const index = selectedLevels.value.indexOf(item);
  if (index > -1) {
    selectedLevels.value.splice(index, 1); // 存在则移除
  } else {
    selectedLevels.value.push(item); // 不存在则添加
  }
};

// 重置
const resetLevels = () => {
  selectedLevels.value = [];
};

// 确定
const confirmLevels = () => {
  isLevelVisible.value = false;
  // 这里可以 emit 事件给父组件发送数据
};

// 左侧轮播图
const banners = [
  {
    imageUrl: new URL(
      "@/assets/home/main/0zg5n12000rsu08w386D0.jpg",
      import.meta.url,
    ).href,
  },
  {
    imageUrl: new URL(
      "@/assets/home/main/0zg6t12000rrcp7e921BD.jpg",
      import.meta.url,
    ).href,
  },
  {
    imageUrl: new URL(
      "@/assets/home/main/0zg6u12000g3t6p6lAA2D.jpg",
      import.meta.url,
    ).href,
  },
];

const handleLeftBannerClick = (url) => {
  // 1. 使用 resolve 生成目标路由的 URL
  // 我们传参时，建议传图片的 URL（注意需要 encode 以防特殊字符破坏 URL）
  const routeUrl = router.resolve({
    path: "/ad-display",
    query: {
      img: url,
    },
  });

  // 2. 在新窗口打开
  window.open(routeUrl.href, "_blank");
};

const carouselRefLeft = ref(null);
const currentIndex = ref(0);

// 当轮播图自动滑动时，更新当前索引
const handleCarouselChange = (index) => {
  currentIndex.value = index;
};

// 点击右下角小点手动切换
const goToSlideLeft = (index) => {
  currentIndex.value = index;
  carouselRefLeft.value.setActiveItem(index);
};

// 酒店推荐
// 1. 基础状态
const recommendSelectedCity = ref("上海");
const showCityPanel = ref(false);
const currentPage = ref(0); // 0 表示前三张，1 表示后三张

const hotCities = ["上海", "北京", "广州", "三亚"];
const cityData = {
  domestic: {
    tabs: ["热门", "ABCDEF", "GHIJ", "KLMN", "PQRSTUVW", "XYZ"],
    groups: {
      热门: [
        "上海",
        "北京",
        "广州",
        "三亚",
        "杭州",
        "成都",
        "南京",
        "重庆",
        "深圳",
        "厦门",
        "西安",
        "武汉",
        "昆明",
        "长沙",
        "苏州",
        "哈尔滨",
        "澳门",
        "天津",
        "济南",
        "郑州",
      ],
      ABCDEF: [
        {
          label: "A",
          cities: ["安吉", "安顺", "安庆", "安阳", "鞍山", "安图", "阿克苏市"],
        },
        {
          label: "B",
          cities: [
            "北京",
            "北海",
            "保定",
            "白山",
            "蚌埠",
            "包头",
            "宝鸡",
            "百色",
            "白银",
          ],
        },
        {
          label: "C",
          cities: [
            "成都",
            "重庆",
            "长沙",
            "长春",
            "常州",
            "淳安",
            "长沙县",
            "潮州",
            "慈溪",
            "常熟",
            "澄江",
            "沧州",
            "赤峰",
            "常德",
            "长兴",
            "郴州",
            "巢湖",
            "崇左",
            "崇州",
            "昌黎",
            "察右后旗",
          ],
        },
        {
          label: "D",
          cities: [
            "大理市",
            "大连",
            "东莞",
            "德清",
            "都江堰",
            "大邑",
            "东阳",
            "大同",
            "德州",
            "东营",
            "丹东",
            "达州",
            "东方",
            "东山",
            "迭部",
            "儋州",
            "丹巴",
            "稻城",
            "达拉特旗",
            "敦煌",
            "登封",
          ],
        },
        { label: "E", cities: ["峨眉山", "恩施市", "鄂州", "额尔古纳"] },
        {
          label: "F",
          cities: [
            "福州",
            "佛山",
            "凤凰",
            "阜阳",
            "佛冈",
            "富蕴",
            "肥西",
            "丰宁",
            "肥东",
            "房县",
          ],
        },
      ],
      GHIJ: [
        {
          label: "G",
          cities: ["广州", "桂林", "贵阳", "赣州", "广元", "广安", "高碑店"],
        },
        {
          label: "H",
          cities: [
            "杭州",
            "哈尔滨",
            "合肥",
            "海口",
            "呼和浩特",
            "惠州",
            "湖州",
            "黄山",
            "淮安",
            "河源",
            "菏泽",
          ],
        },
        { label: "I", cities: ["伊犁", "伊春"] },
        {
          label: "J",
          cities: [
            "济南",
            "金华",
            "九江",
            "吉林",
            "嘉兴",
            "江门",
            "荆州",
            "焦作",
            "景德镇",
            "济宁",
          ],
        },
      ],
      KLMN: [
        { label: "K", cities: ["昆明", "开封", "喀什市", "库尔勒"] },
        {
          label: "L",
          cities: [
            "兰州",
            "丽江",
            "洛阳",
            "廊坊",
            "临沂",
            "柳州",
            "连云港",
            "拉萨",
            "乐山",
            "聊城",
            "龙岩",
          ],
        },
        {
          label: "M",
          cities: ["澳门", "绵阳", "梅州", "马鞍山", "茂名", "牡丹江"],
        },
        {
          label: "N",
          cities: [
            "南京",
            "南宁",
            "宁波",
            "南昌",
            "南通",
            "南阳",
            "南充",
            "宁德",
            "内江",
          ],
        },
      ],
      PQRSTUVW: [
        { label: "P", cities: ["莆田", "平顶山", "普洱", "攀枝花", "盘锦"] },
        {
          label: "Q",
          cities: [
            "青岛",
            "秦皇岛",
            "泉州",
            "衢州",
            "齐齐哈尔",
            "清远",
            "曲靖",
            "钦州",
          ],
        },
        { label: "R", cities: ["日照", "瑞安", "仁怀", "荣成"] },
        {
          label: "S",
          cities: [
            "上海",
            "深圳",
            "苏州",
            "三亚",
            "沈阳",
            "石家庄",
            "绍兴",
            "汕头",
            "上饶",
            "宿迁",
            "十堰",
          ],
        },
        {
          label: "T",
          cities: [
            "天津",
            "太原",
            "台州",
            "泰州",
            "唐山",
            "泰安",
            "通辽",
            "铁岭",
            "腾冲",
          ],
        },
        {
          label: "W",
          cities: [
            "武汉",
            "无锡",
            "温州",
            "潍坊",
            "威海",
            "芜湖",
            "乌鲁木齐",
            "梧州",
          ],
        },
      ],
      XYZ: [
        {
          label: "X",
          cities: [
            "西安",
            "厦门",
            "西宁",
            "徐州",
            "襄阳",
            "新乡",
            "邢台",
            "咸阳",
            "信阳",
            "宣城",
            "孝感",
          ],
        },
        {
          label: "Y",
          cities: [
            "烟台",
            "扬州",
            "宜昌",
            "银川",
            "岳阳",
            "盐城",
            "义乌",
            "宜宾",
            "榆林",
            "延安",
            "运城",
          ],
        },
        {
          label: "Z",
          cities: [
            "郑州",
            "珠海",
            "中山",
            "淄博",
            "漳州",
            "湛江",
            "株洲",
            "肇庆",
            "舟山",
            "遵义",
            "张家口",
          ],
        },
      ],
    },
  },
  overseas: {
    tabs: ["热门", "亚洲", "欧洲", "美洲", "非洲", "大洋洲"],
    groups: {
      热门: [
        "新加坡",
        "普吉岛",
        "东京",
        "曼谷",
        "大阪",
        "巴厘岛",
        "清迈",
        "京都",
        "苏梅岛",
        "那霸",
      ],
      亚洲: [
        "首尔",
        "吉隆坡",
        "胡志明市",
        "迪拜",
        "马尼拉",
        "雅加达",
        "河内",
        "名古屋",
        "福冈",
        "暹粒",
      ],
      欧洲: [
        "巴黎",
        "伦敦",
        "米兰",
        "法兰克福",
        "罗马",
        "巴塞罗那",
        "马德里",
        "苏黎世",
        "阿姆斯特丹",
        "维也纳",
      ],
      美洲: [
        "纽约",
        "洛杉矶",
        "旧金山",
        "多伦多",
        "温哥华",
        "芝加哥",
        "西雅图",
        "圣保罗",
        "墨西哥城",
      ],
      非洲: [
        "开罗",
        "内罗毕",
        "约翰内斯堡",
        "卡萨布兰卡",
        "卢克索",
        "毛里求斯",
      ],
      大洋洲: [
        "悉尼",
        "墨尔本",
        "奥克兰",
        "凯恩斯",
        "布里斯班",
        "珀斯",
        "黄金海岸",
        "皇后镇",
      ],
    },
  },
};

// 2. 模拟酒店数据 (实际开发中应从后端获取)
// 假设每个城市准备了 6 条数据

// 3. 计算当前显示的 3 个酒店
const displayHotels = ref([]);

watch(
  () => [recommendSelectedCity.value, currentPage.value],
  async () => {
    try {
      const res = await getHotels({
        address: recommendSelectedCity.value,
      });
      const cityData = res.data;
      const start = currentPage.value * 3;
      displayHotels.value = cityData.slice(start, start + 3);
    } catch (err) {
      console.error(err);
    }
  },
  { immediate: true },
);

// 4. 切换城市逻辑
const recommendSelectCity = (city) => {
  recommendSelectedCity.value = city;
  currentPage.value = 0; // 切换城市后重置到第一页
  showCityPanel.value = false;
  // console.log(city, showCityPanel.value, isMoreActive.value);
};

// 计算属性：控制“更多”按钮显示的文字
const moreButtonText = computed(() => {
  // 如果当前选中的城市不在快捷列表中，就显示该城市名，否则显示“更多”
  return hotCities.includes(recommendSelectedCity.value)
    ? "更多"
    : recommendSelectedCity.value;
});
// 计算属性：判断“更多”按钮是否应该高亮
const isMoreActive = computed(() => {
  // 只要选中的城市不是快捷列表里的那四个，就是“更多”里的城市被选中了
  return !hotCities.includes(recommendSelectedCity.value);
});

const activeType = ref("domestic"); // 'domestic' 或 'overseas'
const activeTab = ref("热门");

// 获取当前类型下的所有数据
const currentData = computed(() => cityData[activeType.value]);

// 判断当前是否是字母分组模式 (国内非热门频道)
const isAlphabetGroup = computed(() => {
  return activeType.value === "domestic" && activeTab.value !== "热门";
});

// 获取当前 Tab 下要渲染的城市数据
const currentCities = computed(() => {
  return currentData.value.groups[activeTab.value] || [];
});

const changeType = (type) => {
  activeType.value = type;
  activeTab.value = "热门"; // 切换大类时重置 Tab
};

const gotoHotel = (id) => {
  router.push({
    path: "/hotels",
    query: { hotelId: id },
  });
};
</script>

<template>
  <div>
    <div class="home-content">
      <div class="content-left">
        <div class="hotel-search">
          <div class="hotel-search-top">
            <div class="hotel-search-top-bgimg"></div>
            <div class="hotel-search-top-left">预订酒店</div>
            <img
              src="../../assets/home/main/easy-stay.png"
              class="hotel-search-top-right"
            />
          </div>
          <div class="hotel-search-container">
            <div class="hotel-search-container-up">
              <div class="city-selector">
                <label>目的地/酒店名称</label>
                <input
                  type="text"
                  v-model="searchCity"
                  placeholder="城市、机场、区域、地标或酒店名称"
                  @focus="showDropdown = true"
                  @blur="onBlur"
                />
                <!-- 下拉框 -->
                <div v-if="showDropdown" class="dropdown">
                  <!-- 国内热门城市 -->
                  <div class="group">
                    <div class="group-title">国内热门城市</div>
                    <ul class="city-grid">
                      <li
                        v-for="city in domesticCities"
                        :key="city"
                        @mousedown.prevent="selectCity(city)"
                      >
                        {{ city }}
                      </li>
                    </ul>
                  </div>

                  <!-- 海外热门城市 -->
                  <div class="group">
                    <div class="group-title">海外热门城市</div>
                    <ul class="city-grid">
                      <li
                        v-for="city in overseasCities"
                        :key="city"
                        @mousedown.prevent="selectCity(city)"
                      >
                        {{ city }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="hotel-calendar-container" ref="calendarContainer">
                <div class="date-status-bar" @click="showCalendar = true">
                  <div class="date-item">
                    <span class="label">入住</span>
                    <div class="date-val">
                      <span class="main">{{
                        formatDate(range.start).date
                      }}</span>
                      <span class="sub"
                        >({{ formatDate(range.start).week }})</span
                      >
                    </div>
                  </div>

                  <div class="duration">
                    <div class="line"></div>
                    <span class="count">{{ diffDays }}晚</span>
                    <div class="line"></div>
                  </div>

                  <div class="date-item text-right">
                    <span class="label">退房</span>
                    <div class="date-val">
                      <span class="main">{{ formatDate(range.end).date }}</span>
                      <span class="sub"
                        >({{ formatDate(range.end).week }})</span
                      >
                    </div>
                  </div>
                </div>

                <div v-if="showCalendar" class="calendar-modal">
                  <div class="calendar-header">
                    <span class="nav-btn" @click="changeMonth(-1)">&lt;</span>
                    <span class="title">选择日期</span>
                    <span class="nav-btn" @click="changeMonth(1)">&gt;</span>
                  </div>

                  <div class="calendar-content">
                    <div
                      v-for="item in calendarMonths"
                      :key="`${item.year}-${item.month}`"
                      class="month-section"
                    >
                      <h3 class="month-title">
                        {{ item.year }}年{{ item.month }}月
                      </h3>
                      <div class="week-header">
                        <span
                          v-for="w in weeks"
                          :key="w"
                          :class="{ weekend: w === '周日' || w === '周六' }"
                          >{{ w }}</span
                        >
                      </div>
                      <div class="days-grid">
                        <div
                          v-for="empty in getFirstDayOfMonth(
                            item.year,
                            item.month,
                          )"
                          :key="'e' + empty"
                          class="empty-cell"
                        ></div>
                        <div
                          v-for="day in getDaysInMonth(item.year, item.month)"
                          :key="day"
                          class="day-cell"
                          :class="getDayClass(item.year, item.month, day)"
                          @click="handleDateClick(item.year, item.month, day)"
                        >
                          <span class="day-num">{{ day }}</span>
                          <span
                            v-if="isHoliday(item.month, day)"
                            class="holiday-dot"
                          ></span>
                          <span
                            v-if="isToday(item.year, item.month, day)"
                            class="today-text"
                            >今天</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="calendar-footer">
                    <div class="selected-range">
                      <span class="date">{{
                        formatDate(range.start).date
                      }}</span>
                      <span class="week"
                        >({{ formatDate(range.start).week }})</span
                      >
                      <span class="split">－</span>
                      <span class="date">{{ formatDate(range.end).date }}</span>
                      <span class="week"
                        >({{ formatDate(range.end).week }})</span
                      >
                      <strong class="nights">({{ diffDays }}晚)</strong>
                    </div>
                    <p class="tips">入住和退房时间均为酒店当地时间。</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="hotel-search-container-down">
              <div class="hotel-search-container-left">
                <div class="hotel-people" @click="toggleDropdown">
                  <span>房间及住客</span>
                  <div class="value">
                    {{ displayText }}
                  </div>
                  <span class="arrow" :class="{ up: isVisible }"></span>
                </div>
                <div v-if="isVisible" class="dropdown-panel">
                  <div class="row" v-for="item in selectors" :key="item.key">
                    <div class="text-group">
                      <span class="name">{{ item.name }}</span>
                      <span class="sub">{{ item.sub }}</span>
                    </div>
                    <div class="stepper">
                      <button
                        @click="changeCount(item.key, -1)"
                        :disabled="isMin(item.key)"
                      >
                        -
                      </button>
                      <span>{{ bookingInfo[item.key] }}</span>
                      <button @click="changeCount(item.key, 1)">+</button>
                    </div>
                  </div>
                  <div class="footer">
                    <span class="confirm-btn" @click="isVisible = false"
                      >确定</span
                    >
                  </div>
                </div>

                <div
                  class="hotel-level"
                  @click="isLevelVisible = !isLevelVisible"
                >
                  <span>酒店级别</span>
                  <div class="text-ellipsis">{{ levelDisplayText }}</div>
                  <span class="arrow" :class="{ up: isLevelVisible }"></span>
                </div>
                <div v-if="isLevelVisible" class="level-dropdown">
                  <ul class="option-list">
                    <li
                      v-for="item in levelOptions"
                      :key="item"
                      :class="{ active: selectedLevels.includes(item) }"
                      @click="toggleLevel(item)"
                    >
                      {{ item }}
                    </li>
                  </ul>

                  <div class="footer-btns">
                    <span class="btn-reset" @click="resetLevels">重置</span>
                    <span class="btn-confirm" @click="confirmLevels">确定</span>
                  </div>
                </div>

                <div class="hotel-keyword">
                  <span>关键词（选填）</span>
                  <input type="text" placeholder="机场/火车站/酒店名称..." />
                </div>
              </div>
              <button class="search-btn">
                <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                >
                  <path
                    d="M227.2 210.133 192 176c12.8-16 21.333-36.267 21.333-58.667 0-50.133-40.533-90.666-90.666-90.666S32 67.2 32 117.333C32 167.467 72.533 208 122.667 208c22.4 0 42.666-7.467 58.666-21.333l35.2 35.2c3.2 3.2 8.534 3.2 11.734 0 2.133-3.2 2.133-8.534-1.067-11.734zM48 117.333c0-41.6 33.067-74.666 74.667-74.666s74.666 33.066 74.666 74.666c0 41.6-33.066 74.667-74.666 74.667S48 158.933 48 117.333z"
                    class="search_svg__transform-group"
                  ></path>
                </svg>
                搜索
              </button>
            </div>
          </div>
        </div>
        <div class="carousel-box-left">
          <div class="banner-wrapper">
            <el-carousel
              trigger="click"
              arrow="never"
              indicator-position="none"
              ref="carouselRefLeft"
              @change="handleCarouselChange"
            >
              <el-carousel-item
                v-for="(item, index) in banners"
                :key="index"
                @click="handleLeftBannerClick(item.imageUrl)"
              >
                <img :src="item.imageUrl" class="banner-img" alt="banner" />
              </el-carousel-item>
            </el-carousel>

            <div class="custom-indicators">
              <span
                v-for="(_, index) in banners"
                :key="index"
                class="indicator-dot"
                :class="{ active: currentIndex === index }"
                @click="goToSlideLeft(index)"
              ></span>
            </div>
          </div>
        </div>
        <div class="ai-travel-link">
          <div class="ai-travel-link-left">
            <img src="../../assets/home/main/tripplanner_icon.png" alt="" />
            <div class="title">AI行程助手</div>
            <div class="content">
              <span>一站式打造完美行程</span>
              <img src="../../assets/home/main/tripplanner_arrow.png" alt="" />
            </div>
          </div>
          <div class="ai-travel-link-right">
            <img src="../../assets/home/main/tripmap_icon.png" alt="" />
            <div class="title">旅行地图</div>
            <div class="content">
              <span>探索 · 好去处</span>
              <img src="../../assets/home/main/tripmap_arrow.png" alt="" />
            </div>
          </div>
        </div>

        <div class="hotel-recommendation">
          <div class="header">
            <h2 class="title">酒店<span class="highlight">推荐</span></h2>
            <div class="city-tabs">
              <button
                v-for="city in hotCities"
                :key="city"
                :class="{ active: recommendSelectedCity === city }"
                @click="recommendSelectCity(city)"
              >
                {{ city }}
              </button>
              <div
                :class="['tab-btn', 'more-dropdown', { active: showCityPanel }]"
              >
                <div
                  :class="['more-style', { active: isMoreActive }]"
                  @click="showCityPanel = !showCityPanel"
                >
                  {{ moreButtonText }}
                </div>
                <span class="arrow-down" :class="{ up: showCityPanel }"></span>
                <div v-if="showCityPanel" class="city-selector-card">
                  <div class="side-tabs">
                    <div
                      class="tab-item"
                      :class="{ active: activeType === 'domestic' }"
                      @click="changeType('domestic')"
                    >
                      国内<br />(含港澳台)
                    </div>
                    <div
                      class="tab-item"
                      :class="{ active: activeType === 'overseas' }"
                      @click="changeType('overseas')"
                    >
                      海外
                    </div>
                  </div>

                  <div class="main-content">
                    <div class="index-bar">
                      <span
                        v-for="tab in currentData.tabs"
                        :key="tab"
                        class="index-item"
                        :class="{ active: activeTab === tab }"
                        @click="activeTab = tab"
                      >
                        {{ tab }}
                      </span>
                    </div>

                    <div class="city-content-wrapper">
                      <div v-if="!isAlphabetGroup" class="city-grid">
                        <div
                          v-for="city in currentCities"
                          :key="city"
                          class="city-name"
                          @click="recommendSelectCity(city)"
                        >
                          {{ city }}
                        </div>
                      </div>

                      <div v-else class="alphabet-list">
                        <div
                          v-for="group in currentCities"
                          :key="group.label"
                          class="alphabet-row"
                        >
                          <div class="label">
                            <strong>{{ group.label }}</strong>
                          </div>
                          <div class="cities">
                            <span
                              v-for="city in group.cities"
                              :key="city"
                              @click="recommendSelectCity(city)"
                            >
                              {{ city }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hotel-container">
            <button
              v-if="currentPage === 1"
              class="nav-btn prev"
              @click="currentPage = 0"
            >
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.75 20.35c.3.25.8.25 1.05-.1.25-.3.25-.8-.1-1L7.1 12.2c-.1-.1-.1-.25-.05-.3l8.65-7.1c.3-.25.35-.75.1-1-.25-.3-.75-.35-1.05-.1l-8.8 7.2c-.65.6-.65 1.75.2 2.4l8.6 7.05z"
                  fill="#34475e"
                  class="left_svg__transform-group"
                ></path>
              </svg>
            </button>

            <div class="hotel-list">
              <div
                v-for="hotel in displayHotels"
                :key="hotel.id"
                class="hotel-card"
                @click="gotoHotel(hotel.id)"
              >
                <div class="img-wrapper">
                  <img :src="hotel.img" :alt="hotel.name" />
                </div>
                <div class="info">
                  <h3>{{ hotel.name }}</h3>
                  <div class="score-row">
                    <span class="score">{{ hotel.score }}</span>
                    <span class="tag">超棒</span>
                    <span class="reviews">{{ hotel.reviews }}条点评</span>
                  </div>
                  <div class="price">¥{{ hotel.price }}</div>
                </div>
              </div>
            </div>

            <button
              v-if="currentPage === 0"
              class="nav-btn next"
              @click="currentPage = 1"
            >
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.825 20.61c-.303.297-.753.292-1.048-.16-.297-.303-.293-.753.16-1.049l8.47-6.966c.152-.149.153-.299.005-.45l-8.33-6.982c-.298-.304-.293-.754-.14-1.052.303-.297.753-.293 1.051-.14l8.479 7.135c.892.76.882 1.81-.026 2.55l-8.62 7.114z"
                  fill="#34475e"
                  class="right_svg__transform-group"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="seasonal-hot-picks">
          <h2 class="title">当季<span class="highlight">热推</span></h2>
          <HotelRanking></HotelRanking>
        </div>
      </div>

      <div class="content-right">
        <div class="carousel-box">
          <el-carousel
            ref="carouselRef"
            :interval="5000"
            height="680px"
            arrow="never"
            trigger="click"
            indicator-position="none"
            @change="handleChange"
            class="el-carousel-pointer"
          >
            <el-carousel-item v-for="slide in slides" :key="slide.id">
              <div
                class="carousel-item"
                :style="{ backgroundImage: `url(${slide.image})` }"
                @click="
                  handleLeftBannerClick(
                    '../src/assets/home/main/0701y12000qrh288vB89B.jpg',
                  )
                "
              >
                <!-- 左上角天气 -->
                <div class="weather-box">
                  <div class="city">{{ slide.city }}必住酒店攻略</div>
                  <div class="temp">{{ slide.weather }}</div>

                  <!-- 自定义指示器 -->
                  <div class="custom-indicator">
                    <span
                      v-for="(s, i) in slides"
                      :key="s.id"
                      :class="['indicator-dot', { active: i === activeIndex }]"
                      @click.stop="goToSlide(i)"
                    ></span>
                  </div>
                </div>
                <!-- 右上角酒店推荐 -->
                <div class="hotel-box">
                  <div
                    class="hotel-item"
                    v-for="hotel in slide.hotels"
                    :key="hotel.name"
                    @click.stop="gotoHotel(hotel.id)"
                  >
                    <img :src="hotel.img" class="hotel-img" />
                    <div class="hotel-info">
                      <div class="hotel-name">{{ hotel.name }}</div>
                      <div class="hotel-price">
                        <span>￥</span>{{ hotel.price }}<span>起</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <a href="https://ct.ctrip.com/official?ctm_ref=xckbb" target="_blank">
            <img
              class="content-right-img"
              src="../../assets/home/main/btr_1281.42530957.png"
            />
          </a>
        </div>
      </div>
    </div>

    <BottomContent></BottomContent>
  </div>
</template>

<style scoped lang="less">
// 变量定义
@primary-color: #0084ff;
@bg-light-blue: #e6f3ff;
@text-gray: #999;
@text-main: #333;
@border-color: #eee;
@bg-gray-light: #dadfe6;
.carousel-box {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 428px;
}
.el-carousel-pointer {
  cursor: pointer;
}

.content-right-img {
  cursor: pointer;
  margin-top: 10px;
  height: 80px;
}

.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}

/* 左上角天气 */
.weather-box {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  border-radius: 12px;
  color: white;
  text-align: left;
}

.weather-box .city {
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  height: 20px;
  margin-bottom: 3px;
}

.weather-box .temp {
  font-size: 14px;
  line-height: 18px;
  height: 18px;
  margin-top: 4px;
}

/* 右上角酒店推荐 */
.hotel-box {
  position: absolute;
  top: 20px;
  right: -10px;
  width: 220px;
  border-radius: 12px;
  padding: 12px;
}

.hotel-item {
  cursor: pointer;
  display: flex;
  padding: 4px;
  height: 52px;
  width: 180px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 12px;
}

.hotel-item:last-child {
  margin-bottom: 0;
}

.hotel-img {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
}

.hotel-info {
  display: flex;
  flex-direction: column;
}

.hotel-name {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-shadow: rgba(0, 0, 0, 0.4) 0 0 2px;
}

.hotel-price {
  span {
    font-size: 12px;
    font-weight: normal;
  }
  font-size: 14px;
  color: #fff;
  font-weight: 800;
  margin-top: 4px;
  text-shadow: rgba(0, 0, 0, 0.4) 0 0 2px;
}

/* 自定义指示器 */
.custom-indicator {
  margin-top: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
}

.indicator-dot {
  cursor: pointer;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  transition: all 0.5s;
}

.indicator-dot.active {
  width: 48px; /* 变成长椭圆 */
  border-radius: 10px; /* 圆角长椭圆 */
  background-color: white;
}

.home-content {
  display: flex;
  .content-left {
    width: 100%;
    border-radius: 10px;
    margin-right: 10px;
    .hotel-search {
      margin-bottom: 20px;
      height: 264px;
      border-radius: 10px;
      border: 1px solid #d6ecff;
      padding: 0 16px;
      background: linear-gradient(
        90deg,
        rgb(115, 188, 250) 0%,
        rgb(255, 255, 255) 100%,
        rgb(255, 255, 255) 100%
      );
      .hotel-search-top {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 76px;
        .hotel-search-top-bgimg {
          position: absolute;
          background-image: url("../../assets/home/main/homepage-hotel-searchbox-background.png");
          width: 380px;
          height: 100px;
          left: -16px;
          top: 0px;
          background-size: contain;
        }
        .hotel-search-top-left {
          position: relative;
          color: #fff;
          font-size: 24px;
        }
        .hotel-search-top-right {
          width: 157px;
          height: 28px;
        }
      }
      .hotel-search-container {
        position: relative;
        .hotel-search-container-up {
          display: flex;
          padding: 10px;
          height: 74px;
          background-color: #fff;
          margin-bottom: 12px;
          border-radius: 10px;
          border: 1px solid #d6ecff;
          // 城市选择
          .city-selector {
            position: relative;
            width: 50%;
            margin-left: 4px;
            flex: 1;
            label {
              position: absolute;
              top: 0px;
              left: 0px;
              font-size: 14px;
              color: #666;
            }
            input {
              width: 100%;
              height: 100%;
              padding: 28px 14px 0 0;
              color: #333;
              font-size: 16px;
              font-weight: 700;
              border-radius: 2px;
              box-sizing: border-box;
            }
            .dropdown {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              border: 1px solid #e0e0e0;
              background: #fff;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
              z-index: 100;
              margin-top: 2px;
              font-size: 14px;
              .group {
                padding: 10px 12px;
                border-bottom: 1px solid #f0f0f0;
                .group-title {
                  font-size: 12px;
                  color: #999;
                  margin-bottom: 6px;
                }
              }
              .group:last-child {
                border-bottom: none;
              }
              .city-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 6px 12px;
                li {
                  padding: 6px 0;
                  text-align: center;
                  cursor: pointer;
                }
                li:hover {
                  background-color: #f0f0f0;
                  border-radius: 2px;
                }
              }
            }
          }
          .city-selector::after {
            content: "";
            position: absolute;
            height: 42px;
            width: 1px;
            top: 4px;
            right: 1px;
            background-color: #dadfe6;
          }
          // 日期选择
          .hotel-calendar-container {
            flex: 2;
            position: relative;
            margin-left: 10px;
            width: 50%;
            height: 100%;

            // 1. 顶部栏样式
            .date-status-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: white;
              border-radius: 8px;
              cursor: pointer;

              .date-item {
                .label {
                  color: @text-gray;
                  font-size: 14px;
                  display: block;
                }
                .date-val {
                  .main {
                    font-size: 18px;
                    font-weight: bold;
                    margin-right: 4px;
                  }
                  .sub {
                    color: #666;
                    font-size: 16px;
                  }
                }
                &.text-right {
                  text-align: right;
                }
              }

              .duration {
                width: 100px;
                display: flex;
                align-items: center;
                color: #666;
                font-size: 13px;

                .line {
                  width: 20px;
                  height: 1px;
                  background: #ddd;
                  margin: 0 8px;
                }
              }
            }

            // 2. 日历弹窗
            .calendar-modal {
              position: absolute;
              top: 63px;
              left: -254px;
              width: 600px;
              background: white;
              border-radius: 10px;
              z-index: 100;
              display: flex;
              flex-direction: column;

              .calendar-header {
                padding: 15px;
                text-align: center;
                border-bottom: 1px solid @border-color;
                position: relative;
                font-weight: bold;

                .title {
                  margin: 0 115px;
                }

                .close {
                  position: absolute;
                  left: 15px;
                  font-size: 20px;
                  color: @text-main;
                }
              }

              .calendar-content {
                display: flex;
                gap: 55px;
                justify-content: space-between;
                padding: 0 20px;
                flex: 1;
                overflow-y: auto;

                .month-section {
                  flex: 50%;

                  .month-title {
                    text-align: center;
                    padding: 20px 0 10px;
                    font-size: 16px;
                    color: @text-main;
                  }

                  .week-header,
                  .days-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    text-align: center;
                  }

                  .week-header {
                    span {
                      padding: 10px 0;
                      font-size: 13px;
                      color: @text-main;
                      &.weekend {
                        color: @primary-color;
                      }
                    }
                  }

                  .days-grid {
                    .day-cell {
                      height: 55px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      position: relative;
                      cursor: pointer;
                      font-size: 15px;

                      // 基础文字颜色
                      .day-num {
                        z-index: 2;
                      }

                      // 节假日小点
                      .holiday-dot {
                        width: 4px;
                        height: 4px;
                        background: @text-gray;
                        border-radius: 50%;
                        margin-top: 2px;
                        position: absolute;
                        top: 8px;
                        right: 8px;
                      }

                      // 状态类
                      &.weekend-text {
                        color: @primary-color;
                      }

                      // 选中区间（浅蓝背景）
                      &.in-range {
                        background-color: @bg-light-blue;
                      }

                      // 选中端点（深蓝方块）
                      &.selected-bound {
                        background-color: @primary-color !important;
                        color: white !important;
                        border-radius: 4px;
                      }
                    }
                  }
                }
              }

              .calendar-footer {
                padding: 15px;
                border-top: 1px solid @border-color;
                text-align: center;
                font-size: 15px;

                strong {
                  color: @text-main;
                  margin-left: 5px;
                }

                .hint {
                  color: @text-gray;
                  font-size: 12px;
                  margin-top: 8px;
                }
              }
            }
          }
        }
        .hotel-search-container-down {
          display: flex;
          justify-content: space-between;
          .hotel-search-container-left {
            display: flex;
            height: 74px;
            width: 540px;
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            border: 1px solid #d6ecff;
            > div > span {
              font-size: 14px;
              color: #666;
            }
            .hotel-people {
              position: relative;
              width: 130px;
              &::after {
                content: "";
                position: absolute;
                width: 1px;
                height: 42px;
                top: 4px;
                right: 0px;
                background-color: #dadfe6;
              }
              .value {
                font-weight: bold;
                font-size: 18px;
              }
              .arrow {
                position: absolute;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #333333;
                border-radius: 2px;
                top: 35px;
                right: 17px;
                transition: transform 0.3s ease;
                &.up {
                  border-bottom: 7px solid #0088ee;
                  transform: rotate(180deg);
                }
              }
            }
            .dropdown-panel {
              position: absolute;
              left: 0;
              top: 100%;
              border-radius: 10px;
              width: 280px;
              background: #fff;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              padding: 15px;
              z-index: 10;
              .row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                align-items: center;
                .stepper {
                  button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;

                    width: 20px;
                    height: 20px;
                    border-radius: 20px;
                    margin: 0 10px;
                  }
                }
              }
              .footer {
                display: flex;
                align-items: center;
                justify-content: end;
                height: 37px;
                border-top: 1px solid @bg-gray-light;
                .confirm-btn {
                  margin-top: 12px;
                  color: @primary-color;
                }
              }
            }

            .hotel-level {
              position: relative;
              width: 180px;
              padding-left: 10px;
              &::after {
                content: "";
                position: absolute;
                width: 1px;
                height: 42px;
                top: 4px;
                right: 0px;
                background-color: #dadfe6;
              }

              .text-ellipsis {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 18px;
                font-weight: bold;
                // 替换 @text-main 为 #333
                color: #333;
                margin-right: 5px;
              }

              .arrow {
                position: absolute;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #333333;
                border-radius: 2px;
                top: 35px;
                right: 17px;
                transition: transform 0.3s ease;
                &.up {
                  border-bottom: 7px solid #0088ee;
                  transform: rotate(180deg);
                }
              }
            }
            .level-dropdown {
              position: absolute;
              width: 220px;
              background: #fff;
              z-index: 100;
              margin-top: 5px;
              top: 155px;
              left: 138px;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              padding: 15px;

              .option-list {
                list-style: none;
                padding: 10px 0;
                margin: 0;

                li {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 12px 20px;
                  font-size: 16px;
                  color: #666;
                  cursor: pointer;

                  &.active {
                    // 替换 @primary-blue 为 #0086ff
                    color: #0086ff;
                  }

                  .check-icon {
                    font-weight: bold;
                    font-size: 18px;
                    // 替换 @primary-blue 为 #0086ff
                    color: #0086ff;
                  }
                }
              }

              .footer-btns {
                display: flex;
                justify-content: space-between;
                padding: 15px 20px;
                // 替换 @border-color 为 #dadfe6
                border-top: 1px solid #dadfe6;

                span {
                  cursor: pointer;
                  font-size: 16px;
                  // 替换 @primary-blue 为 #0086ff
                  color: #0086ff;
                }
                .btn-confirm {
                  font-weight: bold;
                }
              }
            }

            .hotel-keyword {
              flex: 1;
              padding-left: 10px;
              font-size: 16px;
              color: #333;
              font-weight: 600;
            }
          }
          .search-btn {
            width: 150px;
            background: linear-gradient(90deg, #3298db, #0099ff); /* 渐变蓝 */
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 10px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: background 0.3s;
          }

          .search-btn:hover {
            background: linear-gradient(90deg, #1c86ee, #0088ee);
          }
        }
      }
    }
    .carousel-box-left {
      cursor: pointer;
      .banner-wrapper {
        margin-bottom: 10px;
        height: 100px;
        background-color: gray;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        .banner-img {
          width: 100%;
        }

        // 右下角指示器容器
        .custom-indicators {
          position: absolute;
          bottom: 12px;
          right: 20px;
          display: flex;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 20px;
          z-index: 10;

          .indicator-dot {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background: rgba(255, 255, 255, 0.8);
            }

            &.active {
              width: 25px; // 激活时变长，模仿图中效果
              border-radius: 4px;
              background: #fff;
            }
          }
        }
      }
    }

    .ai-travel-link {
      display: flex;
      // gap: 10px;
      justify-content: space-between;
      margin-bottom: 10px;
      height: 72px;
      > div {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 10px;
        img {
          margin-right: 10px;
          width: 35px;
          height: 35px;
        }
        .title {
          width: 117px;
          color: #000;
          font-size: 20px;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: end;
          width: 180px;
          color: #555;
          font-size: 14px;
          img {
            margin-left: 10px;
            width: 18px;
            height: 18px;
          }
        }
      }
      .ai-travel-link-left {
        background-image: url("../../assets/home/main/tripplanner_bg.png");
        background-size: cover;
        border-radius: 10px;
        border: 1px solid #d6ecff;
      }
      .ai-travel-link-right {
        background-image: url("../../assets/home/main/tripmap_bg.png");
        background-size: cover;
        border-radius: 10px;
        border: 1px solid #d6ecff;
      }
    }
    .hotel-recommendation {
      margin-bottom: 10px;
      height: 380px;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .title {
          font-size: 20px;
          font-weight: 500;
          color: #333;
          .highlight {
            color: #f70;
            font-size: 20px;
            font-weight: 500;
          }
        }

        .city-tabs {
          display: flex;
          gap: 10px;
          position: relative;
          > button {
            width: 62px;
            height: 33px;
            border-radius: 5px;
            border: solid 1px #d5d5d5;
            background-color: #fff;
            cursor: pointer;
          }

          button.active {
            border-color: #0086ff;
            color: #0086ff;
          }
          .more-dropdown {
            position: relative;
            &.active {
              color: #0086ff;
              * {
                color: #333;
                font-size: 14px;
              }
            }
            .more-style {
              display: flex;
              align-items: center;
              padding-left: 13px;
              padding-right: 20px;
              height: 33px;
              border-radius: 5px;
              border: solid 1px #d5d5d5;
              margin-right: 4px;
              cursor: pointer;
              &.active {
                border-color: #0086ff;
                color: #0086ff;
              }
            }
          }
          .arrow-down {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 7px solid #333333;
            border-radius: 2px;
            top: 16px;
            right: 14px;
            transition: transform 0.3s ease;
            &.up {
              border-bottom: 7px solid #0088ee;
              transform: rotate(180deg);
            }
          }
        }
      }

      .hotel-container {
        position: relative;
        display: flex;
        align-items: center;

        .hotel-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;

          .hotel-card {
            overflow: hidden;
            cursor: pointer;
            border-radius: 10px;
            box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.06);
            height: 100%;
            .img-wrapper {
              overflow: hidden;
            }
            &:hover {
              box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.12);
              img {
                transform: scale(1.1);
              }
            }
            img {
              width: 250px;
              height: 170px;
              object-fit: cover;
              transition: transform 0.3s ease 0s;
            }
            .info {
              padding: 10px;
              h3 {
                font-size: 16px;
                color: #333;
                font-weight: 600;
                margin-bottom: 10px;
              }
              .score {
                display: inline-block;
                background: #007fe9;
                width: 34px;
                color: #fff;
                font-size: 14px;
                text-align: center;
                border-radius: 3px 3px 8px 3px;
                font-weight: 600;
              }
              .tag {
                margin-left: 4px;
                color: #0086f6;
                font-size: 14px;
                font-weight: 600;
              }
              .reviews {
                color: #333;
                font-size: 14px;
                margin-left: 6px;
                font-weight: 400;
              }
              .price {
                display: flex;
                justify-content: end;
                align-items: end;
                height: 70px;
                font-size: 20px;
                font-weight: 600;
                color: #0086f6;
              }
            }
          }
        }

        .nav-btn {
          position: absolute;
          top: 30%;
          z-index: 10;
          width: 30px;
          height: 45px;
          background: #fff;
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.1);

          &.prev {
            left: 0;
            border-radius: 0 10px 10px 0;
          }
          &.next {
            right: 0;
            border-radius: 10px 0 0 10px;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.5);
          }
        }
      }

      .city-selector-card {
        position: absolute;
        top: 40px;
        right: 0;
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 100;
        padding: 15px;
        display: flex;
        width: 720px; /* 根据实际需要调整 */
        border-radius: 4px;
        overflow: hidden;
        font-family: "Microsoft YaHei", sans-serif;

        // 左侧蓝色侧边栏
        .side-tabs {
          width: 110px;
          background-color: #f5f7fa;
          display: flex;
          flex-direction: column;

          .tab-item {
            padding: 15px 10px;
            text-align: center;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            line-height: 1.4;

            &.active {
              background-color: #0086ff;
              color: #fff;
            }
          }
        }

        // 右侧内容区
        .main-content {
          flex: 1;
          padding: 0 20px 20px 20px;

          // 顶部索引栏
          .index-bar {
            display: flex;
            border-bottom: 1px solid #edf0f5;
            margin-bottom: 20px;

            .index-item {
              padding: 15px 12px;
              font-size: 15px;
              color: #333;
              cursor: pointer;
              position: relative;

              &:hover {
                color: #0086ff;
              }

              &.active {
                color: #0086ff;
                font-weight: bold;

                &::after {
                  content: "";
                  position: absolute;
                  bottom: 0;
                  left: 20%;
                  width: 60%;
                  height: 2px;
                  background-color: #0086ff;
                }
              }
            }
          }

          // 城市网格
          .city-content-wrapper {
            padding-top: 10px;

            // 基础网格样式 (图一、图二)
            .city-grid {
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              row-gap: 15px;
              .city-name {
                cursor: pointer;
                font-size: 14px;
                &:hover {
                  color: #0086ff;
                }
              }
            }

            // 字母分组样式 (图三)
            .alphabet-list {
              .alphabet-row {
                display: flex;
                margin-bottom: 20px;

                .label {
                  width: 30px;
                  font-size: 14px;
                  color: #333;
                  padding-top: 2px;
                }

                .cities {
                  flex: 1;
                  display: flex;
                  flex-wrap: wrap;
                  gap: 15px 25px; // 行间距 15px, 列间距 25px

                  span {
                    min-width: 50px;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover {
                      color: #0086ff;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .seasonal-hot-picks {
      margin-bottom: 10px;
      .title {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 500;
        color: #333;
        .highlight {
          color: #f70;
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
