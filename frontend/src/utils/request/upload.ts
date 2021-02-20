import { request } from '.'
const baseUrl = '/api/upload'

export enum FileType {
  image = 0,
  video = 1,
}

export interface UploadConfig {
  url: string
  payload: any
}
const getAuthorizationAndPolicy = async (
  fileName: string,
  fileType: FileType,
  payload: any,
) => {
  return await request<UploadConfig>({
    method: 'GET',
    url: `${baseUrl}/token`,
    params: {
      fileName,
      fileType,
      payload,
    },
  })
}
const upload = async (formData: FormData, payload: any, url: string) => {
  Object.keys(payload).map((key) => {
    formData.append(key, payload[key])
  })
  return await request({
    method: 'POST',
    url,
    data: formData,
  })
}
export default { getAuthorizationAndPolicy, upload }
