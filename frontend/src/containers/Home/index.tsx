import React, { FC } from 'react'
import { BDPlayer } from '@/components/BDPlayer'
import { store } from '@/store'
import { useAsync } from 'react-use'
// https://swiperjs.com/react
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'

import 'swiper/swiper.less'
import './index.less'
import { RouteComponentProps } from 'react-router-dom'
import { PathName } from '@/routes'

const Home: FC<RouteComponentProps> = ({ history }) => {
  // https://react-redux.js.org/next/api/hooks#useselector
  // https://github.com/rematch/rematch/issues/758#issuecomment-628268224
  // const state = useSelector((state: RootState) => state.home)
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
          {videosForRendering.map((video) => (
            <SwiperSlide key={video.id}>
              {({ isActive }: { isActive: boolean }) => {
                return (
                  <BDPlayer
                    active={isActive}
                    author={video.User}
                    description={video.description}
                    onAvatarClick={() => {
                      history.push(
                        `${PathName._OTHER_USER}/${video.User.username}`,
                      )
                    }}
                    videoUrl={video.video_url}
                  />
                )
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default Home
