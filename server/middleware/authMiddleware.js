const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
    let token
    // 获取请求头中的Authorization字段
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({ success: false, message: '未授权, 缺少token' })
    }
    try {
        // 校验token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)  // 将用户信息存入req， 方便后续使用
        next() // 放行 进入下一个环节（controller）
    } catch (e) {
        res.status(401).json({ success: false, message: '未授权' })
    }
}
