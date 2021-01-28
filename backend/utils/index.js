"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restful = exports.checkIntegrity = exports.toArray = exports.mixin = exports.isUndef = exports.isDef = exports.BODY_METHODS = exports.QUERY_METHODS = void 0;
/**
 * 常量
 */
const QUERY_METHODS = ['GET', 'DELETE'];
exports.QUERY_METHODS = QUERY_METHODS;
const BODY_METHODS = ['POST', 'PUT'];
exports.BODY_METHODS = BODY_METHODS;
/**
 * 判断变量是否已定义
 * @param { object } v
 */
const isDef = (v) => {
    return v !== undefined && v !== null;
};
exports.isDef = isDef;
/**
 * 判断变量是否未定义
 * @param { object } v
 */
const isUndef = (v) => {
    return v === undefined || v === null;
};
exports.isUndef = isUndef;
/**
 * @param { Array<Object> } objArr
 */
const mixin = (attrs) => {
    if (isUndef(attrs)) {
        throw new ReferenceError('参数错误: [ attrs: Array, flag?: boolean ]');
    }
    // 检查传参类型
    for (let i = attrs.length - 1; i > 0; i--) {
        if (typeof attrs[i] !== 'object' ||
            attrs[i].toString() !== '[object Object]') {
            throw new TypeError('参数类型错误: [ attrs: Array<Object> ]');
        }
        Object.keys(attrs[i]).forEach((v) => {
            if (isDef(attrs[i][v])) {
                attrs[i - 1][v] = attrs[i][v];
            }
        });
    }
    return attrs[0];
};
exports.mixin = mixin;
/**
 * 属性转数组
 * @param { Object } obj
 */
const toArray = (obj) => {
    const res = [];
    Object.keys(obj).forEach((key) => {
        res.push(obj[key]);
    });
    return res;
};
exports.toArray = toArray;
/**
 * 检查参数完整性
 * @param { Object } obj
 * @param { Array<string> } params
 */
const checkIntegrity = (obj, params) => {
    return params
        ? params.every((v) => {
            return isDef(obj[v]);
        })
        : toArray(obj).every((v) => {
            return isDef(v);
        });
};
exports.checkIntegrity = checkIntegrity;
class Restful {
    constructor(code, message, data = null) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    static initWithError(e) {
        return new Restful(e.errno, e.message);
    }
}
exports.Restful = Restful;
exports.default = {
    QUERY_METHODS,
    BODY_METHODS,
    isDef,
    isUndef,
    mixin,
    toArray,
    checkIntegrity,
    Restful,
};
