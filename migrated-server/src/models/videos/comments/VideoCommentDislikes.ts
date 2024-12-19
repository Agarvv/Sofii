import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

interface VideoCommentDislikesAttributes {
  comment_id: number;
  video_id: number;
  user_id: number;
}

const VideoCommentDislikes = sequelize.define<Model<VideoCommentDislikesAttributes>>('VideoCommentDislikes', {
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
  tableName: 'video_comment_dislikes'
});

export default VideoCommentDislikes;