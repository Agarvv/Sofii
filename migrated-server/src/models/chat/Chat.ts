import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface ChatAttributes {
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  last_message?: string;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'chat_id'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public chat_id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public last_message?: string;

}

Chat.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Chat',
    timestamps: false
  }
);

export default Chat;
