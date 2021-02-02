import CRYPTO from 'crypto'

import { cryptoConfig } from '@config'

/**
 * 常量
 */
const QUERY_METHODS = ['GET', 'DELETE']
const BODY_METHODS = ['POST', 'PUT']
const isDev = process.env.NODE_ENV === 'development'

/**
 * 判断变量是否已定义
 * @param { object } v
 */
const isDef = (v: any): boolean => {
  return v !== undefined && v !== null
}

/**
 * 判断变量是否未定义
 * @param { object } v
 */
const isUndef = (v: any): boolean => {
  return v === undefined || v === null
}

/**
 * @param { Array<Object> } objArr
 */
const mixin = (attrs: Object[]): any => {
  if (isUndef(attrs)) {
    throw new ReferenceError('参数错误: [ attrs: Array, flag?: boolean ]')
  }
  // 检查传参类型
  for (let i = attrs.length - 1; i > 0; i--) {
    if (
      typeof attrs[i] !== 'object' ||
      String(attrs[i]) !== '[object Object]'
    ) {
      throw new TypeError('参数类型错误: [ attrs: Array<Object> ]')
    }
    Object.keys(attrs[i]).forEach((v: string) => {
      if (isDef(attrs[i][v])) {
        attrs[i - 1][v] = attrs[i][v]
      }
    })
  }
  return attrs[0]
}

/**
 * 属性转数组
 * @param { Object } obj
 */
const toArray = (obj: Object): any[] => {
  const res = [] as any[]
  Object.keys(obj).forEach((key) => {
    res.push(obj[key])
  })
  return res
}

/**
 * 检查参数完整性
 * @param { Object } obj
 * @param { Array<string> } params
 */
const checkIntegrity = (obj: Object, params?: string[]): boolean => {
  return params
    ? params.every((v) => {
        return isDef(obj[v])
      })
    : toArray(obj).every((v) => {
        return isDef(v)
      })
}

/**
 * md5加密函数
 * @param { string } v 加密字段
 */
const md5Crypto = (v: string | null): string | null => {
  if (v === null) {
    return v
  }

  const { onceCryptLength, cryptCount, digest } = cryptoConfig
  const md5 = CRYPTO.createHash('md5')
  const vLength = v.length
  // 每次分段加密的字符串最大长度
  if (isDef(onceCryptLength) && onceCryptLength > 0) {
    while (v) {
      const tempV = v.slice(0, onceCryptLength)
      v = v.slice(onceCryptLength)
      md5.update(`${tempV} - `)
    }
    return md5.digest(digest)
  }
  // 一次加密至多分段几次加密
  if (isDef(cryptCount) && cryptCount > 0) {
    if (vLength <= cryptCount) {
      return md5.update(v).digest(digest)
    } else {
      const onceCryptLength = ~~(vLength / cryptCount)
      while (v) {
        const tempV = v.slice(0, onceCryptLength)
        v = v.slice(onceCryptLength)
        md5.update(`${tempV} - `)
      }
      return md5.digest(digest)
    }
  }
  throw new ReferenceError(
    'bd7.config.js缺少字段cryptoConfig: [ onceCryptLength: Number > 0, cryptCount: Number > 0 ]',
  )
}

/**
 * cipher加密函数
 * @param { string } v 加密字段
 * @param { string } password 生成密钥的密码
 */
const cipherCrypto = (v: string | null, password: string) => {
  if (!v) {
    return null
  }
  const key = CRYPTO.scryptSync(password, '盐值', 24)
  const iv = Buffer.alloc(16, 0) // 初始化向量
  const cipher = CRYPTO.createCipheriv('aes-192-cbc', key, iv)
  cipher.update(v)
  return cipher.final('hex')
}

/**
 * cipher解密函数
 * @param { string } v 解密字段
 * @param { string } password 生成密钥的密码
 */
const decipherCrypto = (v: string | null, password: string) => {
  if (!v) {
    return null
  }
  const key = CRYPTO.scryptSync(password, '盐值', 24)
  const iv = Buffer.alloc(16, 0) // 初始化向量
  const decipher = CRYPTO.createDecipheriv('aes-192-cbc', key, iv)
  decipher.update(v, 'hex')
  return decipher.final('utf-8')
}

/**
 * Restful API类声明
 */
interface Restful {
  code: number
  message: string
  data?: any
}
class Restful {
  code: number
  message: string
  data?: any
  constructor(code: number, message: string, data: any = null) {
    this.code = code
    this.message = message
    this.data = data
  }

  static initWithError(e: any) {
    return new Restful(e.errno, e.message)
  }
}

export {
  QUERY_METHODS,
  BODY_METHODS,
  isDev,
  isDef,
  isUndef,
  mixin,
  toArray,
  checkIntegrity,
  md5Crypto,
  cipherCrypto,
  decipherCrypto,
  Restful,
}

export default {
  QUERY_METHODS,
  BODY_METHODS,
  isDev,
  isDef,
  isUndef,
  mixin,
  toArray,
  checkIntegrity,
  md5Crypto,
  cipherCrypto,
  decipherCrypto,
  Restful,
}
