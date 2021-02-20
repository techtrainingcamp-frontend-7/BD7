import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
export interface LoginState {
  logStatus: boolean
}

export const defaultLoginState: LoginState = {
  logStatus: false,
}

export const login = createModel<RootModel>()({
  state: defaultLoginState,
  reducers: {
    SET_LOGSTATUS: (state: LoginState, newStatus: boolean) => {
      state.logStatus = newStatus
      return state
    },
  },
})
