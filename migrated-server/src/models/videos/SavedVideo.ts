import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';
import User from '../users/User'; 
import Video from './Video';

interface SavedVideoAttributes {
  id?: number;
  user_id: number;
  video_id: number;
}

const SavedVideo = sequelize.define<Model<SavedVideoAttributes>>('SavedVideo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Video,
      key: 'id'
    }
  }
}, {
  tableName: 'saved_videos'
});

export default SavedVideo;