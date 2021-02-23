import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

class Live extends Model {
  id!: number
  uid!: number
  description!: string
  push_url!: string
  live_url!: string
  isActive!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Live.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '直播 id',
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '直播发布者',
      allowNull: false,
      unique: 'uid',
      references: {
        model: User,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      comment: '直播简介',
      allowNull: false,
    },
    push_url: {
      type: DataTypes.STRING(2083),
      comment: '直播推流地址',
      allowNull: false,
    },
    live_url: {
      type: DataTypes.STRING(2083),
      comment: '直播播流地址',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      comment: '是否正在直播',
    },
  },
  {
    sequelize,
    tableName: 'live',
  },
)

export default Live
