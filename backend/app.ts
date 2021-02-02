import express from 'express'
import expressJwt from 'express-jwt'

import { cryptoConfig } from '@config'
import { UserRouter, TestRouter } from '@routes'

const app = express()

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

// https://liu-xin.me/2017/10/07/%E8%AE%A9Express%E6%94%AF%E6%8C%81async-await/
app.use(function (err, req, res, next) {
  console.error('Error:', err)
  res.status(500).send('Service Error')
})

export { app }
