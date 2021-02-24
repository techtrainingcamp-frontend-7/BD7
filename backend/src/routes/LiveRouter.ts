/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import asyncWrapper from 'async-wrapper-express-ts'

import { Live } from 'models'
import {
  ALIYUN_APPNAME,
  checkIntegrity,
  CodeDictionary,
  isDef,
  Restful,
} from '@utils'
import { LiveService as Service } from '@service'
import moment from 'moment'
import { Server, Socket } from 'socket.io'
import { LiveSocket } from '@models'
import { Op } from 'sequelize'

const liveRouter = Router()

/**
 * 创建直播间
 * @path /create
 * @param { Live } live
 */
liveRouter.post(
  '/create',
  asyncWrapper(async (req: any, res, next) => {
    try {
      const live = Live.build(req.body)
      if (req.auth.id !== Number(live.uid)) {
        res.status(403).end()
        return next()
      }
      if (!checkIntegrity(live, ['uid', 'description'])) {
        res
          .status(200)
          .json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
        return next()
      }
      res.status(200).json(await Service.Create(live))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 查询直播间
 * @path /retrieve
 * @param { string } uid
 */
liveRouter.get(
  '/retrieve',
  asyncWrapper(async (req, res, next) => {
    const { uid } = req.query
    try {
      if (isDef(uid)) {
        res.status(200).json(await Service.Retrieve__UID(Number(uid)))
        return next()
      }
      res.status(200).json(await Service.Retrieve__All())
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 修改
 * @path /edit
 * @param { Live } live
 */
liveRouter.post(
  '/edit',
  asyncWrapper(async (req: any, res, next) => {
    try {
      const live: any = Live.build(req.body).toJSON()
      if (req.auth.id !== Number(live.uid)) {
        res.status(403).end()
        return next()
      }
      if (!checkIntegrity(live, ['uid', 'description'])) {
        res
          .status(200)
          .json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
        return next()
      }
      res.status(200).json(await Service.Edit(live))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)
enum ActionType {
  publish_done = 0,
  publish = 1,
}

/**
 * 推流回调
 * @path /callback
 * @param { Video } video
 */
liveRouter.get(
  '/callback',
  asyncWrapper(async (req, res, next) => {
    try {
      const { action, id, appname } = req.query
      if (appname !== ALIYUN_APPNAME) {
        res.status(403).end()
        return next()
      }
      const isActive = !!ActionType[action as string]
      const result = await Service.Edit({ isActive } as any, id as string)
      console.log('===========> ALIYUN callback')
      console.log(action, moment().format('llll'))
      console.log(result)
      console.log('<=========== ALIYUN callback')
      res.status(200).end()
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * socket
 */

export const LiveSocketInitial = async (SERVER: any) => {
  const io = new Server(SERVER).of('/live')
  await LiveSocket.destroy({
    where: {
      id: { [Op.gt]: 1 },
    },
  })
  io.on('connection', async (socket: Socket) => {
    let liveSocket = await LiveSocket.create({
      socket_id: socket.id,
    })
    socket.emit('initial')
    let isJoined = false
    socket.on('chat', (payload) => {
      // sending to all connected clients
      if (isJoined) {
        io.to(String(liveSocket.lid)).emit('chat', payload)
      }
    })
    socket.on('initial', async (payload) => {
      try {
        const { uid, lid } = JSON.parse(payload)
        liveSocket = await Object.assign(liveSocket, { lid, uid }).save()
        socket.join(String(lid))
        isJoined = true
      } catch (e) {
        console.log(e)
      }
    })
    socket.on('disconnect', () => {
      socket.leave(String(liveSocket.lid))
      LiveSocket.destroy({
        where: {
          socket_id: socket.id,
        },
      })
    })
  })
}

export default liveRouter
