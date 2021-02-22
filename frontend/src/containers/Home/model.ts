import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { Video, fetchRecommendedVideos } from '@/utils/request/video'
import { request } from '@/utils/request'

export interface HomeState {
  recommendedVideos: Video[]
  /* `activeIndex` 对应 `recommendedVideos` 中的下标 */
  activeIndex: number
  /* 存放待提交的喜欢改动，key 我 uid，value 为 liked */
  likeChange: Record<number, number>
}

export const defaultHomeState: HomeState = {
  recommendedVideos: [],
  activeIndex: 0,
  likeChange: {},
}

export const home = createModel<RootModel>()({
  state: defaultHomeState,
  reducers: {
    setRecommendedVideos: (
      state: HomeState,
      recommendedVideos: HomeState['recommendedVideos'],
    ) => {
      state.recommendedVideos = recommendedVideos
      return state
    },
    setActiveIndex: (
      state: HomeState,
      activeIndex: HomeState['activeIndex'],
    ) => {
      state.activeIndex = activeIndex
      return state
    },
    addLikeChange: (
      state: HomeState,
      payload: {
        vid: number
        liked: number
      },
    ) => {
      state.likeChange[payload.vid] = payload.liked
      return state
    },
  },
  effects: (dispatch) => {
    const { home } = dispatch
    return {
      async getRecommendedVideos() {
        const videos = await fetchRecommendedVideos()
        if (videos?.length) home.setRecommendedVideos(videos)
      },
      async updateUserLikeVideo(
        payload: {
          vid: number
          liked: number
        },
        rootState,
      ) {
        // 我们假定一定会更新成功，并且直接修改 state 里的标记
        home.addLikeChange(payload)
        const { vid, liked } = payload
        await request({
          method: 'POST',
          url: '/api/user-like-video/change',
          data: {
            uid: rootState.common.userInfo.id,
            vid,
            liked,
          },
        })
      },
    }
  },
  selectors: (slice, createSelector, hasProps) => ({
    /* 只渲染前面所有+当前+下一个视频
     */
    videosForRendering() {
      return slice((home) => {
        if (!home.recommendedVideos.length) return []
        const videos = home.recommendedVideos.slice(0, home.activeIndex + 1)
        // 如果有下一个
        if (home.activeIndex + 1 < home.recommendedVideos.length)
          videos.push(home.recommendedVideos[home.activeIndex + 1])
        return videos
      })
    },
  }),
})
