import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import User from './User';

interface FriendsAttributes {
  friendship_id?: number;
  friend_one_id: number;
  friend_two_id: number;
}

interface FriendsCreationAttributes extends Optional<FriendsAttributes, 'friendship_id'> {}

class Friends extends Model<FriendsAttributes, FriendsCreationAttributes> 
  implements FriendsAttributes {
  public friendship_id!: number;
  public friend_one_id!: number;
  public friend_two_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public checkFriends(): void {
    if (this.friend_one_id === this.friend_two_id) {
      throw new Error('Cannot be friends with yourself');
    }
  }
}

Friends.init(
  {
    friendship_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    friend_one_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    friend_two_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Friends',
    indexes: [
      {
        unique: true,
        fields: ['friend_one_id', 'friend_two_id'],
      },
    ],
    validate: {
      checkFriends() {
        if (this.friend_one_id === this.friend_two_id) {
          throw new Error('Cannot be friends with yourself');
        }
      },
    },
  }
);

export default Friends;