import { user } from '@/utils/request'
import { RootDispatch, RootState } from '@/store'

import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  Typography,
  TextField,
  Button,
  Link,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import classNames from 'classnames'

import './index.less'
import { PathName } from '@/routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    form: {
      padding: '30px 20px',
      borderRadius: 10,
      border: '1px solid white',
    },
    textfield: {
      padding: 10,
    },
  }),
)

const mapState = (state: RootState) => ({
  state: state.login,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.login,
  commonDispatch: dispatch.common,
})
export type LoginProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps

const Login: FC<LoginProps> = ({ dispatch, commonDispatch, history }) => {
  const classes = useStyles()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  return (
    <div className="bd7-login">
      <Typography className="bd7-login-title" variant="h5">
        登陆我的账户
      </Typography>
      <form
        className={classNames('bd7-login-form', classes.margin, classes.form)}
        onSubmit={async (e) => {
          e.preventDefault()
          if (!username || !password) return

          setLoggingIn(true)
          const registeredUser = await user.login({
            username,
            password,
          })
          if (registeredUser?.username === username) {
            commonDispatch.SET_USERINFO(registeredUser)
            commonDispatch.SET_SNACKSTATUS(true)
            commonDispatch.SET_SNACKCONTENT('登陆成功')
            return
          }
          setLoggingIn(false)
        }}
      >
        <TextField
          className={classNames('bd7-login-input-username', classes.textfield)}
          color="primary"
          fullWidth
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
          className={classNames('bd7-login-input-password', classes.textfield)}
          fullWidth
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
            color="primary"
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
        <Link
          onClick={() => {
            console.log('asdhj')
            history.push(PathName.REGISTER)
          }}
        >
          注册新账户
        </Link>
      </div>
    </div>
  )
}

export default connect(mapState, mapDispatch)(withRouter(Login))
