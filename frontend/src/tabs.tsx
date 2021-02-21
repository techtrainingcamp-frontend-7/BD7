import React from 'react'
import classNames from 'classnames'
import { PathName } from './routes'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'

/* Tab ID */
export enum TabType {
  HOME = 'home',
  ME = 'me',
}

/* 点击后跳转的路由 */
export const tabRoutes: { [key in TabType]: PathName } = {
  [TabType.HOME]: PathName.HOME,
  [TabType.ME]: PathName.LOGIN,
}

/* 路由所处的 Tab */
export const path2Tab: { [key in PathName]?: TabType } = {
  [PathName.LOGIN]: TabType.ME,
  [PathName.REGISTER]: TabType.ME,
  [PathName.USER]: TabType.ME,
  [PathName.DEMO]: TabType.ME,
  [PathName.HOME]: TabType.HOME,
}

/* Tab 名称 */
export const tabNames = {
  [TabType.HOME]: '主页',
  [TabType.ME]: '我',
}

export const Tabs: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  // 管理后台不需要 Tab
  if (location.pathname.startsWith(PathName.ADMIN_ROOT)) return null
  return (
    <ButtonGroup
      aria-label="outlined primary button group"
      className="App-tabs"
      color="primary"
    >
      {Object.keys(tabNames).map((id) => (
        <Button
          className={classNames(`App-tabs-items App-tabs-${id}`, {
            selected: path2Tab[location.pathname as PathName] === id,
          })}
          color={
            path2Tab[location.pathname as PathName] === id
              ? 'secondary'
              : 'primary'
          }
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
      ))}
    </ButtonGroup>
  )
}
