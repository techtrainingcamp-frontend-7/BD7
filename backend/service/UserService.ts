import { UserAction as Action } from '@action';
import { User } from '@vo';
import { Restful, md5Crypto, isUndef, isDef } from '@utils';

/**
 * 添加账号
 * @param { User } user
 */
const Register = async (user: User): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve('username', user.username);
    if (isDef(existedUser)) {
      return new Restful(1, '用户名已存在');
    }
    // 加密密码
    user.password = md5Crypto(<string>user.password);

    // 去除前端可能给的多余ID（自增字段）
    user.id = null;

    user = await Action.Create(user);
    user.password = null;
    return new Restful(0, '注册成功', user.toJSON());
  } catch (e) {
    return new Restful(99, `注册失败, ${e.message}`);
  }
};

/**
 * 登录
 * @param { User } user
 */
const Login = async (user: User): Promise<Restful> => {
  const { username, password } = user;
  try {
    const existedUser = await Action.Retrieve('username', username);
    if (isUndef(existedUser)) {
      return new Restful(1, '用户名不存在');
    }
    // 匹配密码
    if (md5Crypto(<string>password) === user.password) {
      // 脱敏
      user.password = null;
      return new Restful(0, '登陆成功', user.toJSON());
    }
    return new Restful(2, '账号或密码错误');
  } catch (e) {
    return new Restful(99, `登陆失败, ${e.message}`);
  }
};

/**
 * 通过username查询单个用户
 * @param { string } username
 */
const Retrieve = async (username: string): Promise<Restful> => {
  try {
    const user = await Action.Retrieve__Safely('username', username);
    if (isUndef(user)) {
      return new Restful(1, '账号不存在');
    }
    return new Restful(0, '查询成功', (<User>user).toJSON());
  } catch (e) {
    return new Restful(99, `查询失败, ${e.message}`);
  }
};

/**
 * 遍历用户
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    const users = await Action.Retrieve__All__Safely();
    return new Restful(0, '查询成功', users);
  } catch (e) {
    return new Restful(99, `查询失败, ${e.message}`);
  }
};

/**
 * 编辑用户
 * @param { User } user
 */
const Edit = async (user: User): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve('id', <number>user.id);
    if (isUndef(existedUser)) {
      return new Restful(1, '账号不存在');
    }
    const newUser = await Action.Update(<User>existedUser, user);

    // 脱敏
    newUser.password = null;
    return new Restful(0, '编辑成功', newUser.toJSON());
  } catch (e) {
    return new Restful(99, `编辑失败, ${e.message}`);
  }
};

/**
 * 注销
 * @param { string } username 注销账号
 * @param { string } password
 */
const Delete = async (username: string, password: string) => {
  try {
    const deleteUser = await Action.Retrieve('username', username);
    if (isUndef(deleteUser)) {
      return new Restful(3, '被操作账号不存在');
    }
    const { id } = <User>deleteUser;
    if (md5Crypto(password) === (<User>deleteUser).password) {
      // 匹配密码
      const deleteRow = await Action.Delete(<number>id);
      return deleteRow > 0
        ? new Restful(0, '注销成功')
        : new Restful(2, '注销失败');
    }
    return new Restful(1, '密码错误');
  } catch (e) {
    return new Restful(99, '注销失败');
  }
};

export default {
  Register,
  Login,
  Retrieve,
  Retrieve__All,
  Edit,
  Delete
};
