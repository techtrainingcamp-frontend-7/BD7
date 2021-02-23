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
  CardMedia,
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
  IconButton,
  CardContent,
  CardActions,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { Add as AddIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { UPYUN_URL } from '@/utils/const'

import { Video } from '@/utils/request/video'

import './index.less'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1300,
    color: '#fff',
  },
  fab: {
    zIndex: theme.zIndex.drawer,
    position: 'fixed',
    right: '5%',
    bottom: '60px',
  },
  videoItem: {
    maxWidth: 'calc(50% - 20px)',
    minWidth: 'calc(50% - 20px)',
    margin: '5px 10px',
  },
  media: {
    height: 140,
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
  const [videoPoster, setVideoPoster] = useState(null as any)
  const [description, setDescription] = useState('')
  const [videoDescEditingIndex, setVideoDescEditingIndex] = useState(-1)
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
  const handleVideoPosterAdd = (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    const { size } = file
    if (size > 1024 * 1024 * 5) {
      commonDispatch.SET_DIALOG({
        title: '提示',
        content: '请选择小于5MB的封面',
        status: true,
      })
      return
    }
    setVideoPoster(file)
  }

  const handleVideoUploadDialogConfirm = async () => {
    if (!video) {
      commonDispatch.SET_DIALOG({
        title: '提示',
        content: '请选择视频',
        status: true,
      })
      return
    }
    const videoFormData = new FormData()
    videoFormData.append('file', video)

    setLoading(true)
    let poster_url: string | undefined
    if (videoPoster) {
      const videoPosterFormData = new FormData()
      videoPosterFormData.append('file', videoPoster)
      // 上传视频封面
      const posterRes = await dispatch.uploadImage({
        fileName: videoPoster.name,
        formData: videoPosterFormData,
      })
      if (!posterRes || posterRes.code !== 200) {
        setLoading(false)
        return
      }
      poster_url = posterRes.url as string
    }

    // 上传视频
    let res = await dispatch.uploadVideo({
      fileName: video.name,
      formData: videoFormData,
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
    if (poster_url) {
      videoData.poster_url = `${UPYUN_URL}${poster_url}`
    }
    res = await dispatch.createVideo(videoData)
    if (res && !res.code) {
      // 后端保存成功
      setVideoPoster(null)
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
            <label
              htmlFor="bd7-user__banner__left__avatar-upload"
              title="点击修改头像"
            >
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
        {state.userVideos.length ? (
          state.userVideos.map((video, idx) => (
            <Card
              className={classes.videoItem}
              key={video.id}
              onClick={() => {
                history.push(`${PathName.SINGLE_PLAYER}?id=${String(video.id)}`)
              }}
              variant="outlined"
            >
              <CardMedia
                className={classes.media}
                image={`${
                  video.poster_url ||
                  'https://qcloudtest-1256492673.cos.ap-guangzhou.myqcloud.com/201902221550826875449034.png'
                }`}
                title={video.description}
              />
              <CardContent>
                <Typography component="p" variant="body2">
                  {video.description || '暂无描述...'}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="编辑描述"
                  onClick={(e) => {
                    e.stopPropagation()
                    setVideoDescEditingIndex(idx)
                  }}
                  title="点击编辑描述"
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        ) : (
          <div className="bd7-user__video-list--loading">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/* ========================= DIALOG ========================= */}
      {/* ========================================================== */}

      <Dialog
        aria-labelledby="video-profile-editor"
        onClose={() => {
          setVideoDescEditingIndex(-1)
        }}
        open={videoDescEditingIndex !== -1}
      >
        <DialogTitle>修改视频简介</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue={
              state.userVideos?.[videoDescEditingIndex]?.description
            }
            fullWidth
            label="视频简介"
            multiline
            onChange={(e) => {
              dispatch.SET_VIDEO_DESC({
                index: videoDescEditingIndex,
                description: e.target.value,
              })
            }}
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setVideoDescEditingIndex(-1)
            }}
          >
            取消
          </Button>
          <Button
            color="secondary"
            onClick={async () => {
              await dispatch.editUserVideoInfo(
                state.userVideos?.[videoDescEditingIndex],
              )
              setVideoDescEditingIndex(-1)
            }}
            variant="contained"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

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
            multiline
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
                  margin: 10,
                  justifyContent: 'space-between',
                }}
              >
                {videoPoster?.name
                  ? `已选中视频封面：${videoPoster?.name as string}`
                  : '未选择封面'}
                <label
                  htmlFor="bd7-user__video-poster-upload"
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
              <Divider />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 10,
                }}
              >
                已选中视频文件：{video?.name}
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
                multiline
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
              accept="image/png, image/jpeg, image/jpg"
              id="bd7-user__video-poster-upload"
              onChange={handleVideoPosterAdd}
              type="file"
            />
            <label htmlFor="bd7-user__video-poster-upload">
              <Button
                color={video ? 'secondary' : 'primary'}
                component="span"
                disabled={videoPoster !== null}
                style={{
                  margin: 10,
                  minWidth: 250,
                }}
                variant="contained"
              >
                点击添加视频封面
              </Button>
            </label>

            <Divider />
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
                style={{
                  margin: 10,
                  minWidth: 250,
                }}
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
