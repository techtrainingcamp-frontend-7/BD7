import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

export enum Followed {
  FOLLOWED = 1,
  FOLLOW_CANCELED = 0,
}

class Following extends Model {
  id!: number
  uid_from!: number
  uid_to!: number
  followed!: Followed
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Following.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增字段（主键）',
    },
    uid_from: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: 'follow 发起者',
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    uid_to: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '被 follow 的人',
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    followed: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '是否 follow',
      defaultValue: Followed.FOLLOWED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'following',
  },
)

export default Following
