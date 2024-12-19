import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database';

interface ChatAttributes {
  chat_id?: number;
  sender_id: number;
  receiver_id: number;
  last_message?: string;
}

const Chat = sequelize.define<Model<ChatAttributes>>('Chat', {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  last_message: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});

export default Chat;