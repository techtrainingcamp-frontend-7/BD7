// rematch 配置参考：https://github.com/rematch/rematch/tree/next/examples

import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from './models'
import immerPlugin from '@rematch/immer'

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin()],
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
