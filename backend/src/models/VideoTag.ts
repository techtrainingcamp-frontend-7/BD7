import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import Video from './Video'
import Tag from './Tag'

export enum VideoTagLinked {
  LINKED = 1,
  LINK_CANCELED = 0,
}

class VideoTag extends Model {
  vid!: number
  tid!: number
  linked!: VideoTagLinked
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

VideoTag.init(
  {
    vid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '视频 id',
      primaryKey: true,
      references: {
        model: Video,
        key: 'id',
      },
    },
    tid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '标签 id',
      primaryKey: true,
      references: {
        model: Tag,
        key: 'id',
      },
    },
    linked: {
      type: DataTypes.BOOLEAN,
      comment: '视频是否有这个标签',
      allowNull: false,
      defaultValue: VideoTagLinked.LINKED,
    },
  },
  {
    sequelize,
    tableName: 'video_tag',
  },
)

export default VideoTag
