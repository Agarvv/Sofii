import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

interface FriendRequestAttributes {
  id?: number;
  friend_target: number;
  request_sender_id: number;
}

interface FriendRequestCreationAttributes extends Optional<FriendRequestAttributes, 'id'> {}

class FriendRequest extends Model<FriendRequestAttributes, FriendRequestCreationAttributes> 
  implements FriendRequestAttributes {
  public id!: number;
  public friend_target!: number;
  public request_sender_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FriendRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    friend_target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    request_sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'FriendRequest',
  }
);

export default FriendRequest;