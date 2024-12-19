import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

interface PostAttributes {
  id?: number;
  description: string;
  postPicture?: string;
  private: boolean;
  only_friends: boolean;
  user_id: number;
  user_name: string;
  user_img?: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'postPicture' | 'user_img'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public description!: string;
  public postPicture?: string;
  public private!: boolean;
  public only_friends!: boolean;
  public user_id!: number;
  public user_name!: string;
  public user_img?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postPicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    only_friends: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      allowNull: false,
    },
    user_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'Post',
  }
);

export default Post;