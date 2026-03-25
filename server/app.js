const express = require("express");
const cors = require("cors"); // ⭐ 引入 
const allRoutes = require("./routes/index");

const app = express();
// ⭐ 开启跨域（必须在路由前）
app.use(cors());

app.use(express.json());

// 路由前缀
app.use("/api", allRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
