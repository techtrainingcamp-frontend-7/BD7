import axios from 'axios'
import user from './user'

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      // 如果本地有token，每个请求都附带上token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    // 对请求错误做些什么
    return await Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 响应状态码: response.status
    // TODO: 根据响应状态码进行相应处理，如401、403重定向
    return response
  },
  async (error) => {
    // 对响应错误做点什么
    return await Promise.reject(error)
  },
)

export { user }
export default { user }
