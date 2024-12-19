import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

interface FollowerAttributes {
  id?: number;
  follower_id: number;
  follower_name?: string;
  follower_picture?: string;
  following_id: number;
  following_name?: string;
  following_picture?: string;
}

interface FollowerCreationAttributes extends Optional<FollowerAttributes, 'id'> {}

class Follower extends Model<FollowerAttributes, FollowerCreationAttributes> 
  implements FollowerAttributes {
  public id!: number;
  public follower_id!: number;
  public follower_name?: string;
  public follower_picture?: string;
  public following_id!: number;
  public following_name?: string;
  public following_picture?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    follower_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    follower_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    following_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'followers',
    modelName: 'Follower',
  }
);

export default Follower;