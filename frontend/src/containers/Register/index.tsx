import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { user } from '@/utils/request'
import { PathName } from '@/routes'

import './index.less'

export interface RegisterProps extends RouteComponentProps {}

let timeout = 3

const Register: FC<RegisterProps> = ({ history }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [registering, setRegistering] = useState(false)

  return (
    <div className="bd7-register">
      <h2>注册新账户</h2>
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
            alert(
              `注册成功，点击确定后将在 ${timeout} 时间内重定向到登录页面...`,
            )
            const interval = setInterval(() => {
              timeout--

              if (timeout === 0) {
                clearInterval(interval)
                history.push(PathName.LOGIN)
              }
            }, 1000)
          }
          setRegistering(false)
        }}
      >
        <label htmlFor="username">用户名</label>
        <input
          className="bd7-register-input-username"
          name="username"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
          type="text"
          value={username}
        />
        <label htmlFor="password">密码</label>
        <input
          className="bd7-register-input-password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          value={password}
        />
        <input
          className={classNames('bd7-register-input-submit', {
            disabled: !username || !password || registering,
          })}
          type="submit"
          value="注册"
        />
      </form>
    </div>
  )
}

export default withRouter(Register)
