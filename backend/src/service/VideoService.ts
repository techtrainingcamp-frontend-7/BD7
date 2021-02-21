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
 */
const Retrieve = async (uid: number): Promise<Restful> => {
  try {
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询视频成功',
      await Action.Retrieve(uid),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询视频失败, ${String(e.message)}`,
    )
  }
}

export default { Create, Retrieve__All, Retrieve }
