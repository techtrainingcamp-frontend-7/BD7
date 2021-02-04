import expressJwt from 'express-jwt'
import config from 'bd7.config'
import { ROUTER_WHITE_LIST } from '@utils'

const { cryptoConfig } = config
export default expressJwt({
  secret: cryptoConfig.password,
  algorithms: ['HS256'],
  requestProperty: 'auth',
}).unless({
  path: ROUTER_WHITE_LIST, // 指定路径不经过 Token 解析
})
