import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { Video } from '@/utils/request/video'
import { User } from '@/utils/request/user'
export interface OtherUserState {
  userInfo: Partial<User>
  userVideos: Video[]
}

const defaultOtherUserState: OtherUserState = {
  userInfo: {
    id: null,
    username: '',
    profile: '暂无简介',
    gender: 0,
    followings_count: 0,
    followers_count: 0,
  },
  userVideos: [],
}

export const otherUser = createModel<RootModel>()({
  state: defaultOtherUserState,
  reducers: {
    SET_USERINFO: (state: OtherUserState, newUserInfo: User) => {
      state.userInfo = newUserInfo
      return state
    },
    SET_USERVIDEOS: (state: OtherUserState, newUserVideos: Video[]) => {
      state.userVideos = newUserVideos
      return state
    },
  },
  effects: (dispatch) => {
    const { otherUser } = dispatch
    return {
      async retrieveUserInfo(username: string) {
        if (!username) {
          dispatch.common.SET_SNACKSTATUS(true)
          dispatch.common.SET_SNACKCONTENT('用户名不存在')
          return
        }
        const res = await request.user.retrieve(username)
        if (res) otherUser.SET_USERINFO(res)
        return res
      },
      retrieveUserVideos(id: number) {
        request.video
          .fetchUserVideos(id)
          .then((res) => {
            res && otherUser.SET_USERVIDEOS(res)
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
