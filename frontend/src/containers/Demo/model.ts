import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { request } from '@/utils'
import { LoggedInUser } from '@/utils/request/user'
export interface DemoState {
  count: number
  players: PlayerModel[]
  testAPTResult: any
}

export const defaultDemoState: DemoState = {
  count: 0,
  players: [],
  testAPTResult: null,
}

export const demo = createModel<RootModel>()({
  state: defaultDemoState,
  reducers: {
    // 直接修改 state 的 demo
    SET_COUNT: (state: DemoState, newCount: number) => {
      state.count = newCount
      return state
    },
    SET_PLAYERS: (state: DemoState, players: PlayerModel[]) => {
      state.players = players
      return state
    },
    SET_testAPTResult: (state: DemoState, testAPTResult: LoggedInUser) => {
      state.testAPTResult = testAPTResult
      return state
    },
  },
  effects: (dispatch) => {
    const { demo } = dispatch
    return {
      // 异步请求 demo
      async getPlayers(): Promise<any> {
        const response = await fetch(
          'https://www.balldontlie.io/api/v1/players',
        )
        const { data }: { data: any[] } = await response.json()
        demo.SET_PLAYERS(data)
      },
      async getTestAPI(): Promise<any> {
        const res = await request.user.login({
          username: 'testName',
          password: '123456',
        })
        if (res) demo.SET_testAPTResult(res)
      },
    }
  },
})

export interface Team {
  id: number
  abbreviation: string
  city: string
  conference: string
  division: string
  full_name: string
  name: string
}

export interface PlayerModel {
  id: number
  first_name: string
  last_name: string
  position: string
  height_feet: number
  height_inches: number
  weight_pounds: number
  team: Team
}
