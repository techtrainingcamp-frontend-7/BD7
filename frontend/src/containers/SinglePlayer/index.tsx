import React, { FC, Fragment, useState } from 'react'
import { BDPlayer } from '@/components/BDPlayer'
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom'
import { PathName } from '@/routes'
import './index.less'
import {
  Backdrop,
  CircularProgress,
  IconButton,
  makeStyles,
} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import { RootDispatch, RootState } from '@/store'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1301,
  },
  backward: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1302,
    top: '2%',
    left: '2%',
  },
}))

const mapState = (state: RootState) => ({
  state: state.player,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.player,
})

export type SinglePlayerProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const SinglePlayer: FC<SinglePlayerProps> = ({ state, dispatch, history }) => {
  const query = useQuery()
  const id = query.get('id')
  if (!id) {
    history.push(PathName.NOT_FOUND_PAGE)
    return null
  }
  const classes = useStyles()
  const [loading, setLoading] = useState(true)

  useAsync(async () => {
    setLoading(true)
    await dispatch.retrieveVideo(Number(id))
    setLoading(false)
  }, [])
  const { video } = state
  return (
    <div className="bd7-single-player">
      <div className={classes.backward}>
        <IconButton
          aria-label="back"
          onClick={() => {
            history.goBack()
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </div>
      {video ? (
        <Fragment>
          <div className="bd7-single-player__hover-layer"></div>
          <div className="bd7-single-player__container">
            <BDPlayer
              active
              author={video.User}
              videoPosterUrl={video.poster_url || undefined}
              videoUrl={video.video_url}
            ></BDPlayer>
          </div>
        </Fragment>
      ) : (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(SinglePlayer))
