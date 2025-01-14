import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface NotificationsAttributes {
  id: number;
  user_id: number;
  user_target: number;
  notification_type: string;
  notification: string;
  type_id: number;
  readed?: boolean;
}

// Define los atributos opcionales para cuando se cree un nuevo registro.
type NotificationsCreationAttributes = Optional<NotificationsAttributes, 'id'>;

class Notifications extends Model<NotificationsAttributes, NotificationsCreationAttributes> 
  implements NotificationsAttributes {
  public id!: number;
  public user_id!: number;
  public user_target!: number;
  public notification_type!: string;
  public notification!: string;
  public type_id!: number;
  public readed?: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notifications.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    user_target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notification_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notification: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    readed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    timestamps: true,
  }
);

export default Notifications;
