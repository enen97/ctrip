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

// 查询酒店基本信息
const getHotelById = async (hotelId) => {
  const [rows] = await db.query(
    'SELECT * FROM hotel WHERE id = ?',
    [hotelId]
  );
  return rows[0];
}

// 查询酒店图片
const getHotelImages = async (hotelId) => {
  const [rows] = await db.query(
    'SELECT url FROM hotel_image WHERE hotel_id = ? ORDER BY sort ASC',
    [hotelId]
  );
  return rows;
}

// 查询酒店房间
const getHotelRooms = async (hotelId, checkIn, checkOut, rooms, adults, children) => {
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
  console.log("执行sql语句：", sql, [checkIn, checkOut, hotelId, rooms, adults + children, rooms]);
  const [rows] = await db.query(sql, [checkIn, checkOut, hotelId, rooms, adults + children, rooms]);
  return rows;
}


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
}


module.exports = {
  getTopHotels,
  getHotelById,
  getHotelImages,
  getHotelRooms,
  getRoomAvailability
};
