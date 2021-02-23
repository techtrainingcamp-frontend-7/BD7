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
    const { uid, id } = req.query
    try {
      if (isDef(uid)) {
        res.status(200).json(await Service.Retrieve__UID(Number(uid)))
      } else if (isDef(id)) {
        res.status(200).json(await Service.Retrieve__ID(Number(id)))
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

videoRouter.post(
  '/edit',
  asyncWrapper(async (req, res, next) => {
    try {
      if (!req.body.id || !req.body.description) {
        res
          .status(400)
          .json(
            new Restful(
              CodeDictionary.PARAMS_ERROR,
              '参数错误，请提供 id 和 description',
            ),
          )
      }
      const [video] = await Video.findOrCreate({
        where: {
          id: req.body.id,
        },
      })
      video.description = req.body.description
      await video.save()
      res
        .status(200)
        .json(new Restful(CodeDictionary.SUCCESS, '修改成功', video.toJSON()))
    } catch (e) {
      console.error(e)
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default videoRouter
