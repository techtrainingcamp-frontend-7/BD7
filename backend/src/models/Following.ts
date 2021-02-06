import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

class Following extends Model {
  uid_from!: number
  uid_to!: number
  followed!: boolean
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
    // follow之后可以删除，将followed置为 false
    followed: {
      type: DataTypes.BOOLEAN,
      comment: '是否 follow',
    },
  },
  {
    sequelize,
    tableName: 'following',
  },
)

export default Following
