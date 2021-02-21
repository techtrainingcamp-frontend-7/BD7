import { isDef } from '@/utils/tools'
import { createModel } from '@rematch/core'
import { RootModel } from './models'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from './utils/const'
import { User } from './utils/request/user'

export interface CommonState {
  dialogStatus: boolean
  dialogContent: string
  dialogTitle: string
  snackStatus: boolean
  snackContent: string
  userInfo: Partial<User>
}

export const defaultCommonState: CommonState = {
  dialogStatus: false,
  dialogContent: '',
  dialogTitle: '',
  snackStatus: false,
  snackContent: '',
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
}

export const common = createModel<RootModel>()({
  state: defaultCommonState,
  reducers: {
    SET_DIALOGSTATUS: (state: CommonState, newStatus: boolean) => {
      state.dialogStatus = newStatus
      return state
    },
    SET_DIALOGCONTENT: (state: CommonState, newContent: string) => {
      state.dialogContent = newContent
      return state
    },
    SET_DIALOGTITLE: (state: CommonState, newTitle: string) => {
      state.dialogTitle = newTitle
      return state
    },
    SET_DIALOG: (state: CommonState, dialog: object) => {
      const { content, status, title } = dialog as any
      if (isDef(content)) state.dialogContent = content
      if (isDef(status)) state.dialogStatus = status
      if (isDef(title)) state.dialogTitle = title
      return state
    },
    SET_SNACKSTATUS: (state: CommonState, newStatus: boolean) => {
      state.snackStatus = newStatus
      return state
    },
    SET_SNACKCONTENT: (state: CommonState, newContent: string) => {
      state.snackContent = newContent
      return state
    },

    SET_USERINFO: (state: CommonState, newUserInfo: Partial<User>) => {
      state.userInfo = newUserInfo
      if (state.userInfo)
        localStorage.setItem(USER_INFO_NAME, JSON.stringify(state.userInfo))
      return state
    },
    LOGOUT: (state: CommonState) => {
      state.userInfo = defaultCommonState.userInfo
      localStorage.removeItem(USER_INFO_NAME)
      localStorage.removeItem(ACCESS_TOKEN_NAME)
      return state
    },
  },
})
