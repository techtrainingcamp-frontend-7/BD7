import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
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
      return state
    },
  },
})
