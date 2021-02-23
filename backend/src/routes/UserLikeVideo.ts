import { UserLikeVideo } from '@models'
import { CodeDictionary, Restful } from '@utils'
import asyncWrapper from 'async-wrapper-express-ts'
import { Router } from 'express'

const userLikeVideoRouter = Router()

userLikeVideoRouter.post(
  '/change',
  asyncWrapper(async (req: any, res, next) => {
    try {
      if (!req.body.vid) {
        res
          .status(400)
          .json(
            new Restful(CodeDictionary.PARAMS_ERROR, '参数错误，请提供 vid'),
          )
      }
      const [userLikeVideo] = await UserLikeVideo.findOrCreate({
        where: {
          uid: req.auth.id,
          vid: req.body.vid,
        },
      })
      // 因为 sequelize 不支持通过中间连接表来过滤
      // 我们在 liked === 0 的时候直接删除这个关系
      if (req.body.liked === 0) {
        await userLikeVideo.destroy()
      }
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
