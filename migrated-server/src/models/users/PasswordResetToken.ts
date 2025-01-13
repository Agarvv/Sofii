import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface PasswordResetTokenAttributes {
  token: string;
  expires_at: Date;
  used: boolean;
  user_email: string; 
}

interface PasswordResetTokenCreationAttributes
  extends Optional<PasswordResetTokenAttributes, 'used'> {}

class PasswordResetToken
  extends Model<PasswordResetTokenAttributes, PasswordResetTokenCreationAttributes>
  implements PasswordResetTokenAttributes {
  public token!: string;
  public expires_at!: Date;
  public used!: boolean;
  public user_email!: string; 

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
    user_email: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PasswordResetToken',
  },
);

export default PasswordResetToken;