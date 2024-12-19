import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

interface LikesAttributes {
  id?: number;
  post_id: number;
  user_id: number;
}

interface LikesCreationAttributes extends Optional<LikesAttributes, 'id'> {}

class Likes extends Model<LikesAttributes, LikesCreationAttributes> implements LikesAttributes {
  public id!: number;
  public post_id!: number;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Likes.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize: '@config/database',
    modelName: 'Likes',
    tableName: 'likes',
  }
);

export default Likes;