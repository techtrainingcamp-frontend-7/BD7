import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { Video, fetchRecommendedVideos } from '@/utils/request/video'

export interface HomeState {
  recommendedVideos: Video[]
  /* `activeIndex` 对应 `recommendedVideos` 中的下标 */
  activeIndex: number
}

export const defaultHomeState: HomeState = {
  recommendedVideos: [],
  activeIndex: 0,
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
  },
  effects: (dispatch) => {
    const { home } = dispatch
    return {
      async getRecommendedVideos() {
        const videos = await fetchRecommendedVideos()
        if (videos?.length) home.setRecommendedVideos(videos)
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
