/* eslint-disable @typescript-eslint/promise-function-async */
import { ALIYUN_APPNAME, ALIYUN_LIVE_URL } from '@utils'
import { Live, User } from 'models'

/**
 * 创建直播间
 * @param { Live } live
 */
const Create = async (live: Live) => {
  return await live.save()
}

/**
 * 遍历直播间
 */
const Retrieve__All = () => {
  return Live.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['password'],
      },
    },
  })
}

/**
 * 查询某用户的直播间
 * @param { number } uid
 */
const Retrieve__UID = (uid: number) => {
  return Live.findOne({
    where: {
      uid,
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password'],
      },
    },
  })
}

/**
 * 通过stream查询用户直播间及其信息
 * @param { string } suffix
 */
const Retrieve__Suffix = (suffix: string) => {
  return Live.findOne({
    where: {
      live_url: `${ALIYUN_LIVE_URL}/${ALIYUN_APPNAME}/${suffix}.m3u8`,
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password'],
      },
    },
  })
}

/**
 * 更新直播间信息
 * @param { Live } oldLive
 * @param { Live } newLive
 */
const Update = (oldLive: Live, newLive: Live): Promise<Live> => {
  return Object.assign(oldLive, newLive).save()
}

export default {
  Create,
  Retrieve__UID,
  Retrieve__All,
  Retrieve__Suffix,
  Update,
}
