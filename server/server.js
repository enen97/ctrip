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

// 健康检查接口
app.get("/health", (req, res) => {
  res.send("Server is alive!");
});

app.listen(PORT, () => {
  console.log(`server running at http://线上ip:${PORT}`);
});
