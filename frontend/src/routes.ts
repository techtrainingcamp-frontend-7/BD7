import { RouteProps } from 'react-router-dom'
import Demo from './containers/Demo'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'

export enum PathName {
  LOGIN = '/login',
  REGISTER = '/register',
  DEMO = '/demo',
  HOME = '/',
}

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
  {
    path: PathName.LOGIN,
    component: Login,
  },
  {
    path: PathName.REGISTER,
    component: Register,
  },
  {
    path: PathName.DEMO,
    component: Demo,
  },
  {
    path: PathName.HOME,
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
