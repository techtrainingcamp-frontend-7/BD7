import React from 'react'
import classnames from 'classnames'

import './index.less'

export interface VideoTag {
  /* tag 唯一 id */
  tid: number
  /* tag 内容 */
  content: string
}

export interface VideoInfoProps {
  /* 用户名 */
  userName: string
  /* 用户名被点击 */
  onUserNameClick?: () => void
  /* 简介 */
  description?: string
  tags?: VideoTag[]
  onTagClick?: (tid: VideoTag['tid']) => void
  /* 简介被点击 */
  onDescriptionClick?: () => void
  /* 音乐作者 */
  musicAuthor?: string
  /* 音乐名称 */
  musicName?: string
  /* 音乐名称点击回调 */
  onMusicNameClick?: () => void
  /* 被引用者头像 */
  referencedAvatarUrl?: string
  /* 被引用者头像点击回调 */
  onReferencedAvatarClick?: () => void
  /* 自定义类名 */
  className?: string
}

export const VideoInfo: React.FC<VideoInfoProps> = ({
  userName,
  onUserNameClick,
  description,
  onDescriptionClick,
  tags = [],
  onTagClick,
  musicAuthor,
  musicName,
  onMusicNameClick,
  referencedAvatarUrl,
  onReferencedAvatarClick,
  className,
}) => {
  return (
    <div className={classnames('video-info', className)}>
      <div className="video-info-left">
        <div
          className="video-info-username"
          onClick={() => onUserNameClick?.()}
        >
          @{userName}
        </div>
        <div
          className="video-info-description"
          onClick={() => onDescriptionClick?.()}
        >
          <span className="video-info-text">{description}</span>
          <span className="video-info-tags">
            {tags.map((tag) => (
              <span
                className="video-info-tag"
                key={tag.tid}
                onClick={(e) => {
                  onTagClick?.(tag.tid)
                  e.stopPropagation()
                }}
              >
                #{tag.content}
              </span>
            ))}
          </span>
        </div>
        <div
          className="video-info-reference-text"
          onClick={() => onMusicNameClick?.()}
        >
          @{musicAuthor}创作的原声——{musicName}
        </div>
      </div>
      <div className="video-info-right">
        <div
          className="video-info-reference-avatar"
          onClick={() => onReferencedAvatarClick?.()}
        >
          <img className="video-info-reference-img" src={referencedAvatarUrl} />
        </div>
      </div>
    </div>
  )
}
