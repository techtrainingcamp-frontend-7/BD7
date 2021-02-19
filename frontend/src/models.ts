import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'
import { home } from '@/containers/Home/model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  home: typeof home
}

export const models: RootModel = { demo, home }
