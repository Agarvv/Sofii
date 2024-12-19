import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface VideoCommentAwnserAttributes {
  video_id: number;
  comment_id: number;
  user_id: number;
  awnser_content: string;
}

const VideoCommentAwnser = sequelize.define<Model<VideoCommentAwnserAttributes>>('VideoCommentAwnser', {
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  awnser_content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'video_comment_awnser'
});

export default VideoCommentAwnser;