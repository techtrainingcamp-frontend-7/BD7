import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginState {}

export const defaultLoginState: LoginState = {}

export const login = createModel<RootModel>()({
  state: defaultLoginState,
  reducers: {},
})
