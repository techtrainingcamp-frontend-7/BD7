import axios from 'axios'

const userAPI = axios.create({
  baseURL: '/api/user',
})

const login = async (payload: any) => {
  return await userAPI.get('/login', {
    params: payload,
  })
}

export default {
  login,
}
