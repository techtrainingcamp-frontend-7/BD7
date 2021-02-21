import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'
import { home } from '@/containers/Home/model'
import { login } from '@/containers/Login/model'
import { user } from '@/containers/User/model'

import { admin } from './containers/Admin/model'
import { common } from './common-model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  home: typeof home
  login: typeof login
  user: typeof user
  common: typeof common
  admin: typeof admin
}

export const models: RootModel = { demo, home, login, user, common, admin }
