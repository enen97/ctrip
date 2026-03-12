// 全局请求封装
import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器： 自动注入token
service.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bear ${token}`
    }
    return config
})

// 响应拦截器： 统一处理401 权限问题
service.interceptors.response.use(
    res => res.data,
    err => {
        if (err.response?.status === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

// 导出service
export default service