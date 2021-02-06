import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import Live from './Live'

class LiveComment extends Model {
  id!: number
  lid!: number
  uid!: number
  content!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

LiveComment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '评论 id',
      primaryKey: true,
      autoIncrement: true,
    },
    lid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '评论所处直播',
      allowNull: false,
      references: {
        model: Live,
        key: 'id',
      },
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '评论发送者',
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      comment: '评论内容',
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'live_comment',
  },
)

export default LiveComment
