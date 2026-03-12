const express = require('express')
const connectDB = require('./config/db')
const app = express()

// 引入环境变量
require('dotenv').config();

// 连接数据库
connectDB();

// 解析JSON请求体
app.use(express.json())

// 定义路由
app.use('/api/hotels', require('./routes/hotelRoutes'));


// 处理跨域
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173', // 前端地址
    credentials: true // 允许携带Cookie 或 Authorization Header
}))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))