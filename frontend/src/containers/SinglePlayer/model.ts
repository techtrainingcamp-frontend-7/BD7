import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { request as _request } from '@/utils/request'
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
      async updateUserLikeVideo(payload: { vid: number; liked: number }) {
        const { vid, liked } = payload
        await _request({
          method: 'POST',
          url: '/api/user-like-video/change',
          data: {
            vid,
            liked,
          },
        })
      },
    }
  },
})
