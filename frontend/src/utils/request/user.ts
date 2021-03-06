import { request } from '.'
import { ACCESS_TOKEN_NAME } from '../const'
import { store } from '@/store'

const baseUrl = '/api/user'

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export interface User {
  id: number | null
  username: string
  password: string | null
  profile?: string
  gender: Gender
  avatar_url?: string
  followers: User[]
  following: User[]
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

export const retrieve = async (username: string) => {
  return await request<User>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      username,
    },
  })
}
export const retrieveAll = async () => {
  return await request<User[]>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const register = async (user: Partial<User>) => {
  return await request<User>({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: user,
  })
}

const edit = async (user: Partial<User>) => {
  const newUser = await request<User>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: user,
  })
  if (!newUser) return
  store.dispatch.common.SET_USERINFO(newUser)
  return newUser
}

export default {
  login,
  retrieve,
  retrieveAll,
  register,
  edit,
}
