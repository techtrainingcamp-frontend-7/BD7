import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { Video, fetchRecommendedVideos } from '@/utils/request/video'

export interface HomeState {
  recommendedVideos: Video[]
}

export const defaultHomeState: HomeState = {
  recommendedVideos: [],
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
})
