import bcrypt from 'bcryptjs';
import User from  '@models/users/User'; 
import PasswordResetToken from '@models/users/PasswordResetToken';
import userRepository from '@repositories/user/UserRepository';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '@outils/CustomError';
import JwtHelper from '@helpers/JwtHelper';
import MailHelper from '@helpers/MailHelper';
import Account from '../../types/Account'

class AuthService {
  public static async registerUser(username: string, email: string, password: string): Promise<void> {
    if (await userRepository.existsByEmail(email)) {
      throw new CustomError("That email is already taken.", 409);
    }

    const hashedPassword = await this.hashPassword(password);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  public static async loginUser(email: string, password: string): Promise<{ userId: number, accessToken: string}> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("That email doesn't exist.", 400);
    }

    await this.ensurePasswordMatch(password, user.password);

    const jwtPayload = this.generateJwtPayload(user);

    const jwt = JwtHelper.generateToken(jwtPayload);

    return { userId: user.id, accessToken: jwt }
  }

  public static async sendResetPassword(email: string): Promise<void> {
    if (await userRepository.existsByEmail(email)) {
      const resetToken = this.generateResetToken();

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      await PasswordResetToken.create({
        token: resetToken,
        expires_at: expiresAt,
        used: false,
        user_email: email,
      });

      await this.sendResetEmail(email, resetToken);
    }
  }

  public static async resetPassword(email: string, newPassword: string, resetToken: string): Promise<void> {
    const user = await userRepository.findByEmail(email);

    if (user) {
      const dbResetToken = await PasswordResetToken.findOne({
        where: {
          user_email: email,
          token: resetToken, 
        },
      });

      if (dbResetToken && !this.isResetTokenExpired(dbResetToken)) {
        user.password = await this.hashPassword(newPassword);
        await user.save();
        await dbResetToken.destroy(); 
        return;
      }

      throw new CustomError("Your Reset Password Link Has Expired...", 400);
    }
  }
  
  public static async checkAuthentication(jwt: string): Promise<number> {
      const userDecoded = await JwtHelper.verifyToken(jwt); 
      
      if(userDecoded) return userDecoded.user_id; 
      
      throw new CustomError("You Aren't Authenticated.", 401); 
  }
  
  public static async registerBySocialMedia(user: any): Promise<User> {
      const randomPassword = Math.random().toString(36).slice(-8); 
      
      const hashedPassword = await this.hashPassword(randomPassword); 
      
      const newUser = await User.create({
          username: user.username,
          email: user.email,
          password: hashedPassword
      })
      
      return newUser; 
  }
  
  public static async authenticateWithSocialMedia(user: any): Promise<string> {
      const dbUser = await userRepository.findByEmail(user.email) 
      if(dbUser) {
          const payload = this.generateJwtPayload(dbUser); 
          
          const jwt = await JwtHelper.generateToken(payload) 
          
          return jwt; 
      }
      
      const newUser = await this.registerBySocialMedia(user) 
      
      const payload = this.generateJwtPayload(newUser); 
          
      const jwt = await JwtHelper.generateToken(payload) 
      
      return jwt; 
  }

  private static async hashPassword(rawPassword: string): Promise<string> {
    return await bcrypt.hash(rawPassword, 10);
  }

  private static async ensurePasswordMatch(original: string, hashed: string): Promise<void> {
    const isMatch = await bcrypt.compare(original, hashed);
    if (!isMatch) {
      throw new CustomError("Wrong Password", 400);
    }
  }

  private static generateJwtPayload(user: User): Account {
    return {
      user_id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      banner: user.banner,
      bio: user.bio,
      civilStatus: user.civil_status,
      gender: user.gender,
      nativeCity: user.native_city,
      ubication: user.ubication,
      job: user.job,
    };
  }

  private static async sendResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `https://sofii.vercel.app/reset-password/${email}/${resetToken}`;

    await MailHelper.sendMail(
      email, 
      'Reset Your Password At Sofii',
      `Enter this link to reset your password: ${resetUrl}`,
    );
  }

  private static generateResetToken(): string {
    const uuid = uuidv4();
    let base64Token = Buffer.from(uuid).toString('base64');
    base64Token = base64Token.replace(/\//g, '_').replace(/\+/g, '-').replace(/\?/g, '');
    return base64Token;
  }

  private static isResetTokenExpired(resetToken: PasswordResetToken): boolean {
    const now = new Date();
    return resetToken.expires_at <= now;
  }
}

export default AuthService;