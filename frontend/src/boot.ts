import { store } from '@/store'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from '@/utils/const'

const { dispatch } = store

const token = localStorage.getItem(ACCESS_TOKEN_NAME)
const userInfo = JSON.parse(localStorage.getItem(USER_INFO_NAME) || 'null')
if (token) {
  console.log('logined')
  dispatch.login.SET_LOGSTATUS(true)
}
if (userInfo) {
  dispatch.user.SET_USERINFO(userInfo)
}
