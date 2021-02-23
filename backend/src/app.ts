import express from 'express'

import {
  UserRouter,
  TestRouter,
  VideoRouter,
  UploadRouter,
  UserLikeVideoRouter,
  FollowingRouter,
  LiveRouter,
} from '@routes'
import { errorHandler, checkJWT, checkValidUser } from '@middleware'
import crud, { sequelizeCrud } from 'express-sequelize-crud'
import {
  Live,
  LiveComment,
  Tag,
  User,
  UserLikeVideo,
  UserPlayVideo,
  Video,
  VideoTag,
  Following,
} from '@models'

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
app.use('/api/user-like-video', UserLikeVideoRouter)
app.use('/api/following', FollowingRouter)
app.use('/api/live', LiveRouter)

app.use(crud('/api/admin/user', sequelizeCrud(User)))
app.use(crud('/api/admin/video', sequelizeCrud(Video)))
app.use(crud('/api/admin/user-like-video', sequelizeCrud(UserLikeVideo)))
app.use(crud('/api/admin/user-play-video', sequelizeCrud(UserPlayVideo)))
app.use(crud('/api/admin/live', sequelizeCrud(Live)))
app.use(crud('/api/admin/live-comment', sequelizeCrud(LiveComment)))
app.use(crud('/api/admin/tag', sequelizeCrud(Tag)))
app.use(crud('/api/admin/video-tag', sequelizeCrud(VideoTag)))
app.use(crud('/api/admin/following', sequelizeCrud(Following)))

// 包底错误处理中间件
app.use(errorHandler)

export default app
