import { createModel } from '@rematch/core'
import { RootModel } from '@/models'

export interface HomeState {
  count: number
  players: PlayerModel[]
}

export const defaultHomeState: HomeState = {
  count: 0,
  players: [],
}

export const demo = createModel<RootModel>()({
  state: defaultHomeState,
  reducers: {
    // 直接修改 state 的 demo
    SET_COUNT: (state: HomeState, newCount: number) => {
      state.count = newCount
      console.log(state.count)
      return state
    },
    SET_PLAYERS: (state: HomeState, players: PlayerModel[]) => {
      state.players = players
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
