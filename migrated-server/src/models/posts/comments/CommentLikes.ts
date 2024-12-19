import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';

const CommentLikes = sequelize.define('CommentLikes', {
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
});

export default CommentLikes;