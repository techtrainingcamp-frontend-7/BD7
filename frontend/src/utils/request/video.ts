import { request } from '.'
import { User } from './user'

const baseUrl = '/api/video'

export interface Video {
  likedUsers?: User[]
  id: number | null
  uid: number
  video_url: string
  poster_url?: string
  description?: string
  like_count: number
  play_count: number
  reference: number
  User: User
  readonly createdAt: Date
  readonly updatedAt: Date
}

export const fetchRecommendedVideos = async (): Promise<
  Video[] | undefined
> => {
  return await request<Video[]>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const fetchUserVideos = async (
  uid: number,
): Promise<Video[] | undefined> => {
  return await request<Video[]>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      uid,
    },
  })
}

export const fetchSingleVideo = async (
  id: number,
): Promise<Video | undefined> => {
  return await request<Video | undefined>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      id,
    },
  })
}

export const uploadVideo = async (video: Partial<Video>) => {
  return await request<Video>({
    method: 'POST',
    url: `${baseUrl}/upload`,
    data: video,
  })
}

export default {
  fetchRecommendedVideos,
  fetchUserVideos,
  uploadVideo,
  fetchSingleVideo,
}
