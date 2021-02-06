import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import Video from './Video'

export enum Liked {
  LIKED = 1,
  LIKE_CANCELED = 0,
}

class UserLikeVideo extends Model {
  uid!: number
  vid!: number
  liked!: Liked
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserLikeVideo.init(
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
