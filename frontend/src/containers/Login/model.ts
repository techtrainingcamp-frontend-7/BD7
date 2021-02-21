import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from '@/utils/const'
export interface LoginState {
  isLoggedIn: boolean
}

export const defaultLoginState: LoginState = {
  isLoggedIn: false,
}

export const login = createModel<RootModel>()({
  state: defaultLoginState,
  reducers: {
    SET_LOGSTATUS: (state: LoginState, newStatus: boolean) => {
      state.isLoggedIn = newStatus
      if (!newStatus) {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        localStorage.removeItem(USER_INFO_NAME)
      }
      return state
    },
  },
})
