import { Following } from '@models'
import { CodeDictionary, Restful } from '@utils'
import asyncWrapper from 'async-wrapper-express-ts'
import { Router } from 'express'

const followingRouter = Router()

followingRouter.post(
  '/change',
  asyncWrapper(async (req: any, res, next) => {
    try {
      if (!req.body.uid_to) {
        res
          .status(400)
          .json(
            new Restful(CodeDictionary.PARAMS_ERROR, '参数错误，请提供 uid_to'),
          )
      }
      const [following] = await Following.findOrCreate({
        where: {
          uid_to: req.body.uid_to,
          uid_from: req.auth.id,
        },
      })
      if (req.body.followed === 0) {
        await following.destroy()
      }
      res
        .status(200)
        .json(
          new Restful(CodeDictionary.SUCCESS, '修改成功', following.toJSON()),
        )
    } catch (e) {
      console.error(e)
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default followingRouter
