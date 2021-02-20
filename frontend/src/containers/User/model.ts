import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { store } from '@/store'
import { USER_INFO_NAME } from '@/utils/const'
import { request } from '@/utils'
import { User } from '@/utils/request/user'
export interface UserState {
  userInfo: Partial<User>
}

const defaultUserState: UserState = {
  userInfo: {
    id: null,
    username: '',
    password: '',
    profile: '',
    gender: 0,
    avatar_url: '',
    followings_count: 0,
    followers_count: 0,
    createdAt: undefined,
    updatedAt: undefined,
  },
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
  },
  effects: (dispatch) => {
    const { user } = dispatch
    return {
      retrieveUserInfo(payload, state) {
        request.user
          .retrieve(state.user.userInfo.username)
          .then((res) => {
            res && user.SET_USERINFO(res)
          })
          .catch((e) => {
            store.dispatch.common.SET_DIALOGSTATUS(true)
            store.dispatch.common.SET_DIALOGTITLE('警告')
            store.dispatch.common.SET_DIALOGCONTENT(String(e))
          })
      },
    }
  },
})
