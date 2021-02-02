import { BinaryToTextEncoding } from 'crypto'
import { Options } from 'sequelize/types'

const sequelizeOptions: Options = {
  // 数据库类别
  dialect: 'mysql',
  // 修复 vercel 找不到 mysql2 的问题：
  // https://github.com/vercel/ncc/issues/345#issuecomment-487404520
  dialectModule: require('mysql2'),
  dialectOptions: {
    // 字符集
    charset: 'utf8mb4',
  },

  // 主机，如IP 或 'localhost'
  host: '101.201.239.229',

  // 端口, MySQL默认端口3306
  port: 3306,

  // 连接池
  pool: {
    max: 20,
    min: 1,
    idle: 30000,
    acquire: 60000,
  },
}

const devConfig = {
  port: 8003,
  host:
    // "https://api.hokori.online" ||
    'http://localhost/',
  // 完整URL为： nginx配置下的转发路径 `${location}`
  baseURL: '/bd7',
  cryptoConfig: {
    // 每次分段加密的字符串最大长度（优先度高于cryptCount字段）
    onceCryptLength: 5,
    // 一次加密至多分段几次加密
    cryptCount: 5,
    // 返回值格式
    // 如果提供了 encoding，则返回字符串，否则返回 Buffer
    // 可选值：['hex', 'Base64', ...]
    digest: 'hex' as BinaryToTextEncoding,
    // 用于cipher对称加密生成密钥的密码
    password: 'bd7',
  },
  dataBaseConfig: {
    // 数据库名
    database: 'bd7',

    // 数据库账号
    user: 'bd7',

    // 密码
    password: 'M4NshB5mLw5r5c83',

    // options
    options: sequelizeOptions,

    // 时区
    timezone: '+08:00',
  },
}

const prodConfig = {
  ...devConfig,
  // TODO: 生产模式需要使用不同的数据库表
}
export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig
