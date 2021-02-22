import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import Video from './Video'

export enum Liked {
  LIKED = 1,
  LIKE_CANCELED = 0,
}

class UserLikeVideo extends Model {
  id!: number
  uid!: number
  vid!: number
  liked!: Liked
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserLikeVideo.init(
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
    liked: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '是否喜欢',
      allowNull: false,
      defaultValue: Liked.LIKED,
    },
  },
  {
    sequelize,
    tableName: 'user_like_video',
  },
)

export default UserLikeVideo
