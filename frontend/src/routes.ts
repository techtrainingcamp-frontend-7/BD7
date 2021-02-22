import { RouteProps } from 'react-router-dom'
import Admin from './containers/Admin'
import Demo from './containers/Demo'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import User from './containers/User'
import OtherUser from './containers/OtherUser'
import SinglePlayer from './containers/SinglePlayer'
import NotFoundPage from './containers/NotFoundPage'

export enum PathName {
  OTHER_USER = '/user/:username',
  USER = '/user',
  LOGIN = '/login',
  REGISTER = '/register',
  DEMO = '/demo',
  SINGLE_PLAYER = '/video',
  NOT_FOUND_PAGE = '/404',
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
    path: PathName.OTHER_USER,
    component: OtherUser,
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
    path: PathName.SINGLE_PLAYER,
    component: SinglePlayer,
  },
  {
    path: PathName.NOT_FOUND_PAGE,
    component: NotFoundPage,
    routeProps: {
      exact: true,
    },
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
