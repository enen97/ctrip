const db = require("../config/db");

const createOrder = async (orderData) => {
  const {
    tradeNo,
    userId,
    hotelId,
    roomTypeId,
    checkIn,
    checkOut,
    rooms,
    totalPrice,
    guestName,
    guestEmail,
    guestPhone,
    arrivalTime,
    elevator,
  } = orderData;

  const sql = `
    INSERT INTO \`order\` (
      trade_no, user_id, hotel_id, room_type_id, check_in, check_out, 
      rooms, total_price, guest_name, guest_email, guest_phone, 
      arrival_time, status, created_at, elevator, is_deleted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), ?, 0)
  `;
  const params = [
    tradeNo,
    userId,
    hotelId,
    roomTypeId,
    checkIn,
    checkOut,
    rooms,
    totalPrice,
    guestName,
    guestEmail,
    guestPhone,
    arrivalTime,
    elevator,
  ];

  const [result] = await db.execute(sql, params);
  return result;
};

const updateOrderStatus = async (tradeNo, status, alipayTradeNo) => {
  const sql =
    "UPDATE `order` SET status = ? , alipay_trade_no = ? , paid_at = NOW() WHERE trade_no = ? AND is_deleted = 0";
  console.log(sql, tradeNo, status, alipayTradeNo);
  const [result] = await db.execute(sql, [status, alipayTradeNo, tradeNo]);
  return result;
};

const getOrderByTradeNo = async (tradeNo) => {
  const sql =
    "SELECT trade_no, status, total_price FROM `order` WHERE trade_no = ? AND is_deleted = 0";
  const [rows] = await db.execute(sql, [tradeNo]);
  return rows[0]; // 返回找到的第一行数据
};

const getUserOrders = async (userId) => {
  // 自定检查订单状态  如果状态为1且离店日期小于当前日期，则将状态改为3
  const autoUpdateSql = `
    UPDATE \`order\` 
    SET status = 3 
    WHERE user_id = ? AND status = 1 AND check_out < CURDATE() AND is_deleted = 0
  `;
  await db.execute(autoUpdateSql, [userId]);

  const sql = `
    SELECT
      h.id as hotelId,
      h.city,
      o.trade_no as id,
      DATE_FORMAT(o.created_at, '%Y-%m-%d') as date,
      h.name as hotelName,
      h.address,
      o.status,
      o.total_price as price,
      DATE_FORMAT(o.check_in, '%Y-%m-%d') as checkIn,
      DATE_FORMAT(o.check_out, '%Y-%m-%d') as checkOut,
      DATEDIFF(o.check_out, o.check_in) as nights,
      o.rooms,
      o.guest_name as guest,
      rt.name as roomType
    FROM \`order\` o
    JOIN hotel h ON o.hotel_id = h.id
    JOIN room_type rt ON o.room_type_id = rt.id
    WHERE o.user_id = ? AND o.is_deleted = 0
    ORDER BY o.created_at DESC
  `;
  const [rows] = await db.execute(sql, [userId]);
  return rows;
};

const searchUserOrders = async (userId, checkIn, checkOut, guest, orderNo, status) => {
  const sql = `
    SELECT 
      o.trade_no as id,
      DATE_FORMAT(o.created_at, '%Y-%m-%d') as date,
      h.name as hotelName,
      h.address,
      o.status,
      o.total_price as price,
      DATE_FORMAT(o.check_in, '%Y-%m-%d') as checkIn,
      DATE_FORMAT(o.check_out, '%Y-%m-%d') as checkOut,
      DATEDIFF(o.check_out, o.check_in) as nights,
      o.rooms,
      o.guest_name as guest,
      rt.name as roomType
    FROM \`order\` o
    JOIN hotel h ON o.hotel_id = h.id
    JOIN room_type rt ON o.room_type_id = rt.id
    WHERE o.is_deleted = 0 AND o.user_id = ?
      AND (? = '' OR o.check_in >= ?)
      AND (? = '' OR o.check_in <= ?)
      AND o.guest_name LIKE ?
      AND o.trade_no LIKE ?
      AND o.status = ?
    ORDER BY o.created_at DESC  
  `;
  const [rows] = await db.execute(sql, [userId, checkIn, checkIn, checkOut, checkOut, `%${guest}%`, `%${orderNo}%`, status]);
  return rows;
};

const deleteOrder = async (orderNo) => {
  const sql = "UPDATE `order` SET is_deleted = 1 WHERE trade_no = ?";
  const [result] = await db.execute(sql, [orderNo]);
  return result;
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrderByTradeNo,
  getUserOrders,
  searchUserOrders,
  deleteOrder,
};
