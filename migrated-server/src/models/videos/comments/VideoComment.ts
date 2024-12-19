import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';


interface VideoCommentsAttributes {
  video_id: number;
  user_id: number;
  comment_content: string;
}

const VideoComments = sequelize.define<Model<VideoCommentsAttributes>>('VideoComments', {
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment_content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'video_comments'
});

export default VideoComments;