import React from 'react'
import classNames from 'classnames'
import { PathName } from './routes'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'

/* Tab ID */
export enum TabType {
  HOME = 'home',
  LIVE_CENTER = 'live',
  ME = 'me',
}

/* 点击后跳转的路由 */
export const tabRoutes: { [key in TabType]: PathName } = {
  [TabType.HOME]: PathName.HOME,
  [TabType.LIVE_CENTER]: PathName.LIVE_CENTER,
  [TabType.ME]: PathName.LOGIN,
}

/* 路由所处的 Tab */
export const path2Tab: { [key in PathName]?: TabType } = {
  [PathName.LOGIN]: TabType.ME,
  [PathName.REGISTER]: TabType.ME,
  [PathName.USER]: TabType.ME,
  [PathName.DEMO]: TabType.ME,
  [PathName.LIVE_CENTER]: TabType.LIVE_CENTER,
  [PathName.SINGLE_PLAYER]: TabType.HOME,
  [PathName.HOME]: TabType.HOME,
}

/* Tab 名称 */
export const tabNames = {
  [TabType.HOME]: '主页',
  [TabType.LIVE_CENTER]: '直播',
  [TabType.ME]: '我',
}

export const Tabs: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  // 管理后台不需要 Tab
  if (location.pathname.startsWith(PathName.ADMIN_ROOT)) return null
  const pathName = location.pathname.split('/')[1]
  return (
    <ButtonGroup
      aria-label="outlined primary button group"
      className="App-tabs"
      color="primary"
    >
      {Object.keys(tabNames).map((id) => {
        const tabSeleted =
          path2Tab[location.pathname as PathName] === id || pathName === id
        return (
          <Button
            className={classNames(`App-tabs-items App-tabs-${id}`, {
              selected: tabSeleted,
            })}
            color={tabSeleted ? 'secondary' : 'primary'}
            key={id}
            onClick={() => {
              history.push(tabRoutes[id as TabType])
            }}
            style={{
              borderRadius: 0,
            }}
            variant="contained"
          >
            {tabNames[id as TabType]}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
