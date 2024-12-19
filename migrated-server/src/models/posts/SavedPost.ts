import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface SavedAttributes {
  user_id: number;
  post_id: number;
}

const Saved = sequelize.define<Model<SavedAttributes>>('Saved', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'saves' 
});

export default Saved;