import express from 'express'
import expressJwt from 'express-jwt'

import config from 'bd7.config'
import { UserRouter, TestRouter } from '@routes'
import { Restful } from '@utils'
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
    path: ['/login', '/signup', '/api/test'], // 指定路径不经过 Token 解析
  }),
)
app.use('/api/test', TestRouter)
app.use('/api/user', UserRouter)

// https://liu-xin.me/2017/10/07/%E8%AE%A9Express%E6%94%AF%E6%8C%81async-await/
app.use(function (err, req, res, next) {
  console.error('Error caught:', err)
  res.status(err.status).json(new Restful(err.code, err?.inner?.message))
})

export default app
