import React from 'react'
import classNames from 'classnames'
import { PathName } from './routes'
import { useHistory, useLocation } from 'react-router-dom'

/* Tab ID */
export enum TabType {
  HOME = 'home',
  ME = 'me',
}

/* 点击后跳转的路由 */
export const tabRoutes = {
  [TabType.HOME]: PathName.HOME,
  [TabType.ME]: PathName.LOGIN,
}

/* 路由所处的 Tab */
export const path2Tab: { [key in PathName]: TabType } = {
  [PathName.LOGIN]: TabType.ME,
  [PathName.REGISTER]: TabType.ME,
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
  return (
    <div className="App-tabs">
      {Object.keys(tabNames).map((id) => (
        <div
          className={classNames(`App-tabs-${id}`, {
            selected: path2Tab[location.pathname as PathName] === id,
          })}
          key={id}
          onClick={() => {
            history.push(tabRoutes[id as TabType])
          }}
        >
          {tabNames[id as TabType]}
        </div>
      ))}
    </div>
  )
}
