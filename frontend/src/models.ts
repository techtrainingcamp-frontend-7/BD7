import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'
import { home } from '@/containers/Home/model'
import { login } from '@/containers/Login/model'
import { user } from '@/containers/User/model'
import { player } from '@/containers/SinglePlayer/model'
import { otherUser } from '@/containers/OtherUser/model'
import { liveCenter } from '@/containers/LiveCenter/model'

import { common } from './common-model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  home: typeof home
  login: typeof login
  user: typeof user
  player: typeof player
  otherUser: typeof otherUser
  liveCenter: typeof liveCenter
  common: typeof common
}

export const models: RootModel = {
  demo,
  home,
  login,
  user,
  player,
  otherUser,
  liveCenter,
  common,
}
