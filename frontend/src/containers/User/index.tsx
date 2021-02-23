import { RootDispatch, RootState } from '@/store'

import React, { FC, useState } from 'react'
import { useAsync } from 'react-use'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { PathName } from '@/routes'
import { request } from '@/utils'

import {
  Avatar,
  Button,
  Divider,
  Typography,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Fab,
  Card,
  CardContent,
  CardActionArea,
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { UPYUN_URL } from '@/utils/const'

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
  state: state.user,
  commonState: state.common,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.user,
  commonDispatch: dispatch.common,
})
export type UserProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

export enum GenderCN {
  '未知' = 0,
  '男' = 1,
  '女' = 2,
}
const User: FC<UserProps> = ({
  state,
  dispatch,
  history,
  commonState,
  commonDispatch,
}) => {
  useAsync(async () => {
    await Promise.all([
      dispatch.retrieveUserInfo(),
      dispatch.retrieveUserVideos(),
    ])
  }, [])
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [profileEditing, setProfileEditing] = useState(false)
  const userInfo = commonState.userInfo
  const [profile, setProfile] = useState(userInfo.profile || '')
  const [videoUploading, setVideoUploading] = useState(false)
  const [video, setVideo] = useState(null as any)
  const [description, setDescription] = useState('')
  const handleProfileEditDialogConfirm = async () => {
    setLoading(true)
    await request.user.edit({
      ...userInfo,
      profile,
    })
    setProfileEditing(false)
    setLoading(false)
  }
  const handleVideoAdd = (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    const { size } = file
    if (size > 1024 * 1024 * 15) {
      commonDispatch.SET_DIALOG({
        title: '提示',
        content: '请选择小于15MB的视频',
        status: true,
      })
      return
    }
    setVideo(file)
  }
  const handleVideoUploadDialogConfirm = async () => {
    const formData = new FormData()
    formData.append('file', video)
    setLoading(true)
    let res = await dispatch.uploadVideo({
      fileName: video.name,
      formData,
    })
    if (!res || res.code !== 200) {
      setLoading(false)
      return
    }

    // 通知后端
    const videoData: Partial<Video> = {
      uid: userInfo.id as number,
      description,
      video_url: `${UPYUN_URL}${res.url as string}`,
    }
    res = await dispatch.createVideo(videoData)
    if (res && !res.code) {
      // 后端保存成功
      setVideo(null)
      setDescription('')
    }
    setVideoUploading(false)
    setLoading(false)
    commonDispatch.SET_SNACKCONTENT('上传视频成功')
    commonDispatch.SET_SNACKSTATUS(true)
    dispatch.retrieveUserVideos()
  }

  const handleImgUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    const { name, size } = file
    if (size > 1024 * 1024) {
      commonDispatch.SET_DIALOG({
        title: '提示',
        content: '请选择小于1MB的图片',
        status: true,
      })
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)
    const res = await dispatch.uploadImage({ fileName: name, formData })
    if (!res || res.code !== 200) {
      setLoading(false)
      return
    }

    // 更改用户信息
    const user = JSON.parse(JSON.stringify(userInfo))
    user.avatar_url = `${UPYUN_URL}${res.url as string}`
    await dispatch.editUserInfo(user)
    setLoading(false)
  }
  return (
    <div className="bd7-user">
      <div className="bd7-user__title">
        <Typography variant="subtitle1">我和我的抖音 - 第7组</Typography>
      </div>
      <Divider />
      <div className="bd7-user__banner">
        <div className="bd7-user__banner__left">
          <div className="bd7-user__banner__left__avatar">
            <label htmlFor="bd7-user__banner__left__avatar-upload">
              <Avatar
                alt={userInfo.username}
                className={classes.avatar}
                src={userInfo.avatar_url}
              />
            </label>
            <input
              accept="image/png, image/jpeg, image/jpg"
              id="bd7-user__banner__left__avatar-upload"
              onChange={handleImgUpload}
              type="file"
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
            编辑信息
          </Button>

          <Button
            color="secondary"
            onClick={() => {
              commonDispatch.LOGOUT()
            }}
            size="small"
            variant="outlined"
          >
            退出登录
          </Button>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="bd7-user__profile-wrapper">
        <Typography
          noWrap
          onClick={() => {
            setProfileEditing(true)
          }}
          variant="caption"
        >
          {userInfo.profile || '你还没有填写个人简介，点击添加...'}
        </Typography>

        <div className="bd7-user__follow-wrapper">
          <div className="bd7-user__followings">
            <Typography color="secondary" component="div" variant="subtitle2">
              {userInfo.following?.length}
            </Typography>
            &nbsp;关注
          </div>

          <div className="bd7-user__followers">
            <Typography color="secondary" component="div" variant="subtitle2">
              {userInfo.followers?.length}
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
        {state.userVideos.map((video) => (
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

      {/* ========================================================== */}
      {/* ========================= DIALOG ========================= */}
      {/* ========================================================== */}

      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={() => {
          setProfileEditing(false)
        }}
        open={profileEditing}
      >
        <DialogTitle>修改简介</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue={profile}
            fullWidth
            label="个人简介"
            margin="dense"
            onChange={(e) => {
              setProfile(e.target.value)
            }}
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setProfileEditing(false)
            }}
          >
            取消
          </Button>
          <Button
            color="secondary"
            onClick={handleProfileEditDialogConfirm}
            variant="contained"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={() => {
          setVideoUploading(false)
          setVideo(null)
          setDescription('')
        }}
        open={videoUploading}
      >
        <DialogTitle>上传视频</DialogTitle>
        <DialogContent>
          {video && (
            <DialogContentText component="div">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                已选中视频文件：{video.name}
                <label
                  htmlFor="bd7-user__video-upload"
                  style={{ margin: '0 10px' }}
                >
                  <Button
                    color="secondary"
                    component="span"
                    size="small"
                    variant="contained"
                  >
                    更改
                  </Button>
                </label>
              </div>
              <TextField
                autoFocus
                defaultValue={description}
                fullWidth
                label="视频描述"
                margin="dense"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                placeholder="可以为空"
                type="text"
              />
            </DialogContentText>
          )}
          <div className={video ? 'non-display' : ''}>
            <input
              accept="video/mp4, video/mpeg, video/3gpp"
              id="bd7-user__video-upload"
              onChange={handleVideoAdd}
              type="file"
            />
            <label htmlFor="bd7-user__video-upload">
              <Button
                color={video ? 'secondary' : 'primary'}
                component="span"
                variant="contained"
              >
                点击添加视频
              </Button>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setVideoUploading(false)
              setVideo(null)
              setDescription('')
            }}
          >
            取消
          </Button>
          <Button
            color="secondary"
            disabled={!video}
            onClick={handleVideoUploadDialogConfirm}
            variant={!video ? 'outlined' : 'contained'}
          >
            上传
          </Button>
        </DialogActions>
      </Dialog>

      {/* =========================================================== */}
      {/* ======================= TOP Z-INDEX ======================= */}
      {/* =========================================================== */}

      <Fab
        aria-label="add"
        className={classes.fab}
        color="secondary"
        onClick={() => {
          setVideoUploading(true)
        }}
        size="medium"
      >
        <AddIcon />
      </Fab>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(User))
