// in src/App.js
import * as React from 'react'
import { Admin, Resource } from 'react-admin'
import { fetchUtils } from 'ra-core'
import simpleRestProvider from 'ra-data-simple-rest'
import { Route, useHistory } from 'react-router-dom'
import { ACCESS_TOKEN_NAME } from '@/utils/const'
import { PathName } from '@/routes'
import { UserCreate, UserEdit, UserList } from './user'
import { VideoCreate, VideoEdit, VideoList } from './video'
import AccountIcon from '@material-ui/icons/AccountCircle'
import VideoLibIcon from '@material-ui/icons/VideoLibrary'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import CommentIcon from '@material-ui/icons/Comment'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import LabelIcon from '@material-ui/icons/Label'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import {
  UserLikeVideoCreate,
  UserLikeVideoEdit,
  UserLikeVideoList,
} from './user-like-video'
import {
  UserPlayVideoEdit,
  UserPlayVideoCreate,
  UserPlayVideoList,
} from './user-play-video'
import { LiveCreate, LiveEdit, LiveList } from './live'
import {
  LiveCommentCreate,
  LiveCommentList,
  LiveCommentEdit,
} from './live-comment'
import { TagCreate, TagEdit, TagList } from './tag'
import { VideoTagCreate, VideoTagEdit, VideoTagList } from './video-tag'
import { FollowingCreate, FollowingEdit, FollowingList } from './following'
import { Dashboard } from './dashboard'

export const AdminApp: React.FC = () => {
  const history = useHistory()
  const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    if (!token) {
      history.push(PathName.LOGIN)
    }
    options.user = {
      authenticated: true,
      token: `Bearer ${token as string}`,
    }
    return await fetchUtils.fetchJson(url, options)
  }

  return (
    <Admin
      customRoutes={[
        <Route exact key="/admin" path="/admin" render={Dashboard} />,
      ]}
      dataProvider={simpleRestProvider('/api', httpClient, 'X-Total-Count')}
      history={history}
    >
      <Resource
        create={UserCreate}
        edit={UserEdit}
        icon={AccountIcon}
        list={UserList}
        name="admin/user"
      />
      <Resource
        create={VideoCreate}
        edit={VideoEdit}
        icon={VideoLibIcon}
        list={VideoList}
        name="admin/video"
      />
      <Resource
        create={UserLikeVideoCreate}
        edit={UserLikeVideoEdit}
        icon={FavoriteIcon}
        list={UserLikeVideoList}
        name="admin/user-like-video"
      />
      <Resource
        create={UserPlayVideoCreate}
        edit={UserPlayVideoEdit}
        icon={PlaylistPlayIcon}
        list={UserPlayVideoList}
        name="admin/user-play-video"
      />
      <Resource
        create={LiveCreate}
        edit={LiveEdit}
        icon={LiveTvIcon}
        list={LiveList}
        name="admin/live"
      />
      <Resource
        create={LiveCommentCreate}
        edit={LiveCommentEdit}
        icon={CommentIcon}
        list={LiveCommentList}
        name="admin/live-comment"
      />
      <Resource
        create={TagCreate}
        edit={TagEdit}
        icon={LocalOfferIcon}
        list={TagList}
        name="admin/tag"
      />
      <Resource
        create={VideoTagCreate}
        edit={VideoTagEdit}
        icon={LabelIcon}
        list={VideoTagList}
        name="admin/video-tag"
      />
      <Resource
        create={FollowingCreate}
        edit={FollowingEdit}
        icon={PersonAddIcon}
        list={FollowingList}
        name="admin/following"
      />
    </Admin>
  )
}

export default AdminApp
