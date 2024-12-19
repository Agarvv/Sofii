import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface CommentAnswerAttributes {
  post_id: number;
  comment_id: number;
  user_id: number;
  answer_content: string;
}

const CommentAnswer = sequelize.define<Model<CommentAnswerAttributes>>('CommentAnswer', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  answer_content: { 
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'comment_answers', 
  timestamps: true 
});

export default CommentAnswer;