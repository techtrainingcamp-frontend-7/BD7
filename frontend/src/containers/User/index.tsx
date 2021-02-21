import { RootDispatch, RootState, store } from '@/store'

import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
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
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './index.less'
import { UPYUN_URL } from '@/utils/const'
import { request } from '@/utils'

const globalDispatch = store.dispatch
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    height: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
const mapState = (state: RootState) => ({
  state: state.user,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.user,
})
export type UserProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

export enum GenderCN {
  '未知' = 0,
  '男' = 1,
  '女' = 2,
}
const User: FC<UserProps> = ({ state, dispatch, history }) => {
  useEffect(() => {
    setTimeout(() => {
      dispatch.retrieveUserInfo()
    }, 0)
  }, [])
  const [loading, setLoading] = useState(false)
  const [profileEditing, setProfileEditing] = useState(false)
  const [profile, setProfile] = useState(state.userInfo.profile || '')
  const handleProfileEditDialogConfirm = async () => {
    setLoading(true)
    await request.user.edit({
      ...state.userInfo,
      profile,
    })
    setProfileEditing(false)
    setLoading(false)
  }
  const userInfo = state.userInfo

  const classes = useStyles()

  const handleImgUpload = async (e: any) => {
    const file = e.target.files[0]
    const { name, size } = file
    if (size > 1024 * 1024) {
      globalDispatch.common.SET_DIALOG({
        title: '提示',
        content: '请上传小于1MB的图片',
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
    const user = JSON.parse(JSON.stringify(state.userInfo))
    user.avatar_url = `${UPYUN_URL}${res.url as string}`
    await request.user.edit(user)
    setLoading(false)
    // globalDispatch.common.SET_SNACKSTATUS(true)
    // globalDispatch.common.SET_SNACKCONTENT('上传头像成功')
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
          <Button color="primary" size="small" variant="outlined">
            编辑信息
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
      <Typography variant="subtitle1">已发布视频</Typography>

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
          <Button color="primary" onClick={handleProfileEditDialogConfirm}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(User))
