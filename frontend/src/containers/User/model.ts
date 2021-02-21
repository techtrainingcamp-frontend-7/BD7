import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { Video } from '@/utils/request/video'
export interface UserState {
  userVideos: Video[]
}

const defaultUserState: UserState = {
  userVideos: [],
}

export const user = createModel<RootModel>()({
  state: defaultUserState,
  reducers: {
    SET_USERVIDEOS: (state: UserState, newUserVideos: Video[]) => {
      state.userVideos = newUserVideos
      return state
    },
  },
  effects: (dispatch) => {
    const { user } = dispatch
    return {
      retrieveUserInfo(payload, state) {
        if (!state.common.userInfo.username) {
          dispatch.common.SET_SNACKSTATUS(true)
          dispatch.common.SET_SNACKCONTENT('用户名不存在')
          return
        }
        request.user
          .retrieve(state.common.userInfo.username)
          .then((res) => {
            res && dispatch.common.SET_USERINFO(res)
          })
          .catch((e) => {
            dispatch.common.SET_DIALOGSTATUS(true)
            dispatch.common.SET_DIALOGTITLE('警告')
            dispatch.common.SET_DIALOGCONTENT(String(e))
          })
      },
      async editUserInfo(payload: object) {
        return await request.user.edit(payload)
      },
      async uploadImage(data: object) {
        const { fileName, formData } = data as any

        // 请求Authorization和Policy
        const res = await request.upload.getAuthorizationAndPolicy(
          fileName,
          0,
          {},
        )
        if (!res) return
        const { url, payload } = res

        // 上传又拍云
        return await request.upload.upload(formData, payload, url)
      },
      async uploadVideo(data: object, state) {
        const { fileName, formData } = data as any

        // 请求Authorization和Policy
        const res = await request.upload.getAuthorizationAndPolicy(
          fileName,
          1,
          {},
        )
        if (!res) return
        const { url, payload } = res

        // 上传又拍云
        return await request.upload.upload(formData, payload, url)
      },
      async createVideo(video: Partial<Video>) {
        return await request.video.uploadVideo(video)
      },
      retrieveUserVideos(payload, state) {
        request.video
          .fetchUserVideos(state.common.userInfo.id as number)
          .then((res) => {
            res && user.SET_USERVIDEOS(res)
          })
          .catch((e) => {
            dispatch.common.SET_DIALOGSTATUS(true)
            dispatch.common.SET_DIALOGTITLE('警告')
            dispatch.common.SET_DIALOGCONTENT(String(e))
          })
      },
    }
  },
})
