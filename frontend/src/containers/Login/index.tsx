import { PathName } from '@/routes'
import { user } from '@/utils/request'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

import './index.less'

export interface LoginProps extends RouteComponentProps {}

let timeout = 3

const Login: FC<LoginProps> = ({ history }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  return (
    <div className="bd7-login">
      <h2>登陆我的账户</h2>
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
            alert(`登陆成功，点击确定后将在 ${timeout} 时间内重定向到主页...`)
            const interval = setInterval(() => {
              timeout--

              if (timeout === 0) {
                clearInterval(interval)
                history.push(PathName.HOME)
              }
            }, 1000)
          }
          setLoggingIn(false)
        }}
      >
        <label htmlFor="username">用户名</label>
        <input
          className="bd7-login-input-username"
          name="username"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
          type="text"
          value={username}
        />
        <label htmlFor="password">密码</label>
        <input
          className="bd7-login-input-password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          value={password}
        />
        <input
          className={classNames('bd7-login-input-submit', {
            disabled: !username || !password || loggingIn,
          })}
          type="submit"
          value="登陆"
        />
      </form>
      <div className="bd7-login-to-register">
        <Link to="/register">注册新账户</Link>
      </div>
    </div>
  )
}

export default withRouter(Login)
