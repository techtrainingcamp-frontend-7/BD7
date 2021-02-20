import { RootDispatch, RootState } from '@/store'

import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './index.less'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    height: '100%',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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

const User: FC<UserProps> = ({ state, dispatch, history }) => {
  useEffect(() => {
    setTimeout(() => {
      dispatch.retrieveUserInfo()
    }, 0)
  }, [])
  const userInfo = state.userInfo

  const classes = useStyles()
  return (
    <div className="bd7-user">
      <div className="bd7-user__banner">
        <div className="bd7-user__banner__avatar">
          <Avatar
            alt={userInfo.username}
            className={classes.avatar}
            src={
              userInfo.avatar_url ||
              'https://thirdwx.qlogo.cn/mmopen/vi_32/T9iaIoZ6mzpamJXE60lSwkVS5icHaVPxrWTndLdXrHwVw1dHANF7mhCC3EiaafpGKt3e9dOvGOI8hrXicicnqAicMa7Q/132'
            }
          />
        </div>
        <div className="bd7-user__banner__editWrapper">
          <Button color="primary" size="small" variant="outlined">
            编辑信息
          </Button>
        </div>
      </div>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(User))
