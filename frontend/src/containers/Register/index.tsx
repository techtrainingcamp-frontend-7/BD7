import React, { FC, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  Typography,
  Button,
  IconButton,
  TextField,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import { store } from '@/store'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { user } from '@/utils/request'
import classNames from 'classnames'
import { PathName } from '@/routes'

import './index.less'
const { dispatch } = store

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    form: {
      width: '40ch',
      padding: '30px 20px',
      borderRadius: 10,
      border: '1px solid white',
    },
    textfield: {
      padding: 10,
    },
  }),
)

export interface RegisterProps extends RouteComponentProps {}

const Register: FC<RegisterProps> = ({ history }) => {
  const classes = useStyles()
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
        className={classNames(
          'bd7-register-form',
          classes.margin,
          classes.form,
        )}
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
          className={classNames('bd7-login-input-username', classes.textfield)}
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
