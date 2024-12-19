import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface CommentAttributes {
  post_id: number;
  user_id: number;
  user_name?: string;
  user_profile_picture?: string;
  comment_content: string;
  likes?: number;
}

const Comment = sequelize.define<Model<CommentAttributes>>('Comment', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_profile_picture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  comment_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  }
}, {
  tableName: 'comment'
});

export default Comment;