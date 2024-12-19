import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';


interface PasswordResetTokenAttributes {
  token: string;
  expires_at: Date;
  used: boolean;
  user_id?: number;
}

interface PasswordResetTokenCreationAttributes 
  extends Optional<PasswordResetTokenAttributes, 'used' | 'user_id'> {}

class PasswordResetToken 
  extends Model<PasswordResetTokenAttributes, PasswordResetTokenCreationAttributes> 
  implements PasswordResetTokenAttributes {
  public token!: string;
  public expires_at!: Date;
  public used!: boolean;
  public user_id?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PasswordResetToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'PasswordResetToken',
  }
);

export default PasswordResetToken;