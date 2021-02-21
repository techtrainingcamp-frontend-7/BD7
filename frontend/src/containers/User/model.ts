import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { USER_INFO_NAME } from '@/utils/const'
import { request } from '@/utils'
import { User } from '@/utils/request/user'
import { Video } from '@/utils/request/video'
export interface UserState {
  userInfo: Partial<User>
  userVideos: Video[]
}

const defaultUserState: UserState = {
  userInfo: {
    id: null,
    username: '',
    profile: '',
    gender: 0,
    avatar_url: '',
    followings_count: 0,
    followers_count: 0,
    createdAt: undefined,
    updatedAt: undefined,
  },
  userVideos: [],
}

export const user = createModel<RootModel>()({
  state: defaultUserState,
  reducers: {
    SET_USERINFO: (state: UserState, newUserInfo: Partial<User>) => {
      state.userInfo = {
        ...state.userInfo,
        ...newUserInfo,
      }
      localStorage.setItem(USER_INFO_NAME, JSON.stringify(state.userInfo))
      return state
    },
    SET_USERVIDEOS: (state: UserState, newUserVideos: Video[]) => {
      state.userVideos = newUserVideos
      return state
    },
  },
  effects: (dispatch) => {
    const { user, common, login } = dispatch
    return {
      retrieveUserInfo(payload, state) {
        if (!state.user.userInfo.username) {
          login.SET_LOGSTATUS(false)
          common.SET_SNACKSTATUS(true)
          common.SET_SNACKCONTENT('用户名不存在')
          return
        }
        request.user
          .retrieve(state.user.userInfo.username)
          .then((res) => {
            res && user.SET_USERINFO(res)
          })
          .catch((e) => {
            common.SET_DIALOGSTATUS(true)
            common.SET_DIALOGTITLE('警告')
            common.SET_DIALOGCONTENT(String(e))
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
          .fetchUserVideos(state.user.userInfo.id as number)
          .then((res) => {
            res && user.SET_USERVIDEOS(res)
          })
          .catch((e) => {
            common.SET_DIALOGSTATUS(true)
            common.SET_DIALOGTITLE('警告')
            common.SET_DIALOGCONTENT(String(e))
          })
      },
    }
  },
})
