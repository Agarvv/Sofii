import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';



interface MessageAttributes {
  id?: number; 
  message_room_id: number;
  message_user_id: number;
  message_content: string;
  message_color?: string;
  withFile?: boolean;
  fileType?: string;
  fileSource?: string; 
  readed?: boolean;
}


interface MessageInstance extends Model<MessageAttributes>, MessageAttributes {}

const Message = sequelize.define<MessageInstance>('Message', {
  id: {  
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message_room_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  withFile: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fileSource: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  readed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'messages'
});

export default Message;