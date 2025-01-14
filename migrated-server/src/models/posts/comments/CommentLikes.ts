import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import sequelize from '../../../config/database';


interface CommentLikesAttributes {
    comment_id: number;
    post_id: number;
    user_id: number;
}

interface CommentLikesCreationAttributes extends Optional<CommentLikesAttributes, 'comment_id'> {}

class CommentLikes extends Model<CommentLikesAttributes, CommentLikesCreationAttributes> 
    implements CommentLikesAttributes {
    public comment_id!: number;
    public post_id!: number;
    public user_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CommentLikes.init(
    {
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
        timestamps: true, 
    }
);

export default CommentLikes;
