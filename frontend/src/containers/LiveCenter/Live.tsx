import React, { FC, Fragment, useState } from 'react'
import { BDPlayer } from '@/components/BDPlayer'
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom'
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
import { Chat } from '@/components/Chat'
import { io } from 'socket.io-client'

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
  state: state.liveCenter,
  commonState: state.common,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.liveCenter,
})

export type LiveProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const Live: FC<LiveProps> = ({ commonState, state, dispatch, history }) => {
  const { uid } = useParams<{ uid: string }>()
  if (!uid) {
    history.push(PathName.NOT_FOUND_PAGE)
    return null
  }
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [live, setLive] = useState(null as any)

  useAsync(async () => {
    setLoading(true)
    const live = await dispatch.retrieveLive(Number(uid))
    dispatch.SET_SOCKET({
      socket: io('/live'),
      uid: commonState.userInfo.id as number,
      lid: live?.id as number,
    })
    setLive(live)
    setLoading(false)
  }, [])

  return (
    <div className="bd7-live-player">
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
      {live ? (
        <Fragment>
          <div className="bd7-live-player__hover-layer"></div>
          <div className="bd7-live-player__container">
            <BDPlayer
              active
              author={live.User}
              videoUrl={live.live_url}
            ></BDPlayer>
          </div>
          <Chat
            onChatInfoClick={(username: string) => {
              history.push(`${PathName._OTHER_USER}/${username}`)
            }}
            socket={state.liveSocket}
            username={commonState.userInfo.username as string}
          />
        </Fragment>
      ) : (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Live))
