import { RootDispatch, RootState } from '@/store'

import React, { FC } from 'react'
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom'
import { PathName } from '@/routes'

import {
  Avatar,
  Divider,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Video } from '@/utils/request/video'

import './index.less'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    height: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1301,
    color: '#fff',
  },
  fab: {
    zIndex: theme.zIndex.drawer + 1300,
    position: 'absolute',
    right: '5%',
    bottom: '5%',
  },
  videoItem: {
    maxWidth: 'calc(50% - 20px)',
    minWidth: 'calc(50% - 20px)',
    margin: '5px 10px',
  },
}))
const mapState = (state: RootState) => ({
  state: state.otherUser,
  commonState: state.common,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.otherUser,
})
export type OtherUserProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

export enum GenderCN {
  '未知' = 0,
  '男' = 1,
  '女' = 2,
}
const OtherUser: FC<OtherUserProps> = ({
  state,
  commonState,
  dispatch,
  history,
}) => {
  const { username } = useParams<{ username: string }>()
  if (username === commonState.userInfo.username) {
    history.replace(PathName.USER)
    return null
  }
  useAsync(async () => {
    const user = await dispatch.retrieveUserInfo(username)
    if (!user || !user.id) {
      history.push(PathName.NOT_FOUND_PAGE)
      return
    }
    dispatch.retrieveUserVideos(user.id)
  }, [])
  const classes = useStyles()

  const userInfo = state.userInfo

  return (
    <div className="bd7-user">
      <div className="bd7-user__title">
        <Typography variant="subtitle1">我和我的抖音 - 第7组</Typography>
      </div>
      <Divider />
      <div className="bd7-user__banner">
        <div className="bd7-user__banner__left">
          <div className="bd7-user__banner__left__avatar">
            <Avatar
              alt={userInfo.username}
              className={classes.avatar}
              src={userInfo.avatar_url}
            />
          </div>
          <div className="bd7-user__banner__left__info">
            <div className="bd7-user__banner__left__info__username">
              <Typography variant="subtitle2">
                {userInfo.username || ''}
              </Typography>
            </div>
            <div className="bd7-user__banner__left__info__gender">
              <Typography variant="overline">
                {GenderCN[Number(userInfo.gender)]}
              </Typography>
            </div>
          </div>
        </div>
        <div className="bd7-user__banner__right">
          <Button color="secondary" size="small" variant="contained">
            关注
          </Button>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="bd7-user__profile-wrapper">
        <Typography noWrap variant="caption">
          {userInfo.profile || '这个人好懒，什么都没有留下...'}
        </Typography>

        <div className="bd7-user__follow-wrapper">
          <div className="bd7-user__followings">
            <Typography color="secondary" component="div" variant="subtitle2">
              {userInfo.followings_count}
            </Typography>
            &nbsp;关注
          </div>

          <div className="bd7-user__followers">
            <Typography color="secondary" component="div" variant="subtitle2">
              {userInfo.followings_count}
            </Typography>
            &nbsp;粉丝
          </div>
        </div>
      </div>
      <Divider variant="middle" />
      <Typography
        className="bd7-user__video-title"
        component="div"
        variant="subtitle1"
      >
        已发布视频
      </Typography>
      <div className="bd7-user__video-list">
        {state.userVideos.map((video: Partial<Video>) => (
          <CardActionArea
            className={classes.videoItem}
            key={video.id}
            onClick={() => {
              history.push(`${PathName.SINGLE_PLAYER}?id=${String(video.id)}`)
            }}
            style={{
              backgroundImage: `url(${
                video.poster_url ? video.poster_url : ''
              })`,
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography component="p" variant="body2">
                  {video.description || '暂无描述...'}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        ))}
      </div>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(OtherUser))
