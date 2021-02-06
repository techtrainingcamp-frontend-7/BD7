import axios from 'axios'

const baseUrl = '/api/user'
/**
 * payload: {
 *  username: string,
 *  password: string
 * }
 */
const login = async (payload: object) => {
  const res = await axios.post(`${baseUrl}/login`, payload)
  const {
    code,
    data: { token },
  } = res.data
  if (code === 0 && token) {
    // 存储token
    localStorage.setItem('token', token)
  }
  return res
}

const retrieve = async (username?: string) => {
  return await axios.get(`${baseUrl}/retrieve`, {
    params: {
      username,
    },
  })
}
export default {
  login,
  retrieve,
}
