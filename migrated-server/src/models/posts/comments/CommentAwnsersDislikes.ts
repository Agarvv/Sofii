import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

interface CommentAwnsersDislikesAttributes {
  awnser_id: number;
  comment_id: number;
  post_id: number;
  user_id: number;
}

const CommentAwnsersDislikes = sequelize.define<Model<CommentAwnsersDislikesAttributes>>('CommentAwnsersDislikes', {
  awnser_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comment_awnsers_dislikes'
});

export default CommentAwnsersDislikes;