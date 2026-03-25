const db = require("../config/db");

const getTopCitys = async () => {
  const sql = `
    SELECT *
    FROM city
  `;

  const [rows] = await db.query(sql);
  return rows;
};

module.exports = {
  getTopCitys,
};
