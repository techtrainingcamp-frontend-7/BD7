import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN_NAME } from '../const'
import { Restful } from './type'
import user from './user'
import video from './video'

export const request = async <T>(config: AxiosRequestConfig) => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const headers = config.headers
    // 如果本地有token，每个请求都附带上token
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const res = await axios.request<Restful<T>>({
      ...config,
      headers,
    })
    if (res.status !== 200) {
      alert(`请求失败，状态码：${String(res.status)}`)
    } else if (res.data.code !== 0) {
      alert(`错误码：${String(res.data.code)}，${res.data.message}`)
    } else {
      return res.data.data as T
    }
  } catch (err) {
    console.error('网络错误', err)
  }
}

export { user, video }
export default { user, video }
