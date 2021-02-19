import { request } from '.'
import { ACCESS_TOKEN_NAME } from '../const'

const baseUrl = '/api/user'

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export interface User {
  id: number | null
  username: string
  password: string
  profile?: string
  gender: Gender
  avatar_url?: string
  followings_count: number
  followers_count: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface LoggedInUser extends User {
  token: string
}

/**
 * payload: {
 *  username: string,
 *  password: string
 * }
 */
const login = async (user: Partial<User>) => {
  const loggedInUser = await request<LoggedInUser>({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: user,
  })
  if (loggedInUser) {
    // 存储token
    localStorage.setItem(ACCESS_TOKEN_NAME, loggedInUser.token)
  }
  return loggedInUser
}

const retrieve = async (username?: string) => {
  return await request<User>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      username,
    },
  })
}

const register = async (user: Partial<User>) => {
  return await request<User>({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: user,
  })
}

export default {
  login,
  retrieve,
  register,
}
