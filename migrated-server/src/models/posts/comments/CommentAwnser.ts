import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../config/database';

interface CommentAnswerAttributes {
  id: number;
  post_id: number;
  comment_id: number;
  user_id: number;
  answer_content: string;
}

interface CommentAnswerCreationAttributes extends Optional<CommentAnswerAttributes, 'id'> {}

class CommentAnswer extends Model<CommentAnswerAttributes, CommentAnswerCreationAttributes>
  implements CommentAnswerAttributes {
  public id!: number;
  public post_id!: number;
  public comment_id!: number;
  public user_id!: number;
  public answer_content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentAnswer.init(
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
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answer_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    timestamps: true, 
  }
);

export default CommentAnswer;
