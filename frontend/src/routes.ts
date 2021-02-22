import { RouteProps } from 'react-router-dom'
import Admin from './containers/Admin'
import Demo from './containers/Demo'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import User from './containers/User'

export enum PathName {
  USER = '/user',
  LOGIN = '/login',
  REGISTER = '/register',
  DEMO = '/demo',
  HOME = '/',
  ADMIN_ROOT = '/admin',
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
    path: PathName.USER,
    component: User,
  },
  {
    path: PathName.DEMO,
    component: Demo,
  },
  {
    path: PathName.ADMIN_ROOT,
    component: Admin,
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
