import express from 'express'

import { UserRouter, TestRouter } from '@routes'
import { errorHandler, checkJWT } from '@middleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * JWT中间件
 */
app.use(checkJWT)

/**
 * 业务路由
 */
app.use('/api/test', TestRouter)
app.use('/api/user', UserRouter)

// 包底错误处理中间件
app.use(errorHandler)

export default app
