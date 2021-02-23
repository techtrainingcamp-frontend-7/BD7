import {
  ALIYUN_APPNAME,
  ALIYUN_LIVE_URL,
  ALIYUN_PUSH_URL,
  cipherCrypto,
  CodeDictionary,
  isDef,
  isUndef,
  Restful,
} from '@utils'
import { LiveAction as Action } from 'action'
import { Live } from 'models'
/**
 * 创建直播间
 * @param { Live } live
 */
const Create = async (live: Live): Promise<Restful> => {
  try {
    const existedLive = await Action.Retrieve__UID(live.uid)
    if (isDef(existedLive)) {
      return new Restful(
        CodeDictionary.CREATE_ERROR__LIVE_EXISTED,
        '已创建直播间',
      )
    }
    const suffix = cipherCrypto(String(live.id), String(live.uid)) as string
    const pushUrl = `${ALIYUN_PUSH_URL}/${ALIYUN_APPNAME}/${suffix}`
    const liveUrl = `${ALIYUN_LIVE_URL}/${ALIYUN_APPNAME}/${suffix}`
    live.push_url = pushUrl
    live.live_url = liveUrl
    live.isActive = false
    const createdLive = await Action.Create(live)
    return new Restful(
      CodeDictionary.SUCCESS,
      '创建直播间成功',
      createdLive.toJSON(),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `创建直播间失败, ${String(e.message)}`,
    )
  }
}

/**
 * 改变直播间信息
 * @param { Live } live
 * @param { string } suffix // 阿里云的回调函数
 */
const Edit = async (live: Live, suffix?: string): Promise<Restful> => {
  try {
    const existedLive = suffix
      ? await Action.Retrieve__Suffix(suffix)
      : await Action.Retrieve__UID(live.uid)
    if (isUndef(existedLive)) {
      return new Restful(
        CodeDictionary.CREATE_ERROR__LIVE_EXISTED,
        '还未创建直播间',
      )
    }
    if (
      (live.id ? existedLive.id !== Number(live.id) : false) ||
      existedLive.uid !== Number(live.uid)
    ) {
      return new Restful(
        CodeDictionary.CREATE_ERROR__LIVE_PARAM_WRONG,
        '不可更改直播间id或uid',
      )
    }
    if (!suffix) {
      live.isActive = existedLive.isActive
      // 用户不可以更改直播间状态，只能由阿里云的回调来更改
    }
    const newLive = await Action.Update(existedLive, live)
    const message = !suffix
      ? `直播间${newLive.isActive ? '开启' : '关闭'}成功`
      : '更改直播间信息成功'
    return new Restful(CodeDictionary.SUCCESS, message, newLive.toJSON())
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `开启直播间失败, ${String(e.message)}`,
    )
  }
}

/**
 * 查询某用户的直播间
 * @param { number } uid
 */
const Retrieve__UID = async (uid: number): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询直播间成功',
      await Action.Retrieve__UID(uid),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询直播间失败, ${String(e.message)}`,
    )
  }
}

/**
 * 遍历直播间
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询直播间成功',
      await Action.Retrieve__All(),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询直播间失败, ${String(e.message)}`,
    )
  }
}

export default { Create, Edit, Retrieve__UID, Retrieve__All }
