import { RootDispatch, RootState } from '@/store'

import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Avatar, Button, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './index.less'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    height: '100%',
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
  const userInfo = state.userInfo

  const classes = useStyles()

  const handleImgUpload = async (e: any) => {
    const file = e.target.files[0]
    const { name } = file
    const formData = new FormData()
    formData.append('file', file)
    await dispatch.uploadImage({ fileName: name, formData })
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
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(User))
