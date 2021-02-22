// rematch 配置参考：https://github.com/rematch/rematch/tree/next/examples

import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from './models'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import immerPlugin from '@rematch/immer'
import selectPlugin from '@rematch/select'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
})
const reducers = { router: connectRouter(history) }

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin(), selectPlugin()],
  // react-admin 使用了 connected-react-router，我们也用一下
  // 不然成功集成
  // https://github.com/rematch/rematch/issues/409#issuecomment-545766805
  redux: {
    reducers,
    middlewares: [routerMiddleware(history)],
    devtoolOptions: {},
  },
})

export type Store = typeof store
export type RootDispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
