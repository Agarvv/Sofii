import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface NotificationsAttributes {
  id?: number;
  user_id: number;
  user_target: number;
  notification_type: string;
  notification: string;
  type_id: number;
  readed?: boolean;
}

const Notifications = sequelize.define<Model<NotificationsAttributes>>('Notifications', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  user_target: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notification_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notification: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  readed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

export default Notifications;