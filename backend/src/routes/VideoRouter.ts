import { Router } from 'express'
import asyncWrapper from 'async-wrapper-express-ts'

// import { Video } from 'models'

const videoRouter = Router()

/**
 * 注册
 * @path /upload
 * @param { User } user
 */
videoRouter.post(
  '/upload',
  // https://github.com/xiondlph/async-wrapper-express-ts
  asyncWrapper(async (req, res, next) => {
    try {
      res.status(200).send('hi')
      // res.status(200).json(await Service.upload(user))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default videoRouter
