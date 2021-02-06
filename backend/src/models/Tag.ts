import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'

class Tag extends Model {
  id!: number
  content!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '标签 id',
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(200),
      comment: '标签内容',
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tag',
  },
)

export default Tag
