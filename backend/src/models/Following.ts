import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

export enum Followed {
  FOLLOWED = 1,
  FOLLOW_CANCELED = 0,
}

class Following extends Model {
  uid_from!: number
  uid_to!: number
  followed!: Followed
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Following.init(
  {
    uid_from: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: 'follow 发起者',
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    uid_to: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '被 follow 的人',
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    followed: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '是否 follow',
      defaultValue: Followed.FOLLOWED,
    },
  },
  {
    sequelize,
    tableName: 'following',
  },
)

export default Following
