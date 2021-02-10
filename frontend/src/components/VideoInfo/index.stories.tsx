import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { VideoInfo, VideoInfoProps } from '.'

// import './index.stories.less'

export default {
  title: 'Example/VideoInfo',
  component: VideoInfo,
  parameters: {
    backgrounds: { default: 'douyin' },
  },
} as Meta

const videoInfoProps: VideoInfoProps = {
  userName: '胖超说艺考',
  description: '没有张主任不会的乐器...',
  tags: [
    {
      content: '破音师徒花式反转',
      tid: 1,
    },
    {
      content: '踏山河',
      tid: 2,
    },
  ],
  onTagClick(tid) {
    console.log('tid', tid, 'clicked')
  },
  musicAuthor: '胖超说艺考',
  musicName: '音乐名称',
  referencedAvatarUrl:
    'https://avatars.githubusercontent.com/u/24741764?s=400&u=a8929e616a4f6253e805996a8810bc56b9e02731&v=4',
  onDescriptionClick() {
    console.log('onDescriptionClick')
  },
  onMusicNameClick() {
    console.log('onMusicNameClick')
  },
  onUserNameClick() {
    console.log('onUserNameClick')
  },
  onReferencedAvatarClick() {
    console.log('onReferencedAvatarClick')
  },
}
// 点播播放器的使用方法
export const videoInfo = () => <VideoInfo {...videoInfoProps} />
