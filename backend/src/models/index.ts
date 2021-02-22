import User from './User'
import Following from './Following'
import Video from './Video'
import Tag from './Tag'
import VideoTag from './VideoTag'
import UserLikeVideo from './UserLikeVideo'
import UserPlayVideo from './UserPlayVideo'
import Live from './Live'
import LiveComment from './LiveComment'

/**
 * Video : User
 * N : 1
 */
Video.belongsTo(User, {
  foreignKey: 'uid',
  onDelete: 'SET NULL',
})
User.hasMany(Video, {
  sourceKey: 'id',
  foreignKey: 'uid',
})
// UserLikeVideo：多对多关系
Video.belongsToMany(User, {
  through: UserLikeVideo,
  as: 'likedUsers',
  foreignKey: 'vid',
  otherKey: 'uid',
})
User.belongsToMany(Video, {
  through: UserLikeVideo,
  as: 'likedVideos',
  foreignKey: 'uid',
  otherKey: 'vid',
})

export {
  User,
  Following,
  Video,
  Tag,
  VideoTag,
  UserLikeVideo,
  UserPlayVideo,
  Live,
  LiveComment,
}
export default {
  User,
  Following,
  Video,
  Tag,
  VideoTag,
  UserLikeVideo,
  Live,
  LiveComment,
}
