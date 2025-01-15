import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../config/database';
//
interface CommentAttributes {
  id: number;
  post_id: number;
  user_id: number;
  user_name?: string;
  user_profile_picture?: string;
  comment_content: string;
  likes?: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> 
    implements CommentAttributes {
  public id!: number;
  public post_id!: number;
  public user_id!: number;
  public user_name?: string;
  public user_profile_picture?: string;
  public comment_content!: string;
  public likes?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
  },
  {
    sequelize, 
    timestamps: true, 
  }
);

export default Comment;
