import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import Video from './Video'

class UserPlayVideo extends Model {
  id!: number
  uid!: number
  vid!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserPlayVideo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增字段（主键）',
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '用户 id',
      references: {
        model: User,
        key: 'id',
      },
    },
    vid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '视频 id',
      references: {
        model: Video,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'user_play_video',
  },
)

export default UserPlayVideo
