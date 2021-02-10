import { RouteProps } from 'react-router-dom'
import Demo from './containers/Demo'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/demo',
    component: Demo,
  },
  {
    path: '/',
    component: Home,
    routeProps: {
      exact: true,
    },
  },
]

export interface RouteConfig {
  /* 路由路径 */
  path: string
  /* 需要渲染的组件 */
  component: any
  /* 子路由 */
  routes?: RouteConfig[]
  routeProps?: RouteProps
}
