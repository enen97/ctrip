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


module.exports = {
  getTopHotels,
  getHotelById,
  getHotelImages
};
