/**
 * 常量
 */
const QUERY_METHODS = ['GET', 'DELETE'];
const BODY_METHODS = ['POST', 'PUT'];

/**
 * 判断变量是否已定义
 * @param { object } v
 */
const isDef = (v: any): boolean => {
  return v !== undefined && v !== null;
};

/**
 * 判断变量是否未定义
 * @param { object } v
 */
const isUndef = (v: any): boolean => {
  return v === undefined || v === null;
};

/**
 * @param { Array<Object> } objArr
 */
const mixin = (attrs: Array<Object>): any => {
  if (isUndef(attrs)) {
    throw new ReferenceError('参数错误: [ attrs: Array, flag?: boolean ]');
  }
  // 检查传参类型
  for (let i = attrs.length - 1; i > 0; i--) {
    if (
      typeof attrs[i] !== 'object' ||
      attrs[i].toString() !== '[object Object]'
    ) {
      throw new TypeError('参数类型错误: [ attrs: Array<Object> ]');
    }
    Object.keys(attrs[i]).forEach((v: string) => {
      if (isDef(attrs[i][v])) {
        attrs[i - 1][v] = attrs[i][v];
      }
    });
  }
  return attrs[0];
};

/**
 * 属性转数组
 * @param { Object } obj
 */
const toArray = (obj: Object): Array<any> => {
  const res = [] as Array<any>;
  Object.keys(obj).forEach((key) => {
    res.push(obj[key]);
  });
  return res;
};

/**
 * 检查参数完整性
 * @param { Object } obj
 * @param { Array<string> } params
 */
const checkIntegrity = (obj: Object, params?: Array<string>): boolean => {
  return params
    ? params.every((v) => {
        return isDef(obj[v]);
      })
    : toArray(obj).every((v) => {
        return isDef(v);
      });
};

/**
 * Restful API类声明
 */
interface Restful {
  code: number;
  message: string;
  data?: any;
}
class Restful {
  code: number;
  message: string;
  data?: any;
  constructor(code: number, message: string, data: any = null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
  static initWithError(e: any) {
    return new Restful(e.errno, e.message);
  }
}

export {
  QUERY_METHODS,
  BODY_METHODS,
  isDef,
  isUndef,
  mixin,
  toArray,
  checkIntegrity,
  Restful
};

export default {
  QUERY_METHODS,
  BODY_METHODS,
  isDef,
  isUndef,
  mixin,
  toArray,
  checkIntegrity,
  Restful
};
