import { UserAction as Action } from 'action'
import { User } from 'vo'
import { Restful, md5Crypto, isUndef, isDef, CodeDictionary } from 'utils'
/**
 * 添加账号
 * @param { User } user
 */
const Register = async (user: User): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve('username', user.username)
    if (isDef(existedUser)) {
      return new Restful(
        CodeDictionary.REGISTER_ERROR__USER_EXISTED,
        '用户名已存在',
      )
    }
    // 加密密码
    user.password = md5Crypto(user.password)

    // 去除前端可能给的多余ID（自增字段）
    user.id = null

    user = await Action.Create(user)
    user.password = null
    return new Restful(CodeDictionary.SUCCESS, '注册成功', user.toJSON())
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `注册失败, ${String(e.message)}`,
    )
  }
}

/**
 * 登录
 * @param { User } user
 */
const Login = async (username: string, password: string): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve('username', username)
    if (isUndef(existedUser)) {
      return new Restful(CodeDictionary.LOGIN_ERROR, '账号或密码错误')
    }
    // 匹配密码
    if (md5Crypto(password) === existedUser.password) {
      // 脱敏
      existedUser.password = null
      return new Restful(
        CodeDictionary.SUCCESS,
        '登陆成功',
        existedUser.toJSON(),
      )
    }
    return new Restful(CodeDictionary.LOGIN_ERROR, '账号或密码错误')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `登陆失败, ${String(e.message)}`,
    )
  }
}

/**
 * 通过username查询单个用户
 * @param { string } username
 */
const Retrieve = async (username: string): Promise<Restful> => {
  try {
    const user = await Action.Retrieve__Safely('username', username)
    if (isUndef(user)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__USER_NON_EXISTED,
        '账号不存在',
      )
    }
    return new Restful(CodeDictionary.SUCCESS, '查询成功', user.toJSON())
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 遍历用户
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    const users = await Action.Retrieve__All__Safely()
    return new Restful(CodeDictionary.SUCCESS, '查询成功', users)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

export default {
  Register,
  Login,
  Retrieve,
  Retrieve__All,
}
