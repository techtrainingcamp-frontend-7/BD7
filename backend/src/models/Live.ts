import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'

class Live extends Model {
  id!: number
  uid!: number
  description!: string
  live_url!: string
  start_time!: Date
  end_time!: Date
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
      references: {
        model: User,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      comment: '直播简介',
    },
    live_url: {
      type: DataTypes.STRING(2083),
      comment: '直播推流地址',
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      comment: '直播开始时间',
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      comment: '直播结束时间',
    },
  },
  {
    sequelize,
    tableName: 'live',
  },
)

export default Live
