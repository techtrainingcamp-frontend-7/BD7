import { Router } from 'express'
import jwt from 'jsonwebtoken'
import asyncWrapper from 'async-wrapper-express-ts'

import { UserService as Service } from '@service'
import { User } from 'models'
import { Restful, checkIntegrity, isUndef, CodeDictionary } from '@utils'
import config from 'bd7.config'
const { cryptoConfig, tokenExpiredTime } = config

const userRouter = Router()

/**
 * 注册
 * @path /register
 * @param { User } user
 */
userRouter.post(
  '/register',
  // https://github.com/xiondlph/async-wrapper-express-ts
  asyncWrapper(async (req, res, next) => {
    const user = User.build(req.body)
    if (!checkIntegrity(user, ['username', 'password'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Register(user))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

userRouter.post(
  '/login',
  asyncWrapper(async (req, res, next) => {
    const { username, password } = req.body
    if (isUndef(username) || isUndef(password)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      const result = await Service.Login(username, password)
      if (result.code === 0) {
        // 设置token
        result.data.token = jwt.sign(
          {
            username,
          },
          cryptoConfig.secret,
          {
            // 12个小时
            expiresIn: tokenExpiredTime,
          },
        )
      }
      res.status(200).json(result)
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)
/**
 * 遍历/单个查询
 * @path /retrieve
 * @param { string } ?account
 */
userRouter.get(
  '/retrieve',
  asyncWrapper(async (req, res, next) => {
    const { username } = req.query
    try {
      if (isUndef(username)) {
        res.status(200).json(await Service.Retrieve__All())
      } else {
        res.status(200).json(await Service.Retrieve(username as string))
      }
    } catch (e) {
      // 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 修改
 * @path /edit
 * @param { User } user
 */
userRouter.post(
  '/edit',
  // https://github.com/xiondlph/async-wrapper-express-ts
  asyncWrapper(async (req: any, res, next) => {
    const user: any = User.build(req.body).toJSON()
    if (req.auth.username !== user.username) {
      res.status(403).end()
      return next()
    }
    if (!checkIntegrity(user, ['username'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Edit(user))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default userRouter
