import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
}

export const models: RootModel = { demo }
