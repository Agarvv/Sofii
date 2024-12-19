import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

interface VideoCommentAwnsersLikesAttributes {
  awnser_id: number;
  comment_id: number;
  video_id: number;
  user_id: number;
}

const VideoCommentAwnsersLikes = sequelize.define<Model<VideoCommentAwnsersLikesAttributes>>('VideoCommentAwnsersLikes', {
  awnser_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
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
  tableName: 'video_comment_awnsers_likes'
});

export default VideoCommentAwnsersLikes;