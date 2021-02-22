import { store } from '@/store'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from '@/utils/const'

const { dispatch } = store

const token = localStorage.getItem(ACCESS_TOKEN_NAME)
const userInfo = JSON.parse(localStorage.getItem(USER_INFO_NAME) || 'null')
if (!token || !userInfo) {
  localStorage.removeItem(ACCESS_TOKEN_NAME)
  localStorage.removeItem(USER_INFO_NAME)
} else {
  dispatch.common.SET_USERINFO(userInfo)
}
