import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BDPlayerProps, BDPlayer } from '.'
import { Button } from '../Button'

import './index.stories.less'

export default {
  title: 'Example/BDPlayer',
  component: BDPlayer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const bdPlayerProps: BDPlayerProps = {
  liked: true,
  onLikeChanged(liked) {
    console.log(liked)
  },
  videoUrl:
    'https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/RW20seconds_1.mp4',
}
// 点播播放器的使用方法
export const bdPlayer = () => (
  <div className="home">
    <div className="home-main">
      <BDPlayer {...bdPlayerProps} />
    </div>
    <div className="home-tabs"></div>
  </div>
)

const livePlayerProps: BDPlayerProps = {
  liked: true,
  onLikeChanged(liked) {
    console.log(liked)
  },
  videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
}

// 直播播放器的使用方法
export const livePlayer = () => (
  <div className="home">
    <BDPlayer {...livePlayerProps} />
  </div>
)

// active 状态转换的使用方法
export const bdPlayerActiveness = () => {
  const [active, setActive] = useState(false)

  return (
    <div className="home">
      <div className="home-main">
        <BDPlayer {...bdPlayerProps} active={active} />
      </div>
      <div className="home-tabs">
        <Button
          label={active ? '禁用' : '启用'}
          onClick={() => {
            setActive(!active)
          }}
          primary
        />
      </div>
    </div>
  )
}
