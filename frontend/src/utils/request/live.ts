import { request } from '.'
import { User } from './user'

const baseUrl = '/api/live'

export interface Live {
  id: number | null
  uid: number
  description: string
  push_url: string
  live_url: string
  isActive: boolean
  User: User
  readonly createdAt: Date
  readonly updatedAt: Date
}

export const create = async (live: Partial<Live>) => {
  return await request<Live | undefined>({
    method: 'POST',
    url: `${baseUrl}/create`,
    data: live,
  })
}

export const retrieve = async (uid: number) => {
  return await request<Live | undefined>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      uid,
    },
  })
}

export const retrieveAll = async () => {
  return await request<Live[]>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const edit = async (live: Partial<Live>) => {
  return await request<Live>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: live,
  })
}

export default {
  create,
  retrieve,
  retrieveAll,
  edit,
}
