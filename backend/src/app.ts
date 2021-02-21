import express from 'express'

import { UserRouter, TestRouter, VideoRouter, UploadRouter } from '@routes'
import { errorHandler, checkJWT, checkValidUser } from '@middleware'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * JWT中间件
 */
app.use(checkJWT)
app.use(checkValidUser)

/**
 * 业务路由
 */
app.use('/api/test', TestRouter)
app.use('/api/user', UserRouter)
app.use('/api/video', VideoRouter)
app.use('/api/upload', UploadRouter)

// 包底错误处理中间件
app.use(errorHandler)

export default app
