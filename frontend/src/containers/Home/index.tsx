import React, { FC } from 'react'
import { BDPlayer } from '@/components/BDPlayer'
import { RootState, store } from '@/store'
import { useAsync } from 'react-use'
// https://swiperjs.com/react
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { PathName } from '@/routes'
import { User } from '@/utils/request/user'

import 'swiper/swiper.less'
import './index.less'

const Home: FC<RouteComponentProps> = ({ history }) => {
  // https://react-redux.js.org/next/api/hooks#useselector
  // https://github.com/rematch/rematch/issues/758#issuecomment-628268224
  const state = useSelector((state: RootState) => state.home)
  const commonState = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.home)
  const videosForRendering = useSelector(store.select.home.videosForRendering)
  useAsync(async () => {
    await dispatch.getRecommendedVideos()
  }, [])

  return (
    <div className="bd7-home">
      {Boolean(videosForRendering.length) && (
        <Swiper
          direction="vertical"
          onActiveIndexChange={(swiper) => {
            dispatch.setActiveIndex(swiper.activeIndex)
            swiper.update()
          }}
          slidesPerView={1}
        >
          {videosForRendering.map((video) => {
            const likedUsers = video.likedUsers as User[]
            const isLiked = Boolean(
              commonState.userInfo.id &&
                likedUsers
                  .map((user) => user.id)
                  .includes(commonState.userInfo.id),
            )

            return (
              <SwiperSlide key={video.id}>
                {({ isActive }: { isActive: boolean }) => {
                  if (!video.id) return null

                  return (
                    <BDPlayer
                      active={isActive}
                      author={video.User}
                      description={video.description}
                      // 本地暂存标记 或者 服务端的数据标记过
                      liked={(() => {
                        if (video.id in state.likeChange)
                          return Boolean(state.likeChange[video.id])
                        else return isLiked
                      })()}
                      onAvatarClick={() => {
                        history.push(
                          `${PathName._OTHER_USER}/${video.User.username}`,
                        )
                      }}
                      onLikeChanged={async (liked) => {
                        await dispatch.updateUserLikeVideo({
                          vid: video.id || 0,
                          liked: liked ? 1 : 0,
                        })
                      }}
                      videoUrl={video.video_url}
                    />
                  )
                }}
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </div>
  )
}

export default Home
