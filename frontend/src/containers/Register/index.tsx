import React, { FC, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Typography, TextField, Button, IconButton } from '@material-ui/core'
import { store } from '@/store'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { user } from '@/utils/request'
import { PathName } from '@/routes'

import './index.less'
const { dispatch } = store

export interface RegisterProps extends RouteComponentProps {}

const Register: FC<RegisterProps> = ({ history }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [registering, setRegistering] = useState(false)

  return (
    <div className="bd7-register">
      <div className="bd7-register-backward">
        <IconButton
          aria-label="back"
          onClick={() => {
            history.goBack()
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </div>
      <Typography className="bd7-login-title" variant="h5">
        注册账号
      </Typography>
      <form
        className="bd7-register-form"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!username || !password) return

          setRegistering(true)
          const registeredUser = await user.register({
            username,
            password,
          })
          if (registeredUser?.username === username) {
            dispatch.common.SET_SNACKSTATUS(true)
            dispatch.common.SET_SNACKCONTENT('注册成功, 跳转到登陆页面')
            history.push(PathName.LOGIN)
            return
          }
          setRegistering(false)
        }}
      >
        <TextField
          className="bd7-login-input-username"
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
          className="bd7-register-input-submit-button"
          htmlFor="bd7-register-input-submit"
        >
          <Button
            color="primary"
            component="span"
            disabled={!username || !password || registering}
            variant="contained"
          >
            注册
          </Button>
        </label>
        <input
          className="bd7-register-input-submit"
          id="bd7-register-input-submit"
          type="submit"
          value="注册"
        />
      </form>
    </div>
  )
}

export default withRouter(Register)
