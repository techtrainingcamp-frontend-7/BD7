import UserService from './UserService'
import UploadService from './UploadService'
import VideoService from './VideoService'
import LiveService from './LiveService'

export { UserService, UploadService, VideoService, LiveService }

export default {
  User: UserService,
  Upload: UploadService,
  Video: VideoService,
  Live: LiveService,
}
