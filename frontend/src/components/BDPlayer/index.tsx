import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import PlayIcon from '../static/img/play.svg'

import './index.less'

export interface BDPlayerProps {
  /* 视频地址或者直播地址 */
  videoUrl: string
  /* 视频封面 */
  videoPosterUrl?: string
  /* 自定义类名 */
  className?: string
}

export const BDPlayer: React.FC<BDPlayerProps> = ({
  videoUrl,
  className,
  videoPosterUrl,
}) => {
  const [playing, setPlaying] = useState(false)
  const [videoDuration, setVideoDuration] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className={classnames('bd-player', className)}>
      <div
        className="bd-player-main"
        onClick={async () => {
          if (playing) {
            videoRef.current?.pause()
          } else {
            await videoRef.current?.play()
          }
        }}
      >
        <video
          autoPlay
          // TODO: 解决只在视频完全出现之后才进行播放
          className="bd-player-video"
          controls={false}
          id="video"
          loop
          onLoadedMetadata={() => {
            setVideoDuration(videoRef.current?.duration || 1)
            setCurrentTime(videoRef.current?.currentTime || 0)
          }}
          onPause={() => {
            setPlaying(false)
          }}
          onPlay={() => {
            setPlaying(true)
          }}
          onTimeUpdate={(evt) => {
            setCurrentTime(videoRef.current?.currentTime || 0)
          }}
          poster={videoPosterUrl}
          preload="metadata"
          ref={videoRef}
        >
          {/* TODO: 兼容直播 */}
          {/* 展示第一帧作为封面：https://stackoverflow.com/a/53173104/8242705 */}
          <source src={`${videoUrl}#t=0.5`} type="video/mp4"></source>
        </video>
        <img
          className="bd-player-play-icon"
          src={PlayIcon}
          style={{
            // 只有暂停的时候才展示播放按钮
            visibility: playing ? 'hidden' : 'visible',
          }}
        />
      </div>
      <div className="bd-player-controls">
        <div className="bd-player-progress">
          <progress
            className="bd-player-progress-bar"
            max={Math.floor(videoDuration)}
            value={Math.floor(currentTime)}
          />
          <input
            className="bd-player-progress-seek"
            max={Math.floor(videoDuration)}
            onChange={(evt) => {
              setCurrentTime(videoRef.current?.currentTime || 0)
              if (videoRef.current) {
                videoRef.current.currentTime = parseInt(
                  (evt.target as any).value,
                )
              }
              evt.preventDefault()
            }}
            step={1}
            type="range"
            value={Math.floor(currentTime)}
          />
        </div>
      </div>
    </div>
  )
}
