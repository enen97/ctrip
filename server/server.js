const express = require("express");
const cors = require("cors"); // ⭐ 引入
const allRoutes = require("./routes/index");

const app = express();
// ⭐ 开启跨域（必须在路由前）
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由前缀
app.use("/api", allRoutes);

const PORT = process.env.PORT || 3000;

// 引入你的 db 连接池
const db = require("./config/db");


// 健康检查接口
app.get("/health", async (req, res) => {
  try {
    // 执行一个简单的 SQL
    const [rows] = await db.query("SELECT '连接成功' as status, NOW() as time");
    res.json({
      success: true,
      db_status: rows[0].status,
      db_time: rows[0].time,
      current_config: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      }
    });
  } catch (error) {
    console.error("健康检查失败:", error);
    res.status(500).json({
      success: false,
      message: "服务器内部错误"
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://线上ip:${PORT}`);
});
