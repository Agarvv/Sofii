import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import User from '../users/User'

interface VideoAttributes {
  id?: number;
  video_user_id: number;
  video_private?: boolean;
  video_only_friends?: boolean;
  video_description?: string;
  video_content: string;
}

const Video = sequelize.define<Model<VideoAttributes>>('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  video_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  video_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  video_only_friends: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  video_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  video_content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'videos'
});

export default Video;