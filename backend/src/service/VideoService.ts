import { VideoAction as Action } from '@action'
import { Video } from '@models'
import { CodeDictionary, Restful } from '@utils'

/**
 * 添加视频
 * @param { Video } video
 */
const Create = async (video: Video): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '上传视频成功',
      await Action.Create(video),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `上传视频失败, ${String(e.message)}`,
    )
  }
}

/**
 * 遍历视频
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询视频成功',
      await Action.Retrieve__All(),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询视频失败, ${String(e.message)}`,
    )
  }
}

/**
 * 查询某用户视频
 * @param { number } uid
 */
const Retrieve__UID = async (uid: number): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询视频成功',
      await Action.Retrieve__UID(uid),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询视频失败, ${String(e.message)}`,
    )
  }
}

/**
 * 通过ID查询某视频
 * @param { number } id
 */
const Retrieve__ID = async (id: number): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询视频成功',
      await Action.Retrieve__ID(id),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询视频失败, ${String(e.message)}`,
    )
  }
}

export default { Create, Retrieve__All, Retrieve__UID, Retrieve__ID }
