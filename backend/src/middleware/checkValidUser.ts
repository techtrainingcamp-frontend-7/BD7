import { UserAction } from '@action'
import { ROUTER_WHITE_LIST } from '@utils'
export default async (req: any, res, next) => {
  if (!ROUTER_WHITE_LIST.every((url) => !req.url.match(url))) {
    console.log('white list')
    return next()
  }
  const user = await UserAction.Retrieve__Safely('username', req.auth.username)
  if (!user) {
    res.status(401).end()
  }
  next()
}
