import React, { FC } from 'react'
import { Dispatch, RootState } from '@/store'
import { connect } from 'react-redux'
import { BDPlayer } from '@/components/BDPlayer'
import { useAsync } from 'react-use'
// https://swiperjs.com/react
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.less'
import './index.less'

const mapState = (state: RootState) => ({
  state: state.home,
})
const mapDispatch = (dispatch: Dispatch) => ({
  dispatch: dispatch.home,
})

export interface HomeProps
  extends ReturnType<typeof mapState>,
    ReturnType<typeof mapDispatch> {}

const Home: FC<HomeProps> = ({ state, dispatch }) => {
  useAsync(async () => {
    await dispatch.getRecommendedVideos()
  }, [])

  return (
    <div className="bd7-home">
      {state.recommendedVideos.length && (
        <Swiper
          direction="vertical"
          onSlideChange={(swiper) => {
            console.log(swiper)
          }}
          slidesPerView={1}
        >
          {state.recommendedVideos.map((video) => (
            <SwiperSlide key={video.id}>
              {({ isActive }: { isActive: boolean }) => {
                return <BDPlayer active={isActive} videoUrl={video.video_url} />
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default connect(mapState, mapDispatch)(Home)
