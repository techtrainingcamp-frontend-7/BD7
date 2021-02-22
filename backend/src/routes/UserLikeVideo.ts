import { UserLikeVideo } from '@models'
import { CodeDictionary, Restful } from '@utils'
import asyncWrapper from 'async-wrapper-express-ts'
import { Router } from 'express'

const userLikeVideoRouter = Router()

userLikeVideoRouter.post(
  '/change',
  asyncWrapper(async (req: any, res, next) => {
    try {
      const [userLikeVideo] = await UserLikeVideo.findOrCreate({
        where: {
          ...req.body,
        },
      })
      res
        .status(200)
        .json(
          new Restful(
            CodeDictionary.SUCCESS,
            '修改成功',
            userLikeVideo.toJSON(),
          ),
        )
    } catch (e) {
      console.error(e)
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default userLikeVideoRouter
