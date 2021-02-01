import express from 'express'
import expressJwt from 'express-jwt'

import { cryptoConfig } from '@config'
import { UserRouter, TestRouter } from '@routes'

const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  expressJwt({
    secret: cryptoConfig.password,
    algorithms: ['HS256'],
    requestProperty: 'auth',
  }).unless({
    path: ['/login', '/signup'], // 指定路径不经过 Token 解析
  }),
)
app.use('/api/', TestRouter)
app.use('/api/user', UserRouter)

export { app }
