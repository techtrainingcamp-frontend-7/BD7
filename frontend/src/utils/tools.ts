export const isDef = (v: any): boolean => v !== undefined && v !== null
export const isUndef = (v: any): boolean => v === undefined || v === null
export default { isDef, isUndef }
