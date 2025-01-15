import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface SavedAttributes {
  user_id: number;
  post_id: number;
}

interface SavedCreationAttributes extends Optional<SavedAttributes, 'user_id' | 'post_id'> {}

class Saved extends Model<SavedAttributes, SavedCreationAttributes> implements SavedAttributes {
  public user_id!: number;
  public post_id!: number;
}

Saved.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, 
    tableName: 'saves',
  }
);

export default Saved;