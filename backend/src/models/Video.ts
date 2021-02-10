import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

class Video extends Model {
  id!: number
  uid!: number
  video_url!: string
  poster_url?: string
  description?: string
  like_count!: number
  play_count!: number
  reference!: number
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
    video_url: {
      type: DataTypes.STRING(2083),
      comment: '视频地址',
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING(2083),
      comment: '视频封面地址',
    },
    description: {
      type: DataTypes.TEXT,
      comment: '视频简介',
    },
    like_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '点赞数量',
      defaultValue: 0,
      allowNull: false,
    },
    play_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '播放数量',
      defaultValue: 0,
      allowNull: false,
    },
    reference: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '这支视频引用的视频',
      references: {
        model: Video,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'video',
  },
)

export default Video
