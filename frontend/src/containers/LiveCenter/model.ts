import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { Live } from '@/utils/request/live'
import { isDef } from '@/utils/tools'
export interface LiveCenterState {
  selfLive: Live | undefined
  lives: Live[]
}

export const defaultLiveCenterState: LiveCenterState = {
  selfLive: undefined,
  lives: [],
}
export const liveCenter = createModel<RootModel>()({
  state: defaultLiveCenterState,
  reducers: {
    SET_SELFLIVE: (state: LiveCenterState, newLive: Live | undefined) => {
      state.selfLive = newLive
      return state
    },
    SET_LIVES: (state: LiveCenterState, newLives: Live[]) => {
      state.lives = newLives
      return state
    },
  },
  effects: (dispatch) => {
    const { liveCenter } = dispatch
    return {
      // 初始化直播中心
      async livesInitialize(payload, state) {
        const lives = await request.live.retrieveAll()
        if (!lives?.length) return
        let selfLiveIndex
        for (let i = 0; i < lives.length; i++) {
          if (lives[i].uid === state.common.userInfo.id) {
            selfLiveIndex = i
            break
          }
        }
        // TODO: DEBUG
        // isDef(selfLiveIndex) &&
        //   liveCenter.SET_SELFLIVE(lives.splice(selfLiveIndex as number, 1)[0])
        // liveCenter.SET_LIVES(lives)
        isDef(selfLiveIndex) &&
          liveCenter.SET_SELFLIVE(lives[selfLiveIndex as number])
        liveCenter.SET_LIVES(lives)
      },
      async createLive(live: Partial<Live>) {
        const res = await request.live.create(live)
        if (!res) return
        liveCenter.SET_SELFLIVE(res)
      },
      async editLive(live: Partial<Live>) {
        const res = await request.live.edit(live)
        if (!res) return
        liveCenter.SET_SELFLIVE(res)
      },
      async retrieveLive(uid: number, state) {
        return await request.live.retrieve(uid)
      },
    }
  },
})
