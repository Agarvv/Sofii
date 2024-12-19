import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

interface VideoCommentLikesAttributes {
  comment_id: number;
  video_id: number;
  user_id: number;
}

const VideoCommentLikes = sequelize.define<Model<VideoCommentLikesAttributes>>('VideoCommentLikes', {
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'video_comment_likes'
});

export default VideoCommentLikes;