import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import Live from './Live'

export interface Socket {
  id: number
  uid?: number | null
  socket_id: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
class LiveSocket extends Model implements Socket {
  id!: number
  uid?: number | null
  lid?: number | null
  socket_id!: string
  readonly createdAt!: Date
  readonly updatedAt!: Date
}

LiveSocket.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: 'LiveSocket ID',
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '用户ID',
      references: {
        model: User,
        key: 'id',
      },
    },
    lid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: 'Socket所处直播',
      references: {
        model: Live,
        key: 'id',
      },
    },
    socket_id: {
      type: DataTypes.STRING,
      comment: 'Socket ID',
    },
  },
  {
    sequelize,
    tableName: 'live_socket',
  },
)

export default LiveSocket
