const fs = require("fs");

// 这里放置你提供的 cityData 对象
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

// 1. 提取所有不重复的城市名
const extractAllCities = (data) => {
  let cities = new Set();
  const processGroup = (group) => {
    group.forEach((item) => {
      if (typeof item === "string") {
        cities.add(item);
      } else if (item.cities) {
        item.cities.forEach((c) => cities.add(c));
      }
    });
  };
  Object.values(data.domestic.groups).forEach(processGroup);
  Object.values(data.overseas.groups).forEach(processGroup);
  return Array.from(cities);
};

const allCities = extractAllCities(cityData);

// --- 核心修改部分：基于 CDN 规律的配置 ---

// 真实的携程图片 ID 池（涵盖了商务、度假、房间、外立面等不同风格）
const imgIdPool = [
  "200q0y000000lkxzfCD29", // 商务感
  "0201k12000h4e8yaa5BE0", // 现代简约
  "1mc0512000p9q5p6r7B37", // 城市天际线
  "02066120009em3wa5DF4C", // 度假泳池
  "1mc5o12000cse63ck4FC8", // 豪华大堂
  "02261120009f9x9j00A93", // 艺术感客房
  "02027120008f7p9j7781E", // 精致浴室
  "0203f120008p7v0w66A1F", // 夜景
];
/**
 * 携程 CDN URL 生成函数
 * @param {string} id 图片ID
 * @param {number} w 宽度
 * @param {number} h 高度
 */
const getCtripImgUrl = (id, w = 400, h = 600) => {
  // _C_ 代表 Center Crop 居中裁剪
  // _R5_ 代表 5px 圆角 (可选)
  // _Q70_ 代表 70% 质量压缩
  return `https://dimg04.c-ctrip.com/images/${id}_C_${w}_${h}_R5_Q70.jpg`;
};

// 2. 配置模拟参数
const brands = [
  "全季",
  "希尔顿",
  "万豪",
  "亚朵",
  "宜必思",
  "香格里拉",
  "维也纳",
  "汉庭",
];
const suffixes = ["酒店", "度假村", "大酒店", "精品酒店"];

let hotelSql =
  "INSERT INTO `hotels` (`name`, `city`, `district`, `address`, `latitude`, `longitude`, `star_level`, `score`, `description`, `created_at`) VALUES \n";
let imageSql =
  "INSERT INTO `hotel_images` (`hotel_id`, `url`, `sort`) VALUES \n";
let hotelIdCounter = 1;
const hotelValues = [];
const imageValues = [];

allCities.forEach((city) => {
  // 每个城市随机生成 10 家酒店
  for (let i = 0; i < 10; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = `${city}${brand}${suffix}`;
    const score = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 - 5.0
    const star = Math.floor(Math.random() * 3) + 3; // 3-5星
    // 模拟经纬度 (中国大致范围：经度73-135，纬度18-53)
    const latitude = (Math.random() * (45 - 22) + 22).toFixed(6);
    const longitude = (Math.random() * (120 - 100) + 100).toFixed(6);

    hotelValues.push(
      `('${name}', '${city}', '中心城区', '${city}市中心路${100 + i}号', ${latitude}, ${longitude}, ${star}, ${score}, '欢迎来到${name}，享受携程品质住宿体验。', NOW())`
    );

    // 为每个酒店随机选 3 张不同的真实图片
    const selectedIds = [...imgIdPool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    selectedIds.forEach((imgId, index) => {
      // 排序为 1 的作为主图，使用 400x600 的比例
      // 排序靠后的可以作为详情图，使用不同尺寸
      const imgUrl = getCtripImgUrl(imgId, 400, 600);
      imageValues.push(`(${hotelIdCounter}, '${imgUrl}', ${index + 1})`);
    });
    hotelIdCounter++;
  }
});

// 3. 写入文件
const finalSql = `-- 酒店数据\n${hotelSql}${hotelValues.join(",\n")};\n\n-- 图片数据\n${imageSql}${imageValues.join(",\n")};`;

fs.writeFileSync("ctrip_data.sql", finalSql);
console.log(
  `成功！已为 ${allCities.length} 个城市生成了 ${hotelValues.length} 条酒店记录。`,
);
