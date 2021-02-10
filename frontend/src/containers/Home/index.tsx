import React, { FC } from 'react'
import { Dispatch, RootState } from '@/store'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { BDPlayer } from '@/components/BDPlayer'
// https://swiperjs.com/react
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAsync } from 'react-use'

import 'swiper/swiper.less'
import './index.less'

const mapState = (state: RootState) => ({
  state: state.home,
})
const mapDispatch = (dispatch: Dispatch) => ({
  dispatch: dispatch.home,
})

export interface HomeProps
  extends RouteComponentProps,
    ReturnType<typeof mapState>,
    ReturnType<typeof mapDispatch> {}

const Home: FC<HomeProps> = ({ state, dispatch }) => {
  useAsync(async () => {
    await dispatch.getRecommendedVideos()
  }, [])

  return (
    <div className="bd7-home">
      <Swiper
        direction="vertical"
        onSlideChange={(swiper) => {
          dispatch.setActiveIndex(swiper.activeIndex)
        }}
        slidesPerView={1}
      >
        {state.recommendedVideos.map((video) => {
          return (
            // TODO: Swiper 貌似有 bug,下次解决一下，swiper-slide 类名元素无法正常获取属性
            <SwiperSlide key={video.id}>
              {({ isActive }: { isActive: boolean }) => (
                <BDPlayer active={isActive} videoUrl={video.video_url} />
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Home))
