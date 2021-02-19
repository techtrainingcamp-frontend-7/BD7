enum CodeDictionary {
  SUCCESS = 0,
  REGISTER_ERROR__USER_EXISTED = 1,
  LOGIN_ERROR = 2,
  RETRIEVE_ERROR__USER_NON_EXISTED = 3,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
}

export interface Restful<T> {
  code: CodeDictionary
  message: string
  data?: T
}
