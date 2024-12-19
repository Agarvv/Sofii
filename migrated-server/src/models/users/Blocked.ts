import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

interface BlockedAttributes {
  id?: number; 
  blocked_id: number;
  blocker_id: number;
}

interface BlockedCreationAttributes extends Optional<BlockedAttributes, 'id'> {}

class Blocked extends Model<BlockedAttributes, BlockedCreationAttributes> 
  implements BlockedAttributes {
  public id!: number;
  public blocked_id!: number;
  public blocker_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blocked.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blocked_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blocker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Blocked',
  }
);

export default Blocked;