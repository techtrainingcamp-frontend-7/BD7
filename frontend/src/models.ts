import { Models, createModel } from '@rematch/core'
import { demo } from '@/containers/Demo/model'
import { home } from '@/containers/Home/model'
import { login } from '@/containers/Login/model'
import { user } from '@/containers/User/model'
import { admin } from './containers/Admin/model'
interface CommonState {
  dialogStatus: boolean
  dialogContent: string
  dialogTitle: string
  snackStatus: boolean
  snackContent: string
}

const defaultCommonState: CommonState = {
  dialogStatus: false,
  dialogContent: '',
  dialogTitle: '',
  snackStatus: false,
  snackContent: '',
}

const common = createModel<RootModel>()({
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
    SET_SNACKSTATUS: (state: CommonState, newStatus: boolean) => {
      state.snackStatus = newStatus
      return state
    },
    SET_SNACKCONTENT: (state: CommonState, newContent: string) => {
      state.snackContent = newContent
      return state
    },
  },
})

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  home: typeof home
  login: typeof login
  user: typeof user
  common: typeof common
  admin: typeof admin
}

export const models: RootModel = { demo, home, login, user, common, admin }
