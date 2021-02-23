import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

class User extends Model {
  public id!: number | null
  public username!: string
  public password?: string
  public profile?: string
  public gender!: Gender
  public avatar_url?: string
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
    profile: {
      type: DataTypes.STRING(100),
      comment: '用户简介',
    },
    gender: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: Gender.UNKNOWN,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING(2083),
      comment: '头像图片地址',
    },
  },
  {
    sequelize,
    tableName: 'user',
  },
)

export default User
