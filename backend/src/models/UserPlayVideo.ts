import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import Video from './Video'

class UserPlayVideo extends Model {
  uid!: number
  vid!: number
  play_count!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserPlayVideo.init(
  {
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '用户 id',
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    vid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '视频 id',
      primaryKey: true,
      references: {
        model: Video,
        key: 'id',
      },
    },
    play_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '播放次数',
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'user_play_video',
  },
)

export default UserPlayVideo
