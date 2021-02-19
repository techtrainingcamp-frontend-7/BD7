export interface Video {
  id: number
  uid: number
  video_url: string
  poster_url?: string
  description?: string
  like_count: number
  play_count: number
  reference: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

// TODO: 实现具体 API
export const fetchRecommendedVideos = async (): Promise<
  Video[] | undefined
> => {
  return (await Promise.resolve([
    {
      id: 1,
      video_url:
        'https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/RW20seconds_1.mp4',
    },
    {
      id: 2,
      video_url:
        'https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/RW20seconds_1.mp4',
    },
    {
      id: 3,
      video_url:
        'https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/RW20seconds_1.mp4',
    },
  ])) as Video[]
}

export default {
  fetchRecommendedVideos,
}
