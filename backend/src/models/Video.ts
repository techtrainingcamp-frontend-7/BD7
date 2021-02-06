import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

class Video extends Model {
  id!: number
  uid!: number
  description!: string
  like_count!: number
  play_count!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '视频 id',
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '视频发布者',
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      comment: '视频简介',
    },
    like_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '点赞数量',
      defaultValue: 0,
    },
    play_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '播放数量',
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'video',
  },
)

export default Video
