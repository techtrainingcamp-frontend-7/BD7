import { Router } from 'express'
import asyncWrapper from 'async-wrapper-express-ts'

import { Video } from 'models'
import { checkIntegrity, CodeDictionary, isDef, Restful } from '@utils'
import { VideoService as Service } from '@service'
const videoRouter = Router()

/**
 * 上传视频
 * @path /upload
 * @param { Video } video
 */
videoRouter.post(
  '/upload',
  asyncWrapper(async (req: any, res, next) => {
    const video = Video.build(req.body)
    if (req.auth.id !== video.uid) {
      res.status(403).end()
      return next()
    }
    if (!checkIntegrity(video, ['uid', 'video_url'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Create(video))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 查询视频
 * @path /retrieve
 */
videoRouter.get(
  '/retrieve',
  asyncWrapper(async (req, res, next) => {
    const { uid } = req.query
    try {
      if (isDef(uid)) {
        res.status(200).json(await Service.Retrieve(Number(uid)))
      } else {
        res.status(200).json(await Service.Retrieve__All())
      }
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default videoRouter
