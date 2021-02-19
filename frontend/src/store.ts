// rematch 配置参考：https://github.com/rematch/rematch/tree/next/examples

import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from './models'
import immerPlugin from '@rematch/immer'
import selectPlugin from '@rematch/select'

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin(), selectPlugin()],
})

export type Store = typeof store
export type RootDispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
