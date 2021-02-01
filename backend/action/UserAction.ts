/* eslint-disable @typescript-eslint/promise-function-async */
import { User } from '@vo'

/**
 * 添加用户
 * @param { User } user
 */
const Create = (user: User): Promise<User> => {
  return user.save()
}

/**
 * 通过某个字段查询单个用户
 * @param { string } param
 * @param { string } value
 */
const Retrieve = (
  key: string,
  value: string | number,
): Promise<User | null> => {
  return User.findOne({
    where: {
      [`${key}`]: value,
    },
  })
}

/**
 * 通过某个字段查询单个用户（不含密码）
 * @param { string } param
 * @param { string } value
 */
const Retrieve__Safely = (
  key: string,
  value: string | number,
): Promise<User | null> => {
  return User.findOne({
    attributes: {
      exclude: ['password'],
    },
    where: {
      [`${key}`]: value,
    },
  })
}

/**
 * 遍历用户（不含密码）
 */
const Retrieve__All__Safely = (): Promise<Array<User | null>> => {
  return User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
}

/**
 * 更新用户信息
 * @param { User } oldUser
 * @param { User } newUser
 */
const Update = (oldUser: User, newUser: User): Promise<User> => {
  return Object.assign(oldUser, newUser).save()
}

/**
 * 删除用户账号
 * @param { number } id
 */
const Delete = (id: number): Promise<number> => {
  return User.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  Retrieve,
  Retrieve__Safely,
  Retrieve__All__Safely,
  Update,
  Delete,
}
