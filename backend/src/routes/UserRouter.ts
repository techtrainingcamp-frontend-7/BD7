import { Router } from 'express'
import jwt from 'jsonwebtoken'
import asyncWrapper from 'async-wrapper-express-ts'

import { UserService as Service } from '@service'
import { User } from '@vo'
import { Restful, checkIntegrity, isUndef, CodeDictionary } from '@utils'
import config from 'bd7.config'
const { cryptoConfig } = config

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
        // 设置响应头
        res.set(
          'Authorization',
          `Bearer ${
            jwt.sign(
              {
                username,
              },
              cryptoConfig.password,
              {
                expiresIn: 60 * 60 * 12, // 12个小时 单位second
              },
            ) as string
          }`,
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

export default userRouter
