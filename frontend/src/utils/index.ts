import axios from 'axios'
import request from './request'
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log('request intercceptors')
    // 在发送请求之前做些什么
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
    console.log('response intercceptors')
    // 对响应数据做点什么
    return response
  },
  async (error) => {
    // 对响应错误做点什么
    return await Promise.reject(error)
  },
)
export { request }
