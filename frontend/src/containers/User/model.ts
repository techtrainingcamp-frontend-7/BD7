import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserState {}

const defaultUserState: UserState = {}

export const user = createModel<RootModel>()({
  state: defaultUserState,
  reducers: {},
  effects: (dispatch) => {
    return {
      retrieveUserInfo(payload, state) {
        if (!state.common.userInfo.username) {
          dispatch.common.SET_SNACKSTATUS(true)
          dispatch.common.SET_SNACKCONTENT('用户名不存在')
          return
        }
        request.user
          .retrieve(state.common.userInfo.username)
          .then((res) => {
            res && dispatch.common.SET_USERINFO(res)
          })
          .catch((e) => {
            dispatch.common.SET_DIALOGSTATUS(true)
            dispatch.common.SET_DIALOGTITLE('警告')
            dispatch.common.SET_DIALOGCONTENT(String(e))
          })
      },
      async uploadImage(data: object, state) {
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
    }
  },
})
