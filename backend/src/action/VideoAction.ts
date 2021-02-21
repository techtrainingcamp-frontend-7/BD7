/* eslint-disable @typescript-eslint/promise-function-async */
import { Video } from 'models'

/**
 * 添加视频
 * @param { Video } video
 */
const Create = async (video: Video) => {
  return await video.save()
}

/**
 * 遍历视频
 */
const Retrieve__All = () => {
  return Video.findAll({})
}

/**
 * 查询某用户的视频
 * @param { number } uid
 */
const Retrieve = (uid: number) => {
  return Video.findAll({
    where: {
      uid,
    },
  })
}

/**
 * 删除视频
 * @param { number } id
 */
const Delete = (id: number): Promise<number> => {
  return Video.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  Retrieve__All,
  Retrieve,
  Delete,
}
