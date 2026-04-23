const db = require("../config/db");

// 获取推荐酒店
const getTopHotels = async (address) => {
  let sql = `
    SELECT 
      h.id,
      h.name,
      h.score,
      h.reviews,
      h.price,
      (
        SELECT hi.url
        FROM hotel_image hi
        WHERE hi.hotel_id = h.id
        LIMIT 1
      ) AS img
    FROM hotel h
  `;

  const params = [];
  if (address) {
    sql += ` WHERE h.city = ? `;
    params.push(`${address}`);
  }

  sql += `
    ORDER BY h.score DESC
    LIMIT 6
  `;
  console.log("执行sql语句：", sql, params);

  const [rows] = await db.query(sql, params);
  return rows;
};

// 搜索酒店（多条件筛选）
const searchHotels = async (filters) => {
  const {
    city,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
    priceMin,
    priceMax,
    levels,
    keyword,
    scoreMin,
    reviewsMin,
    facilities,
  } = filters;

  // 计算入住天数 (离店日期 - 入住日期)
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  if (dayCount <= 0) throw new Error("离店日期必须大于入住日期");

  let params = [];

  // 1. 核心 SQL 逻辑
  // 我们需要找到满足条件的房型，然后对应到酒店
  let sql = `
    SELECT 
      h.*, 
      MIN(rt.base_price) as min_price -- 返回该酒店符合条件房型的最低价
    FROM hotel h
    INNER JOIN room_type rt ON h.id = rt.hotel_id
    WHERE 1=1
  `;

  // 2. 基础限制：人数筛选
  // 房型最大入住人数 >= (成人 + 儿童)
  sql += " AND rt.max_people >= ?";
  params.push(Number(adults) + Number(children));

  // 3. 核心限制：库存校验 (日期范围内每一天都有房)
  // 原理：在 room_inventory 查找对应日期区间，可用库存 >= 请求房间数的记录数，必须等于入住天数
  sql += `
    AND rt.id IN (
      SELECT room_type_id 
      FROM room_inventory 
      WHERE date >= ? AND date < ? 
        AND (stock - locked_stock) >= ?
      GROUP BY room_type_id 
      HAVING COUNT(*) = ?
    )
  `;
  params.push(checkIn, checkOut, rooms, dayCount);

  // 4. 动态过滤条件
  if (city) {
    sql += " AND h.city = ?";
    params.push(city);
  }

  if (keyword) {
    sql += " AND (h.name LIKE ? OR h.address LIKE ?)";
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  // 星级过滤 (levels 是数组 [1, 2, 3])
  if (levels && levels.length > 0) {
    sql += ` AND h.star_level IN (${levels.map(() => "?").join(",")})`;
    params.push(...levels);
  }

  if (priceMin !== undefined && priceMin !== null) {
    sql += " AND rt.base_price >= ?";
    params.push(priceMin);
  }

  if (priceMax !== undefined && priceMax !== null) {
    sql += " AND rt.base_price <= ?";
    params.push(priceMax);
  }

  if (scoreMin) {
    sql += " AND h.score >= ?";
    params.push(scoreMin);
  }

  if (reviewsMin) {
    sql += " AND h.reviews >= ?";
    params.push(reviewsMin);
  }

  // 设施过滤 (JSON 包含校验)
  if (facilities) {
    // 只要 facilities 这个大字符串里包含 "叫车服务" 几个字就行
    sql += " AND h.facilities LIKE ?";
    params.push(`%${facilities}%`);
  }

  // 5. 分组与排序
  // 因为是以酒店为单位展示，所以按酒店 ID 分组
  sql += " GROUP BY h.id";
  sql += " ORDER BY h.score DESC, h.id ASC";

  // console.log("执行综合搜索SQL:", sql, params);
  const [rows] = await db.query(sql, params);
  // console.log("执行综合搜索SQL结果11:", rows);
  return rows;
};

// 查询酒店基本信息
const getHotelById = async (hotelId) => {
  const [rows] = await db.query("SELECT * FROM hotel WHERE id = ?", [hotelId]);
  return rows[0];
};

// 查询酒店图片
const getHotelImages = async (hotelId) => {
  const [rows] = await db.query(
    "SELECT url FROM hotel_image WHERE hotel_id = ? ORDER BY sort ASC",
    [hotelId],
  );
  return rows;
};

// 查询酒店房间
const getHotelRooms = async (
  hotelId,
  checkIn,
  checkOut,
  rooms,
  adults,
  children,
) => {
  const sql = `
    SELECT
      rt.id,
      rt.name,
      rt.bed_type,
      rt.area,
      rt.max_people,
      rt.base_price,

      MAX(CASE WHEN rti.sort = 0 THEN rti.url END) AS image1,
      MAX(CASE WHEN rti.sort = 1 THEN rti.url END) AS image2,
      MAX(CASE WHEN rti.sort = 2 THEN rti.url END) AS image3,

      MIN(ri.price) AS min_price,
      MIN(ri.stock - ri.locked_stock) AS min_stock

    FROM room_type rt

    LEFT JOIN room_inventory ri 
      ON rt.id = ri.room_type_id
      AND ri.date >= ? 
      AND ri.date < ?

    LEFT JOIN room_type_image rti 
      ON rti.room_type_id = rt.id

    WHERE rt.hotel_id = ?
      AND rt.max_people * ? >= ?

    GROUP BY rt.id

    HAVING MIN(ri.stock - ri.locked_stock) >= ?
  `;
  console.log("执行sql语句：", sql, [
    checkIn,
    checkOut,
    hotelId,
    rooms,
    adults + children,
    rooms,
  ]);
  const [rows] = await db.query(sql, [
    checkIn,
    checkOut,
    hotelId,
    rooms,
    adults + children,
    rooms,
  ]);
  return rows;
};

// 查询特定房型的每日价格和库存
const getRoomAvailability = async (roomTypeId, checkIn, checkOut) => {
  const sql = `
    SELECT
      DATE_FORMAT(date, '%Y-%m-%d') as date,
      price,
      stock,
      locked_stock
    FROM room_inventory
    WHERE room_type_id = ?
      AND date >= ?
      AND date < ?
    ORDER BY date ASC
  `;
  const [rows] = await db.query(sql, [roomTypeId, checkIn, checkOut]);
  return rows;
};

// 根据名称搜索酒店
const findByName = async (keyword) => {
  const sql = `
      SELECT 
        h.id, 
        h.name, 
        h.score, 
        h.city, 
        h.district, 
        h.price, 
        h.description,
        (SELECT url FROM hotel_image WHERE hotel_id = h.id ORDER BY sort ASC LIMIT 1) as main_image
      FROM hotel h
      WHERE h.name LIKE ?
    `;
  const [rows] = await db.execute(sql, [`%${keyword}%`]);
  return rows;
};

module.exports = {
  getTopHotels,
  searchHotels,
  getHotelById,
  getHotelImages,
  getHotelRooms,
  getRoomAvailability,
  findByName,
};
