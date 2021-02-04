import { Router } from 'express'
import jwt from 'jsonwebtoken'
import asyncWrapper from 'async-wrapper-express-ts'

import { UserService as Service } from '@service'
import { User } from '@vo'
import { Restful, checkIntegrity, isUndef } from '@utils'
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
      res.status(200).json(new Restful(98, '参数错误'))
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
      res.status(200).json(new Restful(98, '参数错误'))
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
// /**
//  * 登陆
//  * @path /login
//  * @param { string } account
//  * @param { string } password
//  */
// ROUTER.post('/login', async (req, res, next) => {
//   const user = User.build(req.body);
//   if (!checkIntegrity(user, ['account', 'password'])) {
//     res.status(200).json(new Restful(1, '参数错误'));
//     return next();
//   }
//   try {
//     res.status(200).json(await Service.Login(user));
//   } catch (e) {
//     // 进行邮件提醒
//     res.status(500).end();
//   }
//   next();
// });

// /**
//  * 遍历/单个查询
//  * @path /retrieve
//  * @param { string } ?account
//  */
// ROUTER.get('/retrieve', async (req, res, next) => {
//   const { account } = req.query;
//   try {
//     if (!account) {
//       res.status(200).json(await Service.Retrieve__All());
//     } else {
//       res.status(200).json(await Service.Retrieve(account));
//     }
//   } catch (e) {
//     // 进行邮件提醒
//     res.status(500).end();
//   }
//   next();
// });

// /**
//  * 编辑
//  * @path /edit
//  * @description 至少需要account，如果更改密码的话，需要加上old_password参数
//  * @param { User } user
//  * @param { string } ?old_password
//  */
// ROUTER.post('/edit', async (req, res, next) => {
//   const user: any = User.build(req.body).toJSON();
//   const old_password = req.body.old_password;
//   if (!checkIntegrity(user, ['account'])) {
//     res.status(200).json(new Restful(1, '参数错误'));
//     return next();
//   }

//   // 同或
//   if (!(Number(!!old_password) ^ Number(!!user.password))) {
//     res.status(200).json(new Restful(1, '参数错误'));
//     return next();
//   }

//   try {
//     if (user.password) {
//       res
//         .status(200)
//         .json(await Service.EditIncludePassword(user, old_password));
//       return next();
//     }
//     res.status(200).json(await Service.Edit(user));
//   } catch (e) {
//     // 进行邮件提醒
//     res.status(500).end();
//   }
//   next();
// });

// /**
//  * 注销
//  * @path /delete
//  * @description 暂时是只有power <= 1的账号才能注销别人的账号，逻辑实现在UserService层
//  * @param { string } account
//  * @param { string } password
//  */
// ROUTER.post('/delete', async (req, res, next) => {
//   const { account, password } = req.body;
//   try {
//     res
//       .status(200)
//       .json(await Service.Delete(res.locals.userAccount, account, password));
//   } catch (e) {
//     // 进行邮件提醒
//     res.status(500).end();
//   }
//   next();
// });

export default userRouter
