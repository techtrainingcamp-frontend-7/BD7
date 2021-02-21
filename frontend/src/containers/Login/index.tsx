import { user } from '@/utils/request'
import { RootDispatch, RootState, store } from '@/store'

import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Typography, TextField, Button } from '@material-ui/core'

import './index.less'

const globalDispatch = store.dispatch
const mapState = (state: RootState) => ({
  state: state.login,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.login,
})
export type LoginProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const Login: FC<LoginProps> = ({ dispatch }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  return (
    <div className="bd7-login">
      <Typography className="bd7-login-title" variant="h5">
        登陆我的账户
      </Typography>
      <form
        className="bd7-login-form"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!username || !password) return

          setLoggingIn(true)
          const registeredUser = await user.login({
            username,
            password,
          })
          if (registeredUser?.username === username) {
            dispatch.SET_LOGSTATUS(true)
            globalDispatch.common.SET_SNACKSTATUS(true)
            globalDispatch.common.SET_SNACKCONTENT('登陆成功')
            globalDispatch.user.SET_USERINFO({
              username,
            })
            return
          }
          setLoggingIn(false)
        }}
      >
        <TextField
          className="bd7-login-input-username"
          color="primary"
          label="用户名"
          name="username"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
          size="small"
          type="text"
          value={username}
        />
        <TextField
          className="bd7-login-input-password"
          label="密码"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          size="small"
          type="password"
          value={password}
        />

        <label
          className="bd7-login-input-submit-button"
          htmlFor="bd7-login-input-submit"
        >
          <Button
            color="secondary"
            component="span"
            disabled={!username || !password || loggingIn}
            variant="contained"
          >
            登陆
          </Button>
        </label>
        <input
          className="bd7-login-input-submit"
          id="bd7-login-input-submit"
          type="submit"
          value="登陆"
        />
      </form>
      <div className="bd7-login-to-register">
        <Button color="secondary" variant="contained">
          <Link to="/register">注册新账户</Link>
        </Button>
      </div>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Login))
