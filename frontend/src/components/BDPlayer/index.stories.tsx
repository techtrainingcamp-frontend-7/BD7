import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BDPlayerProps, BDPlayer } from '.'

import './index.stories.less'

export default {
  title: 'Example/BDPlayer',
  component: BDPlayer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const bdPlayerProps: BDPlayerProps = {
  videoUrl:
    'https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/RW20seconds_1.mp4',
}
export const bdPlayer = () => (
  <div className="home">
    <div className="home-main">
      <BDPlayer {...bdPlayerProps} />
    </div>
    <div className="home-tabs"></div>
  </div>
)
