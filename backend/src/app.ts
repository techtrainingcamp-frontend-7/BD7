import express from 'express'
import expressJwt from 'express-jwt'

import config from 'bd7.config'
import { UserRouter, TestRouter } from '@routes'
import { ROUTER_WHITE_LIST } from '@utils'
import { errorHandler } from '@middleware'

const { cryptoConfig } = config

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  expressJwt({
    secret: cryptoConfig.password,
    algorithms: ['HS256'],
    requestProperty: 'auth',
  }).unless({
    path: ROUTER_WHITE_LIST, // 指定路径不经过 Token 解析
  }),
)
app.use('/api/test', TestRouter)
app.use('/api/user', UserRouter)

// 包底错误处理中间件
app.use(errorHandler)

export default app
