import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

interface CommentAwnsersLikesAttributes {
  awnser_id: number;
  comment_id: number;
  post_id: number;
  user_id: number;
}

class CommentAwnsersLikes extends Model<CommentAwnsersLikesAttributes> 
    implements CommentAwnsersLikesAttributes {
  public awnser_id!: number;
  public comment_id!: number;
  public post_id!: number;
  public user_id!: number;
}

CommentAwnsersLikes.init(
  {
    awnser_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'comment_awnsers_likes',
  }
);

export default CommentAwnsersLikes;
