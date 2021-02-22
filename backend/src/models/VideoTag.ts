import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import Video from './Video'
import Tag from './Tag'

export enum VideoTagLinked {
  LINKED = 1,
  LINK_CANCELED = 0,
}

class VideoTag extends Model {
  id!: number
  vid!: number
  tid!: number
  linked!: VideoTagLinked
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

VideoTag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增字段（主键）',
    },
    vid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '视频 id',
      references: {
        model: Video,
        key: 'id',
      },
    },
    tid: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: '标签 id',
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
