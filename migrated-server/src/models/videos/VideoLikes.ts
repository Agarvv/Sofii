import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface VideoLikesAttributes {
  video_id: number;
  user_id: number;
}

const VideoLikes = sequelize.define<Model<VideoLikesAttributes>>('VideoLikes', {
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'video_likes'
});

export default VideoLikes;