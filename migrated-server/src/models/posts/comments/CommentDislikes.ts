import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface CommentDislikesAttributes {
  comment_id: number;
  post_id: number;
  user_id: number;
}

const CommentDislikes = sequelize.define<Model<CommentDislikesAttributes>>('CommentDislikes', {
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
  tableName: 'comment_dislikes'
});

export default CommentDislikes;