const mongoose = require('mongoose');

//  定义连接字符串
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ctrip_clone';

const connectDB = async () => {
    try {
        // 使用mongoose.connect 连接数据库
        const conn = await mongoose.connect(dbURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.log('MongoDB Connectes failed:', e.message);
        // 连接失败 退出程序
        process.exit(1);
    }
}

module.exports = connectDB;