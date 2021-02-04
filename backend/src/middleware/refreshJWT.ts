import jwt from 'jsonwebtoken'
import config from 'bd7.config'
const { cryptoConfig, tokenExpiredTime } = config
export default (req, res, next) => {
  if (req.auth) {
    // 刷新token有效期
    res.set(
      'Authorization',
      `Bearer ${jwt.sign(
        {
          username: req.auth.username,
        },
        cryptoConfig.password,
        {
          expiresIn: tokenExpiredTime, // 12个小时 单位second
        },
      )}`,
    )
  }
  next()
}
