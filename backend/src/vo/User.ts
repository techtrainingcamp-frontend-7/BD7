import { DataTypes, Model } from 'sequelize'
import DB from 'database'

class User extends Model {
  public id!: number | null
  public username!: string
  public password!: string | null
  public avatar_url!: string | null
  public followings_count!: number
  public followers_count!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增字段（主键）',
    },
    username: {
      type: DataTypes.STRING(20),
      unique: 'username',
      allowNull: false,
      validate: {
        notNull: {
          msg: '用户名不能为空',
        },
        notEmpty: {
          msg: '用户名不能为空',
        },
        len: {
          args: [2, 20],
          msg: '用户名长度应为2至20字符',
        },
      },
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: '密码不能为空',
        },
        notEmpty: {
          msg: '密码不能为空',
        },
      },
      comment: '密码',
    },
    avatar_url: {
      type: DataTypes.STRING(100),
      comment: '头像图片路径',
    },
    followings_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
      comment: '关注数',
    },
    followers_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
      comment: '粉丝数',
    },
  },
  {
    sequelize: DB,
    tableName: 'user',
  },
)

export default User
