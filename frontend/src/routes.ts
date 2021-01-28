import { Home } from './containers/Home'

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
  },
]

export interface RouteConfig {
  /* 路由路径 */
  path: string
  /* 需要渲染的组件 */
  component: React.FC
  /* 子路由 */
  routes?: RouteConfig[]
}
