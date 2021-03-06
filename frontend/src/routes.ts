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
import LiveCenter from './containers/LiveCenter'
import Live from './containers/LiveCenter/Live'
import { Chat } from './components/Chat'

export enum PathName {
  CHAT = '/chat',
  OTHER_USER = '/user/:username',
  _OTHER_USER = '/user',
  USER = '/user',
  LOGIN = '/login',
  REGISTER = '/register',
  DEMO = '/demo',
  SINGLE_PLAYER = '/video',
  NOT_FOUND_PAGE = '/404',
  LIVE = '/live/:uid',
  LIVE_CENTER = '/live',
  HOME = '/',
  ADMIN_ROOT = '/admin',
}

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
  {
    path: PathName.CHAT,
    component: Chat,
  },
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
    routeProps: {
      exact: true,
    },
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
    path: PathName.LIVE,
    component: Live,
  },
  {
    path: PathName.LIVE_CENTER,
    component: LiveCenter,
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
