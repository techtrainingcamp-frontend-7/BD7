import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import PlayIcon from '../static/img/play.svg'
import LoadingIcon from '../static/img/loading.svg'
import { useAsync } from 'react-use'
import Hls from 'hls.js'

import './index.less'

export interface BDPlayerProps {
  /* 视频地址或者直播地址，目前只支持「.m3u8」格式的 HLS 直播 */
  videoUrl: string
  /* 视频封面 */
  videoPosterUrl?: string
  /* 是否处于活跃状态，非活跃状态下不会播放，默认为 `true` */
  active?: boolean
  /* 自定义类名 */
  className?: string
}

export const BDPlayer: React.FC<BDPlayerProps> = ({
  videoUrl,
  className,
  videoPosterUrl,
  active = true,
}) => {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoDuration, setVideoDuration] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startPlay = async () => {
    if (!videoRef.current) return

    setLoading(true)
    try {
      await videoRef.current.play()
      // Automatic playback started!
      // Show playing UI.
    } catch (err) {
      // Auto-play was prevented
      // Show paused UI
      console.error('播放失败', err)
    }
    setLoading(false)
  }

  const isLive = videoUrl.endsWith('.m3u8')
  useAsync(async () => {
    if (videoRef.current) {
      if (isLive) {
        if (!Hls.isSupported()) {
          alert('浏览器不支持 HLS')
        }
        var hls = new Hls()
        hls.loadSource(videoUrl)
        hls.attachMedia(videoRef.current)
      } else {
        // 展示第一帧作为封面：https://stackoverflow.com/a/53173104/8242705
        videoRef.current.src = `${videoUrl}#t=0.5`
      }
      await startPlay()
    }
  }, [])
  useAsync(async () => {
    if (active) {
      // 从非活跃状态变为活跃状态，开始播放
      await startPlay()
    } else {
      // 从活跃状态变为非活跃状态，开始暂停
      await videoRef.current?.pause()
    }
  }, [active])

  return (
    <div className={classnames('bd-player', className)}>
      <div
        className="bd-player-main"
        onClick={async () => {
          if (!active) return
          if (playing) {
            videoRef.current?.pause()
          } else {
            await startPlay()
          }
        }}
      >
        <video
          autoPlay
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
        ></video>
        <span
          className="bd-player-icons"
          // 只有启用的时候才会展示图标
          style={{ display: active ? 'inline' : 'none' }}
        >
          <img
            className="bd-player-play-icon"
            src={PlayIcon}
            style={{
              // 只有暂停的时候才展示播放图标
              opacity: playing ? 0 : 1,
            }}
          />
          <img
            className="bd-player-loading-icon"
            src={LoadingIcon}
            style={{
              opacity: loading ? 1 : 0,
            }}
          />
        </span>
      </div>
      <span
        className="bd-player-controls"
        style={{
          // 直播不展示进度条
          display: isLive ? 'none' : 'inline',
        }}
      >
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
      </span>
    </div>
  )
}