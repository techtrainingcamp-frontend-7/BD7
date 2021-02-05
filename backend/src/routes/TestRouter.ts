import { Restful } from 'utils'
import EXPRESS from 'express'
import moment from 'moment'
const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

const ROUTER = EXPRESS.Router()

ROUTER.get('/', (_req, res, next) => {
  res
    .status(200)
    .json(
      new Restful(
        0,
        'Hello world(no need for token)',
        `Time now is ${currentTime}`,
      ),
    )
  next()
})
ROUTER.get('/token', (_req, res, next) => {
  res
    .status(200)
    .json(
      new Restful(0, 'Hello world(token needed)', `Time now is ${currentTime}`),
    )
  next()
})
export default ROUTER
