const db = require("../config/db");

const findByAccount = async (account) => {
  const sql = "SELECT * FROM user WHERE username = ? OR phone = ?";
  const [rows] = await db.execute(sql, [account, account]);
  return rows[0];
};

const createUser = async (account, password) => {
  const sql = `
    INSERT INTO user (username, password, status, created_at, updated_at) 
    VALUES (?, ?, 1, NOW(), NOW())
  `;
  const [result] = await db.execute(sql, [account, password]);
  return result;
};

module.exports = {
  findByAccount,
  createUser,
};
