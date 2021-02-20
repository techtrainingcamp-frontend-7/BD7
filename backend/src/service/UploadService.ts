import { CodeDictionary, Restful } from '@utils'
import crypto from 'crypto'
import config from '../bd7.config'
import moment from 'moment'
const { upyunConfig } = config
const { operator, secret, bucket, imgPath, videoPath } = upyunConfig

const MD5 = (value) => {
  return crypto.createHash('md5').update(value).digest('hex')
}
const generatePolicy = (value: object) => {
  return Buffer.from(JSON.stringify(value), 'utf-8').toString('base64')
}
export enum FileType {
  image = 0,
  video = 1,
}
export const AcceptImageType = ['png', 'jpg', 'jpeg']

/**
 * @param { FileType } fileType
 * @param { string } fileName
 * @param { any } payload // 前端 FORM API的参数
 */
const generateSignature = (fileType: FileType, fileName: string): Restful => {
  try {
    const fileNameArr = fileName.split('.')
    if (!AcceptImageType.includes(fileNameArr[fileNameArr.length - 1])) {
      return new Restful(
        CodeDictionary.UPLOAD_TYPE_ERROR,
        `上传类型错误: [${AcceptImageType.join(', ')}]`,
      )
    }
    const md5Password = MD5(secret)
    const date = new Date().toUTCString()
    const uri = `/${encodeURI(fileType ? videoPath : imgPath)}}`
    const newPayload: any = {
      bucket,
      'save-key': `/${
        fileType ? videoPath : imgPath
      }{filename}_{filemd5}{.suffix}`,
      expiration: moment().add(30, 'm').valueOf(),
      date,
    }
    const policy = generatePolicy(newPayload)
    const value = `POST&${uri}&${date}&${policy}`
    const sign = crypto
      .createHmac('sha1', md5Password)
      .update(value, 'utf-8')
      .digest('base64')

    newPayload.policy = policy
    return new Restful(
      CodeDictionary.SUCCESS,
      `获取${fileType ? 'video' : 'img'}上传签名和链接成功`,
      {
        url: `https://v0.api.upyun.com/${bucket}`,
        payload: { ...newPayload, authorization: `UPYUN ${operator}:${sign}` },
      },
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `获取${fileType ? 'video' : 'img'}上传签名和链接失败, ${String(
        e.message,
      )}`,
    )
  }
}

export default { generateSignature }
