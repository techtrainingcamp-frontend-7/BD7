import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { Video } from '@/utils/request/video'
export interface SinglePlayerState {
  video: Video | undefined
}

export const defaultSinglePlayerState: SinglePlayerState = {
  video: undefined,
}
export const player = createModel<RootModel>()({
  state: defaultSinglePlayerState,
  reducers: {
    SET_VIDEO: (state: SinglePlayerState, newVideo: Video | undefined) => {
      state.video = newVideo
      return state
    },
  },
  effects: (dispatch) => {
    const { player } = dispatch
    return {
      async retrieveVideo(id: number) {
        const video = await request.video.fetchSingleVideo(id)
        player.SET_VIDEO(video)
      },
    }
  },
})
