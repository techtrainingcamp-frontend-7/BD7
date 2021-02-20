import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { User } from '@/utils/request/user'

export interface AdminState {
  users: User[]
  activeIndex: number
}

export const defaultAdminState: AdminState = {
  users: [],
  activeIndex: 0,
}

export const admin = createModel<RootModel>()({
  state: defaultAdminState,
  reducers: {
    setUsers: (state: AdminState, users: AdminState['users']) => {
      state.users = users
      return state
    },
    setActiveIndex: (
      state: AdminState,
      activeIndex: AdminState['activeIndex'],
    ) => {
      state.activeIndex = activeIndex
      return state
    },
  },
  effects: (dispatch) => {
    const { admin } = dispatch
    return {
      async getUsers() {
        const users = await request.user.retrieveAll()
        console.log('users', users)
        if (users?.length) admin.setUsers(users)
      },
    }
  },
})
