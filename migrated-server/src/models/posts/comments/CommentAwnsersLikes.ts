import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';


interface CommentAwnsersLikesAttributes {
  awnser_id: number;
  comment_id: number;
  post_id: number;
  user_id: number;
}

const CommentAwnsersLikes = sequelize.define<Model<CommentAwnsersLikesAttributes>>('CommentAwnsersLikes', {
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
  tableName: 'comment_awnsers_likes'
});

export default CommentAwnsersLikes;