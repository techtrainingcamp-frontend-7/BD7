import axios, { AxiosRequestConfig } from 'axios'
import { store } from '@/store'
import { ACCESS_TOKEN_NAME } from '../const'
import { Restful } from './type'
import user from './user'
import video from './video'
import upload from './upload'

const whiteList = [/^https:\/\/v0.api.upyun.com\//]
export const request = async <T>(config: AxiosRequestConfig) => {
  const { dispatch } = store
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const headers = config.headers || {}
    // 如果本地有token，每个非白名单请求都附带上token
    if (token && whiteList.every((reg) => !reg.test(config.url as string))) {
      headers.Authorization = `Bearer ${token}`
    }
    const res = await axios.request<Restful<T>>({
      ...config,
      headers,
    })
    if (res.status !== 200) {
      dispatch.common.SET_DIALOGSTATUS(true)
      dispatch.common.SET_DIALOGTITLE('警告')
      dispatch.common.SET_DIALOGCONTENT(
        `请求失败，状态码：${String(res.status)}`,
      )
      if (res.status === 401) {
        dispatch.login.SET_LOGSTATUS(false)
      }
    } else if (res.data.code !== 0) {
      dispatch.common.SET_DIALOGSTATUS(true)
      dispatch.common.SET_DIALOGTITLE('警告')
      // TODO: dev
      // dispatch.common.SET_DIALOGCONTENT(
      //   `错误码：${String(res.data.code)}，${res.data.message}`,
      // )
      dispatch.common.SET_DIALOGCONTENT(res.data.message)
    } else {
      return res.data.data as T
    }
  } catch (err) {
    console.error('网络错误', err)
  }
}

export { user, video, upload }
export default { user, video, upload }
