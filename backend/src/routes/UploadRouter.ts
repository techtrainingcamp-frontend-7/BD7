import { Router } from 'express'
import asyncWrapper from 'async-wrapper-express-ts'
import { UploadService } from '@service'
import { CodeDictionary, isUndef, Restful } from '@utils'
import { FileType } from '@service/UploadService'

const uploadRouter = Router()

/**
 * 注册
 * @path /token
 * @param { User } user
 */
uploadRouter.get(
  '/token',
  asyncWrapper(async (req, res, next) => {
    const { fileName, fileType } = req.query
    if (
      isUndef(fileName) ||
      isUndef(fileType) ||
      isUndef(FileType[Number(fileType)])
    ) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    res
      .status(200)
      .json(
        UploadService.generateSignature(Number(fileType), fileName as string),
      )

    next()
  }),
)

export default uploadRouter
